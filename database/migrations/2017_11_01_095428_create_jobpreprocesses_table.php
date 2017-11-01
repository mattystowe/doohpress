<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobpreprocessesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobpreprocesses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('job_id');
            $table->integer('jobinput_id');
            $table->integer('frame_id');
            $table->string('process_type');
            $table->string('status');
            $table->timestamp('date_queued')->nullable();
            $table->timestamp('date_processing')->nullable();
            $table->timestamp('date_complete')->nullable();
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
        Schema::dropIfExists('jobpreprocesses');
    }
}
