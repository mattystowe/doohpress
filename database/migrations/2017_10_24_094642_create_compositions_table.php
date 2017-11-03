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
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->boolean('published')->default(true);
            $table->string('image',1000);
            $table->string('thumbnail',1000);
            $table->integer('wemockup_product_id');
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
