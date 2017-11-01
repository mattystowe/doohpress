<?php

namespace App\Jobs;

use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

use App\DoohpressLogger;
use App\Wemockup;

class SubmitJobToWemockup implements ShouldQueue
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

        DoohpressLogger::Job('debug',$this->Job,'SubmitJobToWemockup(): Sending....');
        $wemockup = new Wemockup;
        if ($wemockup->submit($this->Job)) {
          DoohpressLogger::Job('debug',$this->Job,'SubmitJobToWemockup(): Sent successfully.');
          //mark job as rendering
          $this->Job->markAsRendering();
        } else {
          DoohpressLogger::Job('error',$this->Job,'SubmitJobToWemockup(): Error submitting');
          throw new Exception('Submission to Wemockup failed');
        }


    }

    public function failed()
    {
      $this->Job->markAsFailed();
      throw new Exception('Submission to Wemockup failed');
    }
}
