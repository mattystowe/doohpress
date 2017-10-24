
    'use strict';
var angular = require('angular');



    angular
        .module('app.compositions')
        .service('CompositionService', CompositionService);

    CompositionService.$inject = ['$http'];

    /* @ngInject */
    function CompositionService($http) {

      var api = {
        getAll:getAll,
        getOutputTypes:getOutputTypes,
        getCompositionCategories:getCompositionCategories
      };
      return api;

      ////////////

      function getAll() {
        return $http({
              url : '/compositions/getall/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

      function getOutputTypes() {
        return $http({
              url : '/compositions/getoutputtypes/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

      function getCompositionCategories() {
        return $http({
              url : '/compositions/getcompositioncategories/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }


    }
