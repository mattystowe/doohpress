<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{

  protected $fillable = [
      'name',
      'logo',
      'website',
      'social_twitter'
  ];


    public function frames() {
      return $this->hasMany('App\Frame');
    }
}
