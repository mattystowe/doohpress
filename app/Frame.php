<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Frame extends Model
{


  protected $fillable = [
      'name',
      'description',
      'owner_id',
      'city_id',
      'address',
      'postcode',
      'latitude',
      'longitude',
      'frametype_id',
      'width',
      'height',
      'fps',
      'max_bitrate',
      'image',
      'thumbnail'
  ];

    public function owner() {
      return $this->belongsTo('App\Owner');
    }

    public function frametype() {
      return $this->belongsTo('App\Frametype');
    }

    public function city() {
      return $this->belongsTo('App\City');
    }

    public function compositions() {
      return $this->belongsToMany('App\Composition');
    }
}
