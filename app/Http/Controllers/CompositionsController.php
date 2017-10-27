<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Composition;
use App\Outputtype;
use App\Compositioncategory;
use App\Sku;
use App\Frame;


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


    public function load($composition_id) {
      $composition = Composition::find($composition_id);

      if ($composition) {

        //set published bool for angular
        if ($composition->published) {
          $composition->published = "true";
        } else {
          $composition->published = "false";
        }
        //get frame
        $composition->frames;
        $composition->outputtype;
        return $composition;
      } else {
        return response('Composition not found',404);
      }
    }



    //Update existing composition
    //
    //
    //
    public function update(Request $request) {
      $composition_data = json_decode($request->input('composition'));
      $composition = Composition::find($composition_data->id);
      if ($composition) {
        $composition->name = $composition_data->name;
        $composition->description = $composition_data->description;
        $composition->compositioncategory_id = $composition_data->compositioncategory_id;
        $composition->outputtype_id = $composition_data->outputtype_id;
        $composition->geo_lat = $composition_data->geo_lat;
        $composition->geo_long = $composition_data->geo_long;
        if ($composition_data->published == 'true') { $composition->published = true; } else { $composition->published = false; }
        $composition->image = $composition_data->image;
        $composition->thumbnail = $composition_data->thumbnail;
        $composition->wemockup_product_id = $composition_data->wemockup_product_id;

        if ($composition->save()) {
          return $this->load($composition->id);
        } else {
          return response('Composition not updated',422);
        }

      } else {
        return response('Composition not found',404);
      }
    }

    //Save a new composition and associated models
    //
    //
    //
    public function saveNew(Request $request) {
      $composition_data = json_decode($request->input('composition'));
      //return print_r($composition_data,true);
      if ($composition_data->published == 'true') { $published = true; } else { $published = false; }

      $Composition = Composition::create([
        'name'=>$composition_data->name,
        'description'=>$composition_data->description,
        'outputtype_id'=>$composition_data->outputtype->id,
        'compositioncategory_id'=>$composition_data->compositioncategory->id,
        'geo_lat'=>$composition_data->geo_lat,
        'geo_long'=>$composition_data->geo_long,
        'published'=>$published,
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

        //associate frames to composition
        foreach($composition_data->frames as $comp_frame) {
          $frame = Frame::find($comp_frame->id);
          if ($frame) {
            $Composition->frames()->attach($frame->id);
          }
        }


        return $Composition;
      } else {
        return response('Error saving',422);
      }


    }
}
