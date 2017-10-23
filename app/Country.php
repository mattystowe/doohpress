<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    public function cities() {
      return $this->hasMany('App\City');
    }

    public function frames() {
      return $this->hasManyThrough('App\Frame','App\City');
    }
}
