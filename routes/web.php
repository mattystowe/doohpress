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
  $this->post('/team/createinvitation/','TeamController@createInvitation');
  $this->get('/roles/getall/','RoleController@getAllRoles');

  $this->get('/countries/getall/','CountriesController@getAll');
  $this->get('/cities/getall/','CitiesController@getAll');
  $this->get('/cities/getallincountry/{country_id}','CitiesController@getAllForCountry');
  $this->post('/countries/add/','CountriesController@addNew');
  $this->post('/countries/remove/','CountriesController@remove');
  $this->post('/cities/add/','CitiesController@addNew');
  $this->post('/cities/remove/','CitiesController@remove');

  $this->get('/compositions/getall/',"CompositionsController@getAll");
  $this->get('/compositions/load/{composition_id}','CompositionsController@load');
  $this->get('/compositions/getoutputtypes/',"CompositionsController@getOutputTypes");
  $this->get('/compositions/getcompositioncategories/',"CompositionsController@getCompositionCategories");
  $this->post('/compositions/savenew/','CompositionsController@saveNew');
  $this->post('/compositions/update/','CompositionsController@update');
  $this->get('/frames/search/{query}',"FramesController@search");
  $this->get('/skutypes/getall/','SkusController@getAll');

  $this->get('/wemockup/products/search/{query}',"WemockupController@search");


});


//Team invitation responses
$this->get('/team/join/{invitation_uuid}','TeamController@join');
$this->get('/team/joined/{invitation_uuid}','TeamController@joined')->middleware('auth');
$this->get('/register/withinvite/{invitation_uuid}','Auth\RegisterController@withInvite');
$this->post('/register/handlewithinvite/','Auth\RegisterController@handleWithInvite');
