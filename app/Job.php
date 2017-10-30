<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
  protected $fillable = [
      'team_id',
      'user_id',
      'sku_id',
      'progress',
      'status',
      'date_processing_media',
      'date_rendering',
      'date_complete',
      'date_failed',
      'date_cancelled'
  ];



  public function team() {
    return $this->belongsTo('App\Team');
  }

  public function user() {
    return $this->belongsTo('App\User');
  }

  public function sku() {
    return $this->belongsTo('App\Sku');
  }


}
