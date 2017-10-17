
    'use strict';
var angular = require('angular');



    angular
        .module('blocks.auth')
        .service('UserService', UserService);

    UserService.$inject = ['$http'];

    /* @ngInject */
    function UserService($http) {

      var api = {
        getUser:getUser,
        updateDetails:updateDetails,
        updatePassword:updatePassword,
        updateProfilePic:updateProfilePic
      };
      return api;

      ////////////

      function getUser() {
        return $http({
              url : '/user/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }


      function updateDetails(user) {
        var userjson = angular.toJson(user);
        return $http({
              url : '/user/update/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                user: userjson
              }
          });
      }

      function updatePassword(password) {
        return $http({
              url : '/user/updatepassword/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                password: password
              }
          });
      }


      function updateProfilePic(profilepic) {
        return $http({
              url : '/user/updateprofilepic/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                profilepic: profilepic
              }
          });
      }


    }
