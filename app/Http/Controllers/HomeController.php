<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Featuredcomposition;

class HomeController extends Controller
{


    public function getFeaturedCompositions() {
      $compositions = Featuredcomposition::with(['composition'])->orderBy('priority','asc')->get();
      return $compositions;
    }
    
}
