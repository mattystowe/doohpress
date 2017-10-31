<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Jobinput extends Model
{

  protected $fillable = [
      'job_id',
      'inputoption_id',
      'input_type',
      'variable_name',
      'value'
  ];

    public function job() {
      return $this->belongsTo('App\Job');
    }
}
