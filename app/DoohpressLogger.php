<?php
/**
 * Class to help the logging of objects so all order information is always present.
 *
 *
 *
 *
 *
 *
 */

namespace App;

use Log;


class DoohpressLogger
{



    public static function Job($level, Job $job, $msg, $data = null) {
        $logdata = [
          'job_id'=>$job->id,
          'user_id'=>$job->user->id,
          'user_email'=>$job->user->email,
          'team_id'=>$job->team->id,
          'team_name'=>$job->team->name,
          'data'=>$data
        ];
        self::send($level, $msg, $logdata);
    }



    private static function send($level, $msg, $data = null) {
      switch ($level) {
        case 'debug':
          Log::debug($msg, $data);
          break;
          case 'info':
            Log::info($msg, $data);
            break;
            case 'warning':
              Log::warning($msg, $data);
              break;
              case 'error':
                Log::error($msg, $data);
                break;
      }
    }



}
