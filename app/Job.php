<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Wemockup;

class Job extends Model
{
  protected $fillable = [
      'team_id',
      'user_id',
      'sku_id',
      'progress',
      'status',
      'date_processing_media',
      'date_rendering',
      'date_complete',
      'date_failed',
      'date_cancelled'
  ];



  public function team() {
    return $this->belongsTo('App\Team');
  }

  public function user() {
    return $this->belongsTo('App\User');
  }

  public function sku() {
    return $this->belongsTo('App\Sku');
  }


  //Load the wemockup sku for this job
  //
  //
  //
  public function loadWemockupSku() {
    $wemockup = new Wemockup;
    $this->wemockup_sku = $wemockup->getSku($this->sku->wemockup_sku);

    //convert wemockup image data to doohpress compatible data
    foreach($this->wemockup_sku->product->inputoptions as $inputoption) {
        if ($inputoption->input_type == 'imageupload') {
          if ($inputoption->data->imagedimmin) {
            $dim = explode(',',$inputoption->data->imagedimmin);
            $inputoption->data->image_min_x = $dim[0];
            $inputoption->data->image_min_y = $dim[1];
          }
        
        }

    }


  }



}
