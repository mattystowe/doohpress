
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
        submitJob:submitJob,
        getJobs:getJobs
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

      function getJobs(params) {
        return $http({
              url : '/jobs/getlist/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                team_id: params.team_id,
                display: params.display
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
