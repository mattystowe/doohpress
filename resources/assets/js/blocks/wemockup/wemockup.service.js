
    'use strict';
var angular = require('angular');



    angular
        .module('blocks.wemockup')
        .service('WemockupService', WemockupService);

    WemockupService.$inject = ['$http'];

    /* @ngInject */
    function WemockupService($http) {


      ////////////
      var api = {
        search:search
      };
      return api;
      ///////////


      function search(query) {
        return $http({
              url : '/wemockup/products/search/' + query,
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }


    }
