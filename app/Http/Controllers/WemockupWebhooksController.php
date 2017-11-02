<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Job;
use App\DoohpressLogger;


class WemockupWebhooksController extends Controller
{
    public function itemFinished($job_id, Request $request) {
      $wemockup_item = $request->all();
      $job = Job::find($job_id);
      if ($job) {

        switch ($wemockup_item['status']) {
          case 'COMPLETE':
            //
            DoohpressLogger::Job('debug',$job,'Wemockup result : ' . $wemockup_item['status']);
            $job->markAsComplete();
            break;
          case 'FAILED':
            //
            DoohpressLogger::Job('debug',$job,'Wemockup result : ' . $wemockup_item['status']);
            $job->markAsFailed();
            break;
          case 'CANCELLED':
            //
            DoohpressLogger::Job('debug',$job,'Wemockup result : ' . $wemockup_item['status']);
            $job->markAsCancelled();
            break;
        }

        return response('Updated',200);

      } else {
        return response('Invalid Request', 422);
      }
    }




    public function itemProgress($job_id, Request $request) {
      $wemockup_item = $request->all();
      //return print_r($wemockup_item,true);
      $job = Job::find($job_id);
      if ($job) {
        $progress = $wemockup_item['progress'];
        if ($progress > $job->progress) {
          DoohpressLogger::Job('debug',$job,'Wemockup progress update : ' . $progress);
          $job->progress = $progress;
          $job->save();
          //
          //
          //fire off job progress event here if needed
          //
        }

        return response('Updated',200);

      } else {
        return response('Invalid Request', 422);
      }
    }
}
