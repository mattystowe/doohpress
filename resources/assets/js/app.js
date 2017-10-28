'use strict';

//jquery expects global window access
window.$ = window.jQuery = require('jquery')
//require('bootstrap');
//Angular app
var angular = require('angular');

require('./core');
require('./layout');
require('./home');
require('./profile');
require('./teams');
require('./countries');
require('./compositions');
require('./frames');
require('./owners');

angular.module('app', [
  'app.core',
  'app.layout',
  'app.home',
  'app.profile',
  'app.teams',
  'app.countries',
  'app.compositions',
  'app.frames',
  'app.owners'
]);

var authblock = angular.module('blocks.auth')
authblock.run(runBlock);

  runBlock.$inject = ['AuthService','$state'];

  /* @ngInject */
  function runBlock(AuthService, $state) {

    AuthService.init()
    .then(function(data){
      //console.log(data.status);
      if (data.status != 200) {
        //console.log('ERROR');
        $state.go('404');
      }
    });;

    AuthService.initRoles()
    .then(function(data){
      //console.log(data.status);
      if (data.status != 200) {
        //console.log('ERROR');
        $state.go('404');
      }
    });;



  }
