<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Filestack\FilestackClient;
use Filestack\Filelink;
use Filestack\FilestackException;


class TestController extends Controller
{
    public function test() {
      $client = new FilestackClient('A9f0kYLl5RDTyHSt2NxrRz'); // temp using flowtracker key...

      $external_url = 'https://s3-eu-west-1.amazonaws.com/doohpressstorage/jobs/inputfiles/zZ56grSLqkivcBKiKLcQ_Comp 1.mp4';
      $output_options = [
          'access'                => 'public',
          'fps'                   => 60,
          'width'                 => 640*2,
          'height'                => 352*2,
          'title'                 => 'test Filestack video conversion'
      ];

      $uuid = $client->convertVideo($external_url, 'mov', $output_options);
      return $uuid;
    }



    
    public function testjob() {
      $job = \App\Job::find(3);
      $processJob = new \App\Jobs\ProcessJobSubmission($job);
      $processJob->handle();

    }
}
