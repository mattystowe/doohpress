<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;


class Composition extends Model
{

  protected $fillable = [
      'name',
      'description',
      'outputtype_id',
      'compositioncategory_id',
      'latitude',
      'longitude',
      'published',
      'image',
      'thumbnail',
      'wemockup_product_id'
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
      return $this->hasMany('App\Sku')->orderBy('priority');;
    }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }

    public function examples() {
      return $this->hasMany('App\Example');
    }

    public function preprocesses() {
      return $this->hasMany('App\Preprocess');
    }




    public function search($filters) {
      $frames = DB::table('frames');

      $frames->leftJoin('composition_frame','frames.id','=','composition_frame.frame_id');
      $frames->leftJoin('cities', 'frames.city_id','=','cities.id');
      $frames->leftJoin('countries', 'cities.country_id','=','countries.id');


      $frames->leftJoin('compositions','composition_frame.composition_id','=','compositions.id');
      $frames->leftJoin('outputtypes','compositions.outputtype_id','=','outputtypes.id');
      $frames->leftJoin('compositioncategories','compositions.compositioncategory_id','=','compositioncategories.id');

      $frames->select(
        'compositions.*',
        'outputtypes.id as outputtype_id',
        'outputtypes.name as outputtype_name',
        'compositioncategories.name as compositioncategory_name',
        'cities.name as city_name',
        'countries.name as country_name'
      );

      if (isset($filters->query) & $filters->query !='') {
        $frames->where('compositions.name','like','%' . $filters->query . '%');
      }

      if (isset($filters->outputtype_id)) {
        $frames->where('compositions.outputtype_id','=',$filters->outputtype_id);
      }
      if (isset($filters->compositioncategory_id)) {
        $frames->where('compositions.compositioncategory_id','=',$filters->compositioncategory_id);
      }


      if (isset($filters->owner_id)) {
        $frames->where('frames.owner_id','=',$filters->owner_id);
      }

      if (isset($filters->city_id)) {
        $frames->where('frames.city_id','=',$filters->city_id);
      }
      if (isset($filters->frametype_id)) {
        $frames->where('frames.frametype_id','=',$filters->frametype_id);
      }




      $frames->groupBy('compositions.id');
      $frames->orderBy('compositions.name', 'asc');
      $result = $frames->get();
      return $result;

    }



}
