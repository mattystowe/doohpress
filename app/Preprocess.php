<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Preprocess extends Model
{
    public function composition() {
      return $this->belongsTo('App\Composition');
    }

    public function frame() {
      return $this->belongsTo('App\Frame');
    }
}
