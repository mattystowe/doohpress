<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\City;
use App\Country;

class CitiesController extends Controller
{
    function getAll() {
      $cities = City::all();
      return $cities;
    }

    //get structured cities by country group
    function getAllGroupedByCountry() {
      $countries = Country::with('cities')->get();
      return $countries;
    }

    function getAllForCountry($country_id) {
      $country = Country::find($country_id);
      if ($country) {
        $cities = $country->cities;
        return $cities;
      } else {
        return response('Could not find country.', 404);
      }
    }



    function addNew(Request $request) {
      $country = Country::find($request->input('country_id'));
      if ($country) {
        $city = new City;
        $city->name = $request->input('name');
        $city->country_id = $country->id;
        if ($city->save()) {
          return $city;
        } else {
          return response('Coukd not save city.', 422);
        }
      } else {
        return response('Invalid request.', 404);
      }
    }


    function remove(Request $request) {
      $city = City::find($request->input('city_id'));
      if ($city) {
        if ($city->delete()) {
          return 'Ok';
        } else {
          return response('Coukd not remove city.', 422);
        }
      } else {
        return response('Invalid request.', 404);
      }
    }


}
