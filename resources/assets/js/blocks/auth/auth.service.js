
    'use strict';
var angular = require('angular');



    angular
        .module('blocks.auth')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$http','UserService'];

    /* @ngInject */
    function AuthService($http,UserService) {

      var service = {};
      service.user = {};



      ////////////
      var api = {
        init:init,
        currentUser:currentUser,
        updateUserDetails:updateUserDetails,
        updatePassword:updatePassword,
        updateUserProfilePic:updateUserProfilePic
      };
      return api;
      ///////////

      function init() {
        return UserService.getUser()
        .then(function(data){
          service.user = data.data;
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




    }
