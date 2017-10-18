<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


$this->get('/', 'IndexController@index');
Auth::routes();
$this->get('logout', 'Auth\LoginController@logout')->name('logout');


//Application routes - Authenticated
Route::middleware(['auth'])->group(function () {
  //
  //
  $this->get('/user/','UserController@getUser');
  $this->post('/user/update/','UserController@updateUserDetails');
  $this->post('/user/updatepassword/','UserController@updateUserPassword');
  $this->post('/user/updateprofilepic/','UserController@updateProfilePic');
  $this->post('/user/updaterole/','UserController@updateRole');
  $this->get('/team/getdetails/{teamid}','TeamController@getTeamDetails');
  $this->post('/team/updateprofilepic/','TeamController@updateProfilePic');
  $this->post('/team/removeuser/','TeamController@removeUserFromTeam');
  $this->post('/team/addnew/','TeamController@addNew');
  $this->get('/roles/getall/','RoleController@getAllRoles');

});
