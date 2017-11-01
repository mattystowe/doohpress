<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Jobpreprocess extends Model
{
  protected $fillable = [
      'job_id',
      'jobinput_id',
      'frame_id',
      'process_type',
      'status'
  ];


  public function job() {
    return $this->belongsTo('App\Job');
  }

  public function jobinput() {
    return $this->belongsTo('App\Jobinput');
  }

  public function frame() {
    return $this->belongsTo('App\Frame');
  }


  public function markAsQueued() {
    $this->status = 'QUEUED';
    $this->date_queued = Carbon::now();
    $this->save();
  }

  public function markAsProcessing() {
    if ($this->status != 'PROCESSING') {
      $this->status = 'PROCESSING';
      $this->date_processing = Carbon::now();
      $this->save();
    }
  }

  public function markAsComplete() {
    if ($this->status != 'COMPLETE') {
      $this->status = 'COMPLETE';
      $this->date_complete = Carbon::now();
      $this->save();
    }
  }

  public function markAsFailed() {
    if ($this->status != 'FAILED') {
      $this->status = 'FAILED';
      $this->date_failed = Carbon::now();
      $this->save();
    }
  }


}
