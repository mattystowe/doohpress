<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Frame;
use App\Composition;
use App\Frametype;
use App\Frameformat;

class FramesController extends Controller
{
    public function search($query) {
      $frames = Frame::where('name','like','%' . $query . '%')
                      ->orWhere('id','=',$query)
                      ->limit(10)
                      ->get();
      return $frames;
    }



    public function addToComposition(Request $request) {
      $composition = Composition::find($request->input('composition_id'));
      if ($composition) {
        $composition->frames()->attach($request->input('frame_id'));
        return $composition;
      } else {
        return response('Composition not found', 404);
      }
    }

    public function removeFromComposition(Request $request) {
      $composition = Composition::find($request->input('composition_id'));
      if ($composition) {
        $composition->frames()->detach($request->input('frame_id'));
        return $composition;
      } else {
        return response('Composition not found', 404);
      }
    }


    public function getAll(Request $request) {
      $frames = Frame::with(['owner','frametype','frameformat','city.country'])->get();
      return $frames;
    }


    public function getAllTypes() {
      $types = Frametype::all();
      return $types;
    }

    public function getAllFormats() {
      $formats = Frameformat::all();
      return $formats;
    }

    public function add(Request $request) {
      $frame_data = json_decode($request->input('frame'));
      $frame = Frame::create([
        'name'=>$frame_data->name,
        'description'=>$frame_data->description,
        'owner_id'=>$frame_data->owner_id,
        'city_id'=>$frame_data->city_id,
        'address'=>$frame_data->address,
        'postcode'=>$frame_data->postcode,
        'latitude'=>$frame_data->latitude,
        'longitude'=>$frame_data->longitude,
        'frametype_id'=>$frame_data->frametype_id,
        'frameformat_id'=>$frame_data->frameformat_id,
        'image'=>$frame_data->image,
        'thumbnail'=>$frame_data->thumbnail
      ]);
      if ($frame) {
        return $frame;
      } else {
        return response('Error saving frame',422);
      }

    }

    public function update(Request $request) {
      $frame_data = json_decode($request->input('frame'));
      $frame = Frame::find($frame_data->id);
      if ($frame) {
        $frame->name = $frame_data->name;
        $frame->description = $frame_data->description;
        $frame->owner_id = $frame_data->owner_id;
        $frame->city_id = $frame_data->city_id;
        $frame->address = $frame_data->address;
        $frame->postcode = $frame_data->postcode;
        $frame->latitude = $frame_data->latitude;
        $frame->longitude = $frame_data->longitude;
        $frame->frametype_id = $frame_data->frametype_id;
        $frame->frameformat_id = $frame_data->frameformat_id;
        $frame->image = $frame_data->image;
        $frame->thumbnail = $frame_data->thumbnail;

        if ($frame->save()) {
          return $frame;
        } else {
          return response('Error saving frame',422);
        }
      } else {
        return response('Frame not found',404);
      }
    }


    public function load($frame_id) {
      $frame = Frame::find($frame_id);
      if ($frame) {
        $frame->frametype;
        $frame->frameformat;
        $frame->city;
        $frame->owner;

        return $frame;
      } else {
        return response('Frame not found',404);
      }
    }

}
