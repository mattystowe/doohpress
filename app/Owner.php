<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
    public function frames() {
      return $this->hasMany('App\Frame');
    }
}
