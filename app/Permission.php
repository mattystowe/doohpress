<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{

    public $fillable = [
      'keyname'
    ];

    public $hidden = [
      'created_at',
      'updated_at'
    ];


    public function roles() {
      return $this->belongsToMany('App\Role');
    }
}
