<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Role;
use Auth;
use DB;

class UserController extends Controller
{


    //Get the currently logged in User
    //
    //
    //
    public function getUser() {
      //sleep(1);
      $user = Auth::user();
      $user->teams;
      //
      foreach ($user->teams as $team) {
        $role = Role::find($team->pivot->role_id);
        if ($role) {
          $team->role = $role;
        }
      }
      //
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


    //Update profile pic
    //
    //
    public function updateProfilePic(Request $request) {
      $user = Auth::user();

      $new_profilepic = $request->input('profilepic');

      $user->profilepic = $new_profilepic;

      if ($user->save()) {
        return $user;
      } else {
        return response('Error saving user details.', 422);
      }
    }


    public function updateRole(Request $request) {
      $user_id = $request->input('userid');
      $team_id = $request->input('teamid');
      $role_id = $request->input('roleid');
      DB::table('team_user')->where([
        ['user_id','=',$user_id],
        ['team_id','=',$team_id]
      ])->update(['role_id'=>$role_id]);


    }




}
