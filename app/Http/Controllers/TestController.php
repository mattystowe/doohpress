<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Filestack\FilestackClient;
use Filestack\Filelink;
use Filestack\FilestackException;
use App\DoohpressLogger;
use App\Wemockup;
use App\Job;
use Log;

class TestController extends Controller
{
    public function test() {
      /*$client = new FilestackClient('A9f0kYLl5RDTyHSt2NxrRz'); // temp using flowtracker key...

      $external_url = 'https://s3-eu-west-1.amazonaws.com/doohpressstorage/jobs/inputfiles/zZ56grSLqkivcBKiKLcQ_Comp 1.mp4';
      $output_options = [
          'access'                => 'public',
          'fps'                   => 60,
          'width'                 => 640*2,
          'height'                => 352*2,
          'title'                 => 'test Filestack video conversion'
      ];

      $result = $client->convertVideo($external_url, 'mov', $output_options);
      //$conversion_url = $result['conversion_url'];
      return $result;*/
      Log::debug('testing');
      return response('ok',200);
    }




    public function testjob() {
      $job = Job::find(3);

      //DoohpressLogger::Job('debug',$job,'Test');
      //$processJob = new \App\Jobs\ProcessJobSubmission($job);
      //$processJob->handle();
      $wemockupjob = new \App\Jobs\SubmitJobToWemockup($job);
      $wemockupjob->handle();
      return response('ok',200);

    }
}
