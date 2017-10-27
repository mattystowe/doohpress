
    'use strict';
var angular = require('angular');



    angular
        .module('app.core')
        .service('TagService', TagService);

    TagService.$inject = ['$http'];

    /* @ngInject */
    function TagService($http) {

      var api = {
        search:search,
        addTagToComposition:addTagToComposition,
        removeTagFromComposition:removeTagFromComposition
      };
      return api;

      ////////////

      function search(query) {
        return $http({
              url : '/tags/search/' + query,
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

      function addTagToComposition(tag, composition) {
        return $http({
              url : '/tags/addtocomposition/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                composition_id: composition.id,
                tag_id: tag.id
              }
          });
      }


      function removeTagFromComposition(tag, composition) {
        return $http({
              url : '/tags/removefromcomposition/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                composition_id: composition.id,
                tag_id: tag.id
              }
          });
      }


    }
