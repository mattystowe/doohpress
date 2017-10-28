
    'use strict';
var angular = require('angular');



    angular
        .module('app.owners')
        .service('OwnerService', OwnerService);

    OwnerService.$inject = ['$http'];

    /* @ngInject */
    function OwnerService($http) {

      var api = {
        getAll:getAll
      };
      return api;

      ////////////

      function getAll() {
        return $http({
              url : '/owners/getall/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

    }
