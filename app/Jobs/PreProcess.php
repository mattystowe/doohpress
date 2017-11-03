<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Jobpreprocess;
use Log;
use App\DoohpressLogger;
use App\VideoConverter;
use DB;
use Artisan;

class PreProcess implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $preprocess;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Jobpreprocess $preprocess)
    {
        $this->preprocess = $preprocess;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
      Artisan::call('cache:clear');
      $this->preprocess->fresh(['job']);
      if ($this->preprocess->job->status != 'FAILED' && $this->preprocess->job->status != 'CANCELLED') {
              //mark the job as PROCESSING_MEDIA
              $this->preprocess->job->markAsProcessingMedia();

              //mark the preprocess as processing
              $this->preprocess->markAsProcessing();


              //Handle the right process
              //
              //
              //
              switch ($this->preprocess->process_type) {
                case 'Video_Transcode_FitToFrame':
                  $this->handle_Video_Transcode_FitToFrame();
                  break;
                //
                //
                //
                //
                //Add more types to handle here when needed.
              }


              //mark process as comolete
              $this->preprocess->markAsComplete();

              //check for any more preprocesses outstanding on this job-
              //and if none, then queue send to wemockup job
              //
              //
              //
              //
              $remaining_preprocesses = DB::table('jobpreprocesses')
                                        ->where('job_id','=',$this->preprocess->job->id)
                                        ->whereIn('status',['PENDINGSETUP','QUEUED','PROCESSING'])
                                        ->get();
              if ($remaining_preprocesses->isEmpty()) {
                $j = (new \App\Jobs\SubmitJobToWemockup($this->preprocess->job))->onQueue(env('QUEUE_JOBS'));
                dispatch($j);
              }


        } else {
          DoohpressLogger::Job('debug',$this->preprocess->job,'PreProcess:: Not processing : Status = ' . $this->preprocess->job->status);
        }


    }




    //Convert uploaded video to 30fps and scaled to correct size
    //
    //
    //
    public function handle_Video_Transcode_FitToFrame() {
      DoohpressLogger::Job('debug',$this->preprocess->job,'PreProcess::handle_Video_Transcode_FitToFrame - Starting');
      $VideoConverter = new VideoConverter;
      $VideoConverter->setSourceUrl($this->preprocess->jobinput->value);
      if ($this->preprocess->frame->max_bitrate == '') {
        $bitrate = 4000;
      } else {
        $bitrate = $this->preprocess->frame->max_bitrate;
      }
      $VideoConverter->setOutputOptions([
        'access'                => 'public',
        'aspect_mode'           => 'crop',
        'fps'                   => 30,
        'width'                 => $this->preprocess->frame->width,
        'height'                => $this->preprocess->frame->height,
        'title'                 => $this->preprocess->job->sku->composition->name,
        'video_bitrate'         => $bitrate,
      ]);
      $converted_video_url = $VideoConverter->process();
      if ($converted_video_url) {
        DoohpressLogger::Job('debug',$this->preprocess->job,'PreProcess::handle_Video_Transcode_FitToFrame - Success with link: ' . $converted_video_url);
        //save the converted link to the job input
        $jobinput = $this->preprocess->jobinput;
        $jobinput->value = $converted_video_url;
        $jobinput->save();

      } else {
        DoohpressLogger::Job('error',$this->preprocess->job,'PreProcess::handle_Video_Transcode_FitToFrame - Failed');
        $this->preprocess->markAsFailed();
        throw new Exception('PreProcess::handle_Video_Transcode_FitToFrame - Failed');
      }
    }




    public function failed()
    {
      DoohpressLogger::Job('error',$this->preprocess->job,'PreProcess:: - Failed');
    }
}
