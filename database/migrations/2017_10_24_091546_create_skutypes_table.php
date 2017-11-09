<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSkutypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skutypes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });
        DB::table('skutypes')->insert([
          ['name' => 'Still Image - Medium'],
          ['name' => 'Still Image - Large'],
          ['name' => 'Still Image - Extra Large'],
          ['name' => 'Video - Medium 720p'],
          ['name' => 'Video - Large 1080p'],
          ['name' => 'Video - Extra Large 4K']

        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('skutypes');
    }
}
