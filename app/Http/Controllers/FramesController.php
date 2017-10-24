<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Frame;

class FramesController extends Controller
{
    public function search($query) {
      $frames = Frame::where('name','like','%' . $query . '%')
                      ->orWhere('id','=',$query)
                      ->limit(10)
                      ->get();
      return $frames;
    }
}
