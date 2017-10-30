
    'use strict';
var angular = require('angular');



    angular
        .module('app.jobs')
        .service('JobService', JobService);

    JobService.$inject = ['$http'];

    /* @ngInject */
    function JobService($http) {

      var api = {
        create:create
      };
      return api;

      ////////////


      function create(job) {
        var jobjson = angular.toJson(job);
        return $http({
              url : '/jobs/create/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                job: jobjson
              }
          });
      }


    }
