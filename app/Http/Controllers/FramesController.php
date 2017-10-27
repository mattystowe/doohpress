<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Frame;
use App\Composition;

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
}
