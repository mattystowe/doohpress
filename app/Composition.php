<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Composition extends Model
{

  protected $fillable = [
      'name',
      'description',
      'outputtype_id',
      'compositioncategory_id',
      'geo_lat',
      'geo_long',
      'published',
      'image',
      'thumbnail',
      'example'
  ];

    public function frames() {
      return $this->belongsToMany('App\Frame');
    }

    public function outputtype() {
      return $this->belongsTo('App\Outputtype');
    }

    public function compositioncategory() {
      return $this->belongsTo('App\compositioncategory');
    }

    public function skus() {
      return $this->hasMany('App\Sku');
    }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }

}
