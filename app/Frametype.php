<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Frametype extends Model
{
    public function frames() {
      return $this->hasMany('App\Frame');
    }
}
