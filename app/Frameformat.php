<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Frameformat extends Model
{
    public function frames() {
      return $this->hasMany('App\Frame');
    }
}
