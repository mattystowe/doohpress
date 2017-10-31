<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePreprocessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('preprocesses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('composition_id');
            $table->integer('frame_id');
            $table->integer('wemockup_inputoption_id');
            $table->string('process_type');
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
        Schema::dropIfExists('preprocesses');
    }
}
