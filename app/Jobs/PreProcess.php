<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Jobpreprocess;
use Log;

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
        //
    }


    public function failed()
    {
      throw new Exception('Job preprocess failed');
    }
}
