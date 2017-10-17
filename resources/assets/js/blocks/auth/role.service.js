
    'use strict';
var angular = require('angular');



    angular
        .module('blocks.auth')
        .service('RoleService', RoleService);

    RoleService.$inject = ['$http'];

    /* @ngInject */
    function RoleService($http) {

      var api = {
        getAll:getAll,
        updateUserRole:updateUserRole
      };
      return api;

      ////////////
      function getAll() {
        return $http({
              url : '/roles/getall/',
              method : 'GET',
              headers : {
                'Content-Type' : 'application/json'
              }
          });
      }

      function updateUserRole(userid, teamid, roleid) {
        return $http({
              url : '/user/updaterole/',
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              data : {
                userid: userid,
                teamid: teamid,
                roleid:roleid
              }
          });
      }


    }
