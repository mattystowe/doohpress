
    'use strict';
var angular = require('angular');



    angular
        .module('app.countries')
        .service('CountryService', CountryService);

    CountryService.$inject = ['$http'];

    /* @ngInject */
    function CountryService($http) {

      var api = {
        getAll:getAll,
        addNew:addNew,
        removeCountry:removeCountry
      };
      return api;

      ////////////

      function getAll() {
        return $http({
              url : '/countries/getall/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

      function addNew(country) {
        return $http({
              url : '/countries/add/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                name: country.name,
                country_code: country.country_code
              }
          });
      }


      function removeCountry(country) {
        return $http({
              url : '/countries/remove/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                country_id: country.id
              }
          });
      }


    }
