<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobinputsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobinputs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('job_id');
            $table->integer('inputoption_id');
            $table->string('input_type');
            $table->string('variable_name');
            $table->string('value',1000)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobinputs');
    }
}
