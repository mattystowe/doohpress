<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Skutype;

class SkusController extends Controller
{
    public function getAll() {
      $types = Skutype::all();
      return $types;
    }
}
