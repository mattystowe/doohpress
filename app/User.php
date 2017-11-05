<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Log;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'email', 'password','profilepic'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    private $default_user_avatar = '/images/profilepics/avatar-starter.png';


    public function teams() {
      return $this->belongsToMany('App\Team')->withPivot('role_id');
    }

    public function jobs() {
      return $this->hasMany('App\Job');
    }




    public function is_on_team($team_id) {
      $team_result = $this->teams()->where('teams.id','=',$team_id)->count();
      if ($team_result > 0) {
        return true;
      } else {
        return false;
      }
    }

}
