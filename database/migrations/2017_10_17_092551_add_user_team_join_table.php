<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUserTeamJoinTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('team_user', function (Blueprint $table) {
          $table->increments('id');
          $table->integer('user_id');
          $table->integer('team_id');
          $table->integer('role_id'); // pivot for user_team_role relation
          $table->timestamps();
      });

      DB::table('team_user')->insert([
          [
            'user_id'=>1,
            'team_id'=>1,
            'role_id'=>1
          ]
      ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('team_user');
    }
}
