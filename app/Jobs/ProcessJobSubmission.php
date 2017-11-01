<?php

namespace App\Jobs;

use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use App\Preprocess;
use App\Jobpreprocess;
use Log;
use App\DoohpressLogger;


class ProcessJobSubmission implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $Job;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(\App\Job $job)
    {
        $this->Job = $job;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        DoohpressLogger::Job('debug',$this->Job,'ProcessJobSubmission');
        //
        //check if job has any pre processing stages -
        foreach ($this->Job->jobinputs as $jobinput) {

          $preprocesses = Preprocess::where('composition_id','=',$this->Job->sku->composition_id)
                                  ->where('wemockup_inputoption_id','=',$jobinput->inputoption_id)
                                  ->get();
          if ($preprocesses->isNotEmpty()) {
            //
            //preprocesses found for this input item - save and queue the process.
            foreach ($preprocesses as $preprocess) {
              $jobPreProcess = Jobpreprocess::create([
                'job_id'=>$this->Job->id,
                'jobinput_id'=>$jobinput->id,
                'frame_id'=>$preprocess->frame_id,
                'process_type'=>$preprocess->process_type,
                'status'=>'CREATED'
              ]);
              //
              //
              if ($jobPreProcess) {
                //Queue the preprocess
                $jobPreProcess->markAsQueued();
                $j = (new \App\Jobs\PreProcess($jobPreProcess))->onQueue(env('QUEUE_JOBS'));
                dispatch($j);
              }
            }

          }
        }


        ///otherwise if no preprocesses - just submit job to wemockup
        //
        //
        //
        //
        //


    }






    public function failed()
    {
      throw new Exception('Job processing failed');
    }
}
