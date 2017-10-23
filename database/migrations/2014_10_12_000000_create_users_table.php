<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Hash;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->string('profilepic')->nullable();
            $table->boolean('superadmin')->default(false);
            $table->timestamps();
        });

        //add initial super user
        DB::table('users')->insert([
          [
            'firstname'=>'Doohpress',
            'lastname'=>'Admin',
            'email'=>'admin@doohpress.com',
            'password'=>Hash::make('skymonkey'),
            'profilepic'=>'/images/profilepics/avatar-starter.png',
            'superadmin'=>true
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
        Schema::dropIfExists('users');
    }
}
