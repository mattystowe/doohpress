<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Skutype;
use App\Sku;

class SkusController extends Controller
{
    public function getAll() {
      $types = Skutype::all();
      return $types;
    }


    //Remove sku from a composition
    //
    //
    public function removeSku(Request $request) {
      $sku = Sku::find($request->input('sku_id'));
      if ($sku) {
        if ($sku->delete()) {
          return response('Sku deleted',200);
        } else {
          return response('Sku could not be deleted', 422);
        }
      } else {
        return response('Sku not found', 404);
      }
    }


    //add sku to a composition
    //
    //
    public function addSku(Request $request) {
      $sku = new Sku;
      $sku->composition_id = $request->input('composition_id');
      $sku->wemockup_sku = $request->input('wemockup_sku');
      $sku->skutype_id = $request->input('skutype_id');
      $sku->priority = $request->input('priority');
      if ($sku->save()) {
        return $sku;
      } else {
        return response('Sku could not be added', 422);
      }
    }



    public function updateSkuType(Request $request) {
      $sku = Sku::find($request->input('sku_id'));
      if ($sku) {
        $sku->skutype_id = $request->input('skutype_id');
        if ($sku->save()) {
          return $sku;
        } else {
          response('Could not save sku', 422);
        }
      } else {
        return response('Skuy not found', 404);
      }
    }
}
