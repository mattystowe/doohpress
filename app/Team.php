<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{

  public $default_profile_pic = "/images/profilepics/avatar-team-default.gif";


  public function users() {
    return $this->belongsToMany('App\User')->withPivot('role_id');
  }
}
