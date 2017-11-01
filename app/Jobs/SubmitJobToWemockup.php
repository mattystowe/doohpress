<?php

namespace App\Jobs;

use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

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

    }

    public function failed()
    {
      throw new Exception('Submission to Wemockup failed');
    }
}
