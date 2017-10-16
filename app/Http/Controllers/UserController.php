<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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



    //Save updated user details
    //
    //
    public function updateUserDetails(Request $request) {
      $user = Auth::user();

      $new_user_details = json_decode($request->input('user'));

      $user->firstname = $new_user_details->firstname;
      $user->lastname = $new_user_details->lastname;
      $user->email = $new_user_details->email;

      if ($user->save()) {
        return $user;
      } else {
        return response('Error saving user details.', 422);
      }


    }


    //Save updated password
    //
    //
    public function updateUserPassword(Request $request) {
      $user = Auth::user();

      $new_password = $request->input('password');

      $user->password = Hash::make($new_password);

      if ($user->save()) {
        return $user;
      } else {
        return response('Error saving user details.', 422);
      }
    }



}
