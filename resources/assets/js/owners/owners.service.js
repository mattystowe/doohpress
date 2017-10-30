
    'use strict';
var angular = require('angular');



    angular
        .module('app.owners')
        .service('OwnerService', OwnerService);

    OwnerService.$inject = ['$http'];

    /* @ngInject */
    function OwnerService($http) {

      var api = {
        load:load,
        getAll:getAll,
        add:add,
        update:update
      };
      return api;

      ////////////
      function load(owner_id) {
        return $http({
              url : '/owners/load/' + owner_id,
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }


      function getAll() {
        return $http({
              url : '/owners/getall/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

      function add(owner) {
        var ownerjson = angular.toJson(owner);
        return $http({
              url : '/owners/add/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                owner: ownerjson
              }
          });
      }


      function update(owner) {
        var ownerjson = angular.toJson(owner);
        return $http({
              url : '/owners/update/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                owner: ownerjson
              }
          });
      }

    }
