"use strict";

var angular = require('angular');

angular.module('blocks.auth', []);

require('./auth.service');
require('./user.service');

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

  }
