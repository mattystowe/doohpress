
    'use strict';
var angular = require('angular');



    angular
        .module('app.compositions')
        .service('SkuService', SkuService);

    SkuService.$inject = ['$http'];

    /* @ngInject */
    function SkuService($http) {

      var api = {
        getAllTypes:getAllTypes,
        removeSku:removeSku,
        addSku:addSku,
        updateSkuType:updateSkuType
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


      function removeSku(sku) {
        return $http({
              url : '/compositions/removesku/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                sku_id: sku.id,
                composition_id: sku.composition_id
              }
          });
      }

      function addSku(sku) {
        return $http({
              url : '/compositions/addsku/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                sku_id: sku.id,
                composition_id: sku.composition_id,
                wemockup_sku: sku.wemockup_sku,
                skutype_id: sku.skutype_id
              }
          });
      }


      function updateSkuType(sku) {
        return $http({
              url : '/compositions/updateskutype/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                sku_id: sku.id,
                skutype_id: sku.skutype_id
              }
          });
      }


    }
