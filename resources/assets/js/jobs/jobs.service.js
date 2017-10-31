
    'use strict';
var angular = require('angular');



    angular
        .module('app.jobs')
        .service('JobService', JobService);

    JobService.$inject = ['$http'];

    /* @ngInject */
    function JobService($http) {

      var api = {
        create:create,
        load:load,
        submitJob:submitJob
      };
      return api;

      ////////////


      function submitJob(job) {
        var jobjson = angular.toJson(job);
        return $http({
              url : '/jobs/submit/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                job: jobjson
              }
          });
      }



      function load(job_id) {
        return $http({
              url : '/jobs/get/' + job_id,
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

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
