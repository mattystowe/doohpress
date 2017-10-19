<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use App\Team;
use App\User;
use App\Role;
use App\Invitation;
use Auth;

class TeamController extends Controller
{
    public function getTeamDetails($teamid) {
      $team = Team::find($teamid);
      if ($team) {
        $team->users;
        foreach ($team->users as $user) {
          $user_team_role = Role::find($user->pivot->role_id);
          if ($user_team_role) {
            $user->role = $user_team_role;
          }

        }
        return $team;
      } else {
        return response('Could not find team.', 404);
      }
    }


    public function updateProfilePic(Request $request) {
      $team = Team::find($request->input('teamid'));
      if ($team) {
        //
        //check that user belongs to team
        //
        //TODO also check role in team
        $team->profilepic = $request->input('profilepic');
        if ($team->save()) {
          return $team;
        } else {
          return response('Error updating team.', 422);
        }
      } else {
        return response('Could not find team.', 404);
      }
    }


    //remove user from a team
    //
    //
    //
    public function removeUserFromTeam(Request $request) {
      $team = Team::find($request->input('team_id'));
      $user = User::find($request->input('user_id'));

      if ($team && $user) {
        if ($team->users()->detach($user->id)) {
          return $team;
        } else {
          return response('Error updating team.', 422);
        }

      } else {
        return response('Could not find team.', 404);
      }
    }


    public function addNew(Request $request) {
      $team = new Team;
      $team->name = $request->input('team_name');
      $team->profilepic = $team->default_profile_pic;
      if ($team->save()) {
        $user = Auth::user();
        $user->teams()->attach($team->id,['role_id'=>1]); // default role of Administrator
        $role = Role::find(1);
        $role->permissions;
        $team->role = $role;
        return $team;
      } else {
        return response('Error adding new team.', 422);
      }


    }




    public function createInvitation(Request $request) {
      $user = Auth::user();
      $team = Team::find($request->input('team_id'));
      if ($team) {
        if ($request->input('name') && $request->input('email')) {
          $invitation = new Invitation;
          $invitation->team_id = $team->id;
          $invitation->user_id = $user->id;
          $invitation->name = $request->input('name');
          $invitation->email = $request->input('email');
          $uuid4 = Uuid::uuid4();
          $invitation->uuid = $uuid4->toString();
          $invitation->used = false;

          if ($invitation->save()) {
            //
            //
            //Dispatch job to be handled to email the invitation
            //
            //
            $job = (new \App\Jobs\Emails\SendInvitation($invitation))->onQueue(env('QUEUE_JOBS'));
            dispatch($job);
            return $invitation;


          } else {
            return response('Could not save invitation', 422);
          }

        } else {
          return response('Invalid request.', 422);
        }
      } else {
        return response('Could not find team.', 422);
      }
    }



    
    public function join($invitation_uuid) {
      return $invitation_uuid;
    }


}
