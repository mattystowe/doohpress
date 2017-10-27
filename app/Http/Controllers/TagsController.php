<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;
use App\Composition;

class TagsController extends Controller
{

    //Get available tags in the system
    //
    //
    //
    //
    //
    public function search($query) {
      $tags = Tag::where('name','like',$query . '%')->limit(5)->get();
      return $tags;
    }


    //Associate a tag to a composition
    //
    //
    //
    public function AddToComposition(Request $request) {
      $Composition = Composition::find($request->input('composition_id'));
      if ($Composition) {
        $Tag = Tag::find($request->input('tag_id'));
        if ($Tag) {
          $Composition->tags()->attach($Tag->id);
          return $Tag;
        } else {
          return response('Tag not found',404);
        }
      } else {
        return response('Composition not found',404);
      }
    }


    //Detach a tag from a composition
    //
    //
    //
    public function RemoveFromComposition(Request $request) {
      $Composition = Composition::find($request->input('composition_id'));
      if ($Composition) {
        $Tag = Tag::find($request->input('tag_id'));
        if ($Tag) {
          $Composition->tags()->detach($Tag->id);
          return $Tag;
        } else {
          return response('Tag not found',404);
        }
      } else {
        return response('Composition not found',404);
      }
    }

}
