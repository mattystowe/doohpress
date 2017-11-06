
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
        searchFiltered:searchFiltered,
        addFrameToComposition:addFrameToComposition,
        removeFrameFromComposition:removeFrameFromComposition,
        getAll:getAll,
        getFrameTypes:getFrameTypes,
        add:add,
        load:load,
        save:save,
        getFrameTypeIcon:getFrameTypeIcon,
        removeSpecFile:removeSpecFile,
        addSpecFile:addSpecFile
      };
      return api;

      ////////////


      function removeSpecFile(specfile) {
        return $http({
              url : '/frames/removespecfile/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                specfile_id: specfile.id
              }
          });
      }

      function addSpecFile(specfile) {
        var specfilejson = angular.toJson(specfile);
        return $http({
              url : '/frames/addspecfile/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                specfile: specfilejson
              }
          });
      }

      function getFrameTypeIcon(frametype_id) {
        switch (frametype_id) {
          case 1:
            return {
              icon: 'fa fa-youtube-play',
              styleclass: 'label label-success'
            };

            break;
          default:
            return {
              icon: 'fa fa-newspaper-o',
              styleclass: 'label label-invert'
            };
            break;

        }
      }

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

      function searchFiltered(filters) {
        var filtersjson = angular.toJson(filters);
        return $http({
              url : '/frames/searchfiltered/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                filters: filtersjson
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
