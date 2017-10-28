
    'use strict';
var angular = require('angular');



    angular
        .module('app.frames')
        .service('FrameService', FrameService);

    FrameService.$inject = ['$http'];

    /* @ngInject */
    function FrameService($http) {

      var api = {
        search:search,
        addFrameToComposition:addFrameToComposition,
        removeFrameFromComposition:removeFrameFromComposition,
        getAll:getAll,
        getFrameTypes:getFrameTypes,
        getFrameFormats:getFrameFormats,
        add:add,
        load:load,
        save:save
      };
      return api;

      ////////////

      function add(frame) {
        var framejson = angular.toJson(frame);
        return $http({
              url : '/frames/add/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                frame: framejson
              }
          });
      }

      function save(frame) {
        var framejson = angular.toJson(frame);
        return $http({
              url : '/frames/update/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                frame: framejson
              }
          });
      }

      function load(frame_id) {
        return $http({
              url : '/frames/get/' + frame_id,
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

      function getFrameTypes() {
        return $http({
              url : '/frames/gettypes/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

      function getFrameFormats() {
        return $http({
              url : '/frames/getformats/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

      function getAll() {
        return $http({
              url : '/frames/getall/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

      function search(query) {
        return $http({
              url : '/frames/search/' + query,
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

      function addFrameToComposition(composition,frame) {
        return $http({
              url : '/frames/addtocomposition/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                composition_id: composition.id,
                frame_id: frame.id
              }
          });
      }

      function removeFrameFromComposition(composition, frame) {
        return $http({
              url : '/frames/removefromcomposition/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                composition_id: composition.id,
                frame_id: frame.id
              }
          });
      }


    }
