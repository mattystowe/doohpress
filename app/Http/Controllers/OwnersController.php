<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Owner;

class OwnersController extends Controller
{
    public function getAll() {
      $owners = Owner::all();
      return $owners;
    }

    public function add(Request $request) {
      $owner_data = json_decode($request->input('owner'));
      $owner = Owner::create([
        'name'=>$owner_data->name,
        'website'=>$owner_data->website,
        'logo'=>$owner_data->logo,
        'social_twitter'=>$owner_data->social_twitter
      ]);
      if ($owner) {
        return $owner;
      } else {
        return response('Could not save owner',422);
      }
    }


    public function update(Request $request) {
      $owner_data = json_decode($request->input('owner'));
      $owner = Owner::find($owner_data->id);
      if ($owner) {
        $owner->name = $owner_data->name;
        $owner->website = $owner_data->website;
        $owner->logo = $owner_data->logo;
        $owner->social_twitter = $owner_data->social_twitter;
        if ($owner->save()) {
          return $owner;
        } else {
          return response('Could not save owner', 422);
        }
      } else {
        return response('Owner not found',404);
      }
    }

    public function load($owner_id) {
      $owner = Owner::find($owner_id);
      if ($owner) {
        return $owner;
      } else {
        return response('Owner not found',404);
      }
    }
}
