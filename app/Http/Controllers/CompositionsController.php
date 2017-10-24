<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Composition;
use App\Outputtype;
use App\Compositioncategory;


class CompositionsController extends Controller
{
    public function getAll() {
      $comps = Composition::with(['tags','outputtype','compositioncategory'])->get();
      return $comps;
    }


    public function getOutputTypes() {
      $types = Outputtype::all();
      return $types;
    }

    public function getCompositionCategories() {
      $categories = Compositioncategory::all();
      return $categories;
    }
}
