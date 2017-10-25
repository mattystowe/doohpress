<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompositionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('compositions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',255);
            $table->string('description',255)->nullable();
            $table->integer('outputtype_id');
            $table->integer('compositioncategory_id');
            $table->string('geo_lat')->nullable();
            $table->string('geo_long')->nullable();
            $table->boolean('published')->default(true);
            $table->string('image',255);
            $table->string('thumbnail',255);
            $table->timestamps();
        });

        Schema::create('composition_frame', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('composition_id');
            $table->integer('frame_id');
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
        Schema::dropIfExists('compositions');
        Schema::dropIfExists('composition_frame');
    }
}
