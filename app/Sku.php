<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sku extends Model
{
  protected $fillable = [
    'composition_id',
    'skutype_id',
    'wemockup_sku',
    'priority'
  ];


    public function skutype() {
      return $this->belongsTo('App\Skutype');
    }

    public function composition() {
      return $this->belongsTo('App\Composition');
    }

}
