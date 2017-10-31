<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('team_id');
            $table->integer('user_id');
            $table->integer('sku_id');
            $table->string('status',255);
            $table->integer('wemockup_item_id')->nullable();
            $table->integer('progress')->nullable();
            $table->timestamp('date_queued')->nullable();
            $table->timestamp('date_processing_media')->nullable();
            $table->timestamp('date_rendering')->nullable();
            $table->timestamp('date_complete')->nullable();
            $table->timestamp('date_failed')->nullable();
            $table->timestamp('date_cancelled')->nullable();
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
        Schema::dropIfExists('jobs');
    }
}
