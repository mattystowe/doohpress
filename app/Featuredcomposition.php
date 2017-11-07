<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Featuredcomposition extends Model
{
  protected $fillable = [
      'composition_id',
      'priority'
  ];

    public function composition() {
      return $this->belongsTo('App\Composition');
    }
}
