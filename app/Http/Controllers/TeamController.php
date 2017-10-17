<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Team;

class TeamController extends Controller
{
    public function getTeamDetails($teamid) {
      $team = Team::find($teamid);
      if ($team) {
        $team->users;
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
}
