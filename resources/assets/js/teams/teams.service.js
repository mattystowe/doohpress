
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
        updateProfilePic:updateProfilePic,
        removeUser:removeUser,
        addNew:addNew,
        newInvitation:newInvitation
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

      function removeUser(user, team) {
        return $http({
              url : '/team/removeuser/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                user_id: user.id,
                team_id: team.id
              }
          });
      }

      function addNew(team) {
        return $http({
              url : '/team/addnew/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                team_name: team.name
              }
          });
      }


      function newInvitation(invitation) {
        return $http({
              url : '/team/createinvitation/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                name: invitation.name,
                email: invitation.email,
                team_id: invitation.team_id
              }
          });
      }

    }
