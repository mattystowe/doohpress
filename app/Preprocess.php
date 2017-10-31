<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Preprocess extends Model
{
  protected $fillable = [
      'composition_id',
      'frame_id',
      'wemockup_inputoption_id',
      'process_type'
  ];

    public function composition() {
      return $this->belongsTo('App\Composition');
    }

    public function frame() {
      return $this->belongsTo('App\Frame');
    }
}
