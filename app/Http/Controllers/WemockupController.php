<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Wemockup;

class WemockupController extends Controller
{
    public function search($query) {
      $wemockup = new Wemockup;
      return $wemockup->searchProducts($query);
    }
}
