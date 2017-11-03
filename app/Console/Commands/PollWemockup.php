<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;
use App\Job;
use App\Wemockup;
use Log;

class PollWemockup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'wemockup:poll';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Polls wemockup for any jobs in progress to get results.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $jobs = $this->getJobsInProgress();
        $wemockup = new Wemockup;
        $wemockup->processJobsToPoll($jobs);
    }


    private function getJobsInProgress() {
      $jobs = Job::whereIn('status',[
        'RENDERING'
      ])
      ->whereNotNull('wemockup_item_id')
      ->get();

      $this->line('Found ' . $jobs->count() . ' Jobs to poll.');
      Log::debug('Scheduler::PollWemockup:: Found ' . $jobs->count() . ' Jobs to poll.');
      return $jobs;
    }
}
