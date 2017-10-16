<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;

class UserController extends Controller
{


    //Get the currently logged in User
    //
    //
    //
    public function getUser() {
      //sleep(1);
      $user = Auth::user();
      $user->teams = [
        ['name'=>'test team'],
        ['name'=>'team 2'],
        ['name'=>'Team 3']
      ];
      return $user;
      //return response('Item not found.', 500);
    }



}
