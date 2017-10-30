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
  $this->get('/cities/getallgroupedbycountry/','CitiesController@getAllGroupedByCountry');
  $this->get('/compositions/getall/',"CompositionsController@getAll");
  $this->get('/compositions/load/{composition_id}','CompositionsController@load');
  $this->get('/compositions/getoutputtypes/',"CompositionsController@getOutputTypes");
  $this->get('/compositions/getcompositioncategories/',"CompositionsController@getCompositionCategories");
  $this->get('/frames/search/{query}','FramesController@search');
  $this->get('/frames/get/{frame_id}','FramesController@load');
  $this->get('/frames/getall/','FramesController@getAll');
  $this->get('/frames/gettypes/','FramesController@getAllTypes');
  $this->get('/frames/getformats/','FramesController@getAllFormats');
  $this->get('/skutypes/getall/','SkusController@getAll');
  $this->get('/wemockup/products/search/{query}',"WemockupController@search");
  $this->get('/tags/search/{query}','TagsController@search');
  $this->get('/owners/getall/','OwnersController@getAll');

  Route::middleware(['superadmin'])->group(function () {

    $this->post('/countries/add/','CountriesController@addNew');
    $this->post('/countries/remove/','CountriesController@remove');
    $this->post('/cities/add/','CitiesController@addNew');
    $this->post('/cities/remove/','CitiesController@remove');
    $this->post('/compositions/savenew/','CompositionsController@saveNew');
    $this->post('/compositions/update/','CompositionsController@update');
    $this->post('/frames/addtocomposition/','FramesController@addToComposition');
    $this->post('/frames/add/','FramesController@add');
    $this->post('/frames/update/','FramesController@update');
    $this->post('/frames/removefromcomposition/','FramesController@removeFromComposition');
    $this->post('/compositions/removesku/','SkusController@removeSku');
    $this->post('/compositions/addsku/','SkusController@addSku');
    $this->post('/compositions/updateskutype/','SkusController@updateSkuType');
    $this->post('/compositions/updateproduct/','CompositionsController@updateProduct');
    $this->post('/compositions/addexample/','CompositionsController@addExample');
    $this->post('/compositions/removeexample/','CompositionsController@removeExample');
    $this->post('/compositions/skuorder/','CompositionsController@saveSkuOrder');

    $this->post('/tags/addtocomposition/','TagsController@AddToComposition');
    $this->post('/tags/removefromcomposition/','TagsController@RemoveFromComposition');


    $this->post('/owners/add/','OwnersController@add');
    $this->post('/owners/update/','OwnersController@update');
    $this->get('/owners/load/{owner_id}','OwnersController@load');
  });

});


//Team invitation responses
$this->get('/team/join/{invitation_uuid}','TeamController@join');
$this->get('/team/joined/{invitation_uuid}','TeamController@joined')->middleware('auth');
$this->get('/register/withinvite/{invitation_uuid}','Auth\RegisterController@withInvite');
$this->post('/register/handlewithinvite/','Auth\RegisterController@handleWithInvite');
