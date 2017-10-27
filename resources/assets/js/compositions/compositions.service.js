
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
        getCompositionCategories:getCompositionCategories,
        saveNewComposition:saveNewComposition,
        load:load,
        updateComposition:updateComposition,
        updateProduct:updateProduct,
        removeExample:removeExample,
        addExample:addExample
      };
      return api;

      ////////////

      function removeExample(example) {
        return $http({
              url : '/compositions/removeexample/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                example_id: example.id
              }
          });
      }

      function addExample(example,composition) {
        return $http({
              url : '/compositions/addexample/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                composition_id: composition.id,
                url: example.url,
                title: example.title,
                exampletype: example.exampletype
              }
          });
      }


      function load(composition_id) {
        return $http({
              url : '/compositions/load/' + composition_id,
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }


      function updateProduct(composition,product) {
        return $http({
              url : '/compositions/updateproduct/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                composition_id: composition.id,
                wemockup_product_id: product.id
              }
          });
      }

      function updateComposition(composition) {
        var compositionjson = angular.toJson(composition);
        return $http({
              url : '/compositions/update/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                composition: compositionjson
              }
          });
      }

      function saveNewComposition(composition) {
        var compositionjson = angular.toJson(composition);
        return $http({
              url : '/compositions/savenew/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                composition: compositionjson
              }
          });
      }

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
