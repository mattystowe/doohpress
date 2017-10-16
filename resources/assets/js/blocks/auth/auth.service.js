
    'use strict';
var angular = require('angular');



    angular
        .module('blocks.auth')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$http','UserService'];

    /* @ngInject */
    function AuthService($http,UserService) {

      var service = {};
      service.user = {};



      ////////////
      var api = {
        init:init,
        currentUser:currentUser
      };
      return api;
      ///////////

      function init() {
        return UserService.getUser()
        .then(function(data){
          service.user = data.data;
          return data;
        }, function(data) {
          //httperror
          return data;
        });
      }

      ////////////



      function currentUser() {
        return service.user;
      }





    }
