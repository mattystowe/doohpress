<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Frame extends Model
{
    public function owner() {
      return $this->belongsTo('App\Owner');
    }

    public function frametype() {
      return $this->belongsTo('App\Frametype');
    }

    public function frameformat() {
      return $this->belongsTo('App\Frameformat');
    }

    public function city() {
      return $this->belongsTo('App\City');
    }
}
