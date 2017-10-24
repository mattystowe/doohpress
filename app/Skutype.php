<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Skutype extends Model
{
  protected $fillable = [
      'name'
  ];


  public function skus() {
    return $this->hasMany('App\Sku');
  }
}
