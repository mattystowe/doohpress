
    'use strict';
var angular = require('angular');



    angular
        .module('app.teams')
        .service('TeamService', TeamService);

    TeamService.$inject = ['$http'];

    /* @ngInject */
    function TeamService($http) {

      var api = {
        getTeamDetails:getTeamDetails,
        updateProfilePic:updateProfilePic
      };
      return api;

      ////////////

      function getTeamDetails(teamid) {
        return $http({
              url : '/team/getdetails/' + teamid,
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

      function updateProfilePic(teamid, file) {
        return $http({
              url : '/team/updateprofilepic/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                teamid: teamid,
                profilepic: file
              }
          });
      }


    }
