
    'use strict';
var angular = require('angular');



    angular
        .module('blocks.auth')
        .service('UserService', UserService);

    UserService.$inject = ['$http'];

    /* @ngInject */
    function UserService($http) {

      var api = {
        getUser:getUser
      };
      return api;

      ////////////

      function getUser() {
        return $http({
              url : '/user/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }


    }
