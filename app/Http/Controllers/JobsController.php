<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Job;
use App\Sku;
use Auth;


class JobsController extends Controller
{


    public function createJob(Request $request) {
      $job_data = json_decode($request->input('job'));
      if ($this->isNewJobValid($job_data)) {
          //check if sku exists
          $sku = Sku::find($job_data->sku_id);
          if ($sku) {


            //construct new job
            $job = new Job;
            $job->team_id = $job_data->team_id;
            $job->user_id = Auth::user()->id;
            $job->sku_id = $sku->id;
            $job->status = 'PENDINGSETUP';

            if ($job->save()) {
              return $job;
            } else {
              return response('Could not save job', 422);
            }

          } else {
            return response('Invalid sku', 422);
          }
      } else {
        return response('Invalid request', 422);
      }
    }


    //Check that new job data sent is valid
    //
    public function isNewJobValid($job) {
      return true;
    }

}
