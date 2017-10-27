<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Example extends Model
{
  protected $fillable = [
      'title',
      'composition_id',
      'exampletype',
      'url'
  ];


  //
  //example types
  //Video_Vimeo
  //Video_Youtube
  //
  //


  public function composition() {
    return $this->belongsTo('App\Composition');
  }


}
