<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Country;

class CountriesController extends Controller
{
    public function getAll() {
      $countries = Country::all();
      return $countries;
    }

    public function addNew(Request $request) {
      $country = new Country;
      $country->name = $request->input('name');
      $country->country_code = $request->input('country_code');
      if ($country->save()) {
        return $country;
      } else {
        return response('Invalid request.', 422);
      }
    }

    public function remove(Request $request) {
      $country = Country::find($request->input('country_id'));
      if ($country) {
        if ($country->delete()) {
          return 'ok';
        } else {
          return response('Invalid request.', 422);
        }

      } else {
        return response('Invalid request.', 422);
      }
    }
}
