
    'use strict';
var angular = require('angular');



    angular
        .module('app.compositions')
        .service('FrameService', FrameService);

    FrameService.$inject = ['$http'];

    /* @ngInject */
    function FrameService($http) {

      var api = {
        search:search
      };
      return api;

      ////////////

      function search(query) {
        return $http({
              url : '/frames/search/' + query,
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }


    }
