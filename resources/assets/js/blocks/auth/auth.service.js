
    'use strict';
var angular = require('angular');



    angular
        .module('blocks.auth')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$http','UserService','TeamService'];

    /* @ngInject */
    function AuthService($http,UserService,TeamService) {

      var service = this;
      service.user = {};
      service.currentTeam = {};



      ////////////
      var api = {
        init:init,
        currentUser:currentUser,
        currentTeam:currentTeam,
        updateUserDetails:updateUserDetails,
        updatePassword:updatePassword,
        updateUserProfilePic:updateUserProfilePic,
        changeCurrentTeam:changeCurrentTeam,
        updateCurrentTeamProfilePic: updateCurrentTeamProfilePic
      };
      return api;
      ///////////


      //Get initial user object
      //
      //
      function init() {
        return UserService.getUser()
        .then(function(data){
          service.user = data.data;
          service.currentTeam = data.data.teams[0]; // assigns default first team
          return data;
        }, function(data) {
          //httperror
          return data;
        });
      }

      ////////////



      function currentUser() {
        return service.user;
      }

      function currentTeam() {
        return service.currentTeam;
      }






      //Save details to db and if successful update the user store
      //
      //
      function updateUserDetails(user) {
        return UserService.updateDetails(user)
        .then(function(data){
          //success - update the user store
          service.user.firstname = user.firstname;
          service.user.lastname = user.lastname;
          service.user.email = user.email;
          return data;
        }, function(data) {
          //httperror
          return data;
        });
      }


      //save details of new password
      //
      //
      function updatePassword(user) {
        return UserService.updatePassword(user.password)
        .then(function(data){
          //success
          return data;
        }, function(data) {
          //httperror
          return data;
        });
      }


      function updateUserProfilePic(user) {
        return UserService.updateProfilePic(user.profilepic)
        .then(function(data){
          //success
          service.user.profilepic = user.profilepic;
          return data;
        }, function(data) {
          //httperror
          return data;
        });
      }


      function changeCurrentTeam(team) {
        service.currentTeam = team;
      }


      function updateCurrentTeamProfilePic(file) {
        return TeamService.updateProfilePic(currentTeam().id, file)
        .then(function(data){
          //success
          service.currentTeam.profilepic = file;
          //
          service.user.teams.forEach(function(team) {
            if (team.id == currentTeam().id) {
              team.profilepic = file;
            }
          })
          return data;
        }, function(data) {
          //httperror
          return data;
        });
      }


    }
