<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    public function team() {
      return $this->belongsTo('App\Team');
    }

    public function user() {
      return $this->belongsTo('App\User');
    }


    public function markAsAccepted() {
      $this->used = true;
      $this->save();
      //
      //
      //throw accepted event here
      //
    }
}
