<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Specfile extends Model
{


  protected $fillable = [
      'name',
      'urllink',
      'frame_id'
  ];


    public function frame() {
      return $this->belongsTo('App\Frame');
    }


}
