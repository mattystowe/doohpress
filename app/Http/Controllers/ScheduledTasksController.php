<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Carbon\Carbon;
use Artisan;

class ScheduledTasksController extends Controller
{
  //Main scheduler cron point
  //
  //
  //
  public function scheduleRun() {
    $result = Artisan::call('schedule:run');
    return "200 Ok";
  }
}
