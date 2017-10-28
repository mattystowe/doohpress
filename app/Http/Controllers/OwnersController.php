<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Owner;

class OwnersController extends Controller
{
    public function getAll() {
      $owners = Owner::all();
      return $owners;
    }
}
