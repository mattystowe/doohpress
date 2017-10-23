<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    public function country() {
      return $this->belongsTo('App\Country');
    }

    public function frames() {
      $this->hasMany('App\Frame');
    }

    
}
