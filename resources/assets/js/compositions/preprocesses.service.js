
    'use strict';
var angular = require('angular');



    angular
        .module('app.compositions')
        .service('PreprocessService', PreprocessService);

    PreprocessService.$inject = ['$http'];

    /* @ngInject */
    function PreprocessService($http) {

      var api = {
        getAvailable:getAvailable,
        save:save
      };
      return api;

      ////////////

      function save(preprocess) {
        var jsondata = angular.toJson(preprocess);
        return $http({
              url : '/compositions/preprocess/add/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                preprocess: jsondata
              }
          });
      }



      function getAvailable() {
        var availablePreprocesses = [
          'Video_Transcode_FitToFrame',
          'Image_Convert_RenderPDF_toJpeg'
        ];
        return availablePreprocesses;
      }


    }
