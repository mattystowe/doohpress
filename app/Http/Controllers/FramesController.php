<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Frame;
use App\Composition;
use App\Frametype;
use App\Specfile;

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
      $frames = Frame::with(['owner','frametype','city.country'])->get();
      return $frames;
    }


    public function getAllTypes() {
      $types = Frametype::all();
      return $types;
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
        'width'=>$frame_data->width,
        'height'=>$frame_data->height,
        'fps'=>$frame_data->fps,
        'max_bitrate'=>$frame_data->max_bitrate,
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
        $frame->width = $frame_data->width;
        $frame->height = $frame_data->height;
        $frame->fps = $frame_data->fps;
        $frame->max_bitrate = $frame_data->max_bitrate;
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
        $frame->city;
        $frame->owner;
        $frame->specfiles;
        foreach($frame->compositions as $composition) {
          $composition->outputtype;
          $composition->compositioncategory;
          $composition->tags;
        }

        return $frame;
      } else {
        return response('Frame not found',404);
      }
    }


    public function searchFiltered(Request $request) {
      $filters = json_decode($request->input('filters'));

      $frame = new Frame;
      return $frame->search($filters);

    }



    public function removeSpecFile(Request $request) {
      $specfile = Specfile::find($request->input('specfile_id'));
      if ($specfile) {
        if ($specfile->delete()) {
          return response('Removed ok',200);
        } else {
          return response('Could not remove file', 422);
        }
      } else {
        return response('Not found', 404);
      }
    }

    public function addSpecFile(Request $request) {
      $specfile_data = json_decode($request->input('specfile'));
      $specfile = Specfile::create([
        'frame_id'=>$specfile_data->frame_id,
        'name'=>$specfile_data->name,
        'urllink'=>$specfile_data->urllink
      ]);
      if ($specfile) {
        return $specfile;
      } else {
        return response('Error saving file', 422);
      }
    }

}
