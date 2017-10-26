<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Composition;
use App\Outputtype;
use App\Compositioncategory;
use App\Sku;


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


    //Save a new composition and associated models
    //
    //
    //
    public function saveNew(Request $request) {
      $composition_data = json_decode($request->input('composition'));
      //return print_r($composition_data,true);
      $Composition = Composition::create([
        'name'=>$composition_data->name,
        'description'=>$composition_data->description,
        'outputtype_id'=>$composition_data->outputtype->id,
        'compositioncategory_id'=>$composition_data->compositioncategory->id,
        'geo_lat'=>$composition_data->geo_lat,
        'geo_long'=>$composition_data->geo_long,
        'published'=>true,
        'image'=>$composition_data->image,
        'thumbnail'=>$composition_data->thumbnail,
        'wemockup_product_id'=>$composition_data->wemockup_product->id
      ]);

      if ($Composition) {
        //associate product skus
        foreach($composition_data->wemockup_skus as $comp_sku) {
          $sku = Sku::create([
            'composition_id'=>$Composition->id,
            'skutype_id'=>$comp_sku->skutype->id,
            'wemockup_sku'=>$comp_sku->id
          ]);

        }

        $Composition->skus;
        return $Composition;
      } else {
        return response('Error saving',422);
      }


    }
}
