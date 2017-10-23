
    'use strict';
var angular = require('angular');



    angular
        .module('app.countries')
        .service('CityService', CityService);

    CityService.$inject = ['$http'];

    /* @ngInject */
    function CityService($http) {

      var api = {
        getAll:getAll,
        getAllInCountry:getAllInCountry,
        addNew:addNew,
        removeCity:removeCity
      };
      return api;

      ////////////

      function getAll() {
        return $http({
              url : '/cities/getall/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

      function getAllInCountry(country) {
        return $http({
              url : '/cities/getallincountry/' + country.id,
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }


      //add a new city to a country
      function addNew(city,country) {
        return $http({
              url : '/cities/add/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                name: city.name,
                country_id: country.id
              }
          });
      }


      function removeCity(city) {
        return $http({
              url : '/cities/remove/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                city_id: city.id
              }
          });
      }

    }
