<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

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

    public function specfiles() {
      return $this->hasMany('App\Specfile');
    }



    public function search($filters) {
      $frames = DB::table('frames');

      $frames->join('owners', 'frames.owner_id','=','owners.id');
      $frames->join('frametypes', 'frames.frametype_id','=','frametypes.id');
      $frames->join('cities', 'frames.city_id','=','cities.id');
      $frames->join('countries', 'cities.country_id','=','countries.id');

      $frames->select(
        'frames.*',
        'owners.name as owner_name',
        'owners.logo as owner_logo',
        'frametypes.name as frametype_name',
        'cities.name as city_name',
        'countries.name as country_name'
      );

      if (isset($filters->query)) {
        $frames->where('frames.name','like','%' . $filters->query . '%');
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

      $frames->orderBy('frames.name', 'asc');



      $result = $frames->get();
      return $result;

    }


}
