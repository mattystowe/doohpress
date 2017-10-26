
    'use strict';
var angular = require('angular');



    angular
        .module('app.compositions')
        .service('SkuService', SkuService);

    SkuService.$inject = ['$http'];

    /* @ngInject */
    function SkuService($http) {

      var api = {
        getAllTypes:getAllTypes
      };
      return api;

      ////////////

      function getAllTypes() {
        return $http({
              url : '/skutypes/getall/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }



    }
