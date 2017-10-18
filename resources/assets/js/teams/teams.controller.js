
    'use strict';
    var angular = require('angular');


    angular
        .module('app.teams')
        .controller('TeamsController', TeamsController);

    TeamsController.$inject = ['$scope','$state','AuthService', 'toastr','TeamService','RoleService'];

    /* @ngInject */
    function TeamsController($scope, $state, AuthService, toastr, TeamService, RoleService) {
        var vm = this;
        vm.Auth = Auth;

        vm.changeTeam = changeTeam;

        vm.getTeamDetails = getTeamDetails;
        vm.teamMembers = [];

        vm.userIsMyself = userIsMyself;

        vm.handleProfilePicUpload = handleProfilePicUpload;

        vm.changeUserRole = changeUserRole;

        /////////////////////////////////////////////////
        activate();

        function activate() {
          getTeamDetails();
          $scope.$watch( AuthService.currentTeam, function ( currentTeam ) {
            vm.getTeamDetails();
          });
        }

        function Auth() {
          return AuthService;
        }


        /////////////////////////////////////////////////

        function changeUserRole(user, team, role_id) {
          RoleService.updateUserRole(user.id,team.id,role_id)
          .then(function(data) {
            if (data.status == 200) {
              //if self updating - change AuthService current user role to the new one
              if (userIsMyself(user)) {
                vm.Auth().setRole(data.data);
              }
              toastr.success('Success','User role updated.');
            } else {
              //
              //log error
              toastr.error('Error','There was an error loading team details.');
            }
          });
        }



        function changeTeam(team) {
          AuthService.changeCurrentTeam(team);
        }






        function getTeamDetails() {
          TeamService.getTeamDetails(vm.Auth().currentTeam().id)
          .then(function(data) {
            if (data.status == 200) {
              vm.teamMembers = data.data.users;
              //console.log(data.data.users);
            } else {
              //
              //log error
              toastr.error('Error','There was an error loading team details.');
            }
          });
        }





        //helper function to return bool if passed user is actually myself (current logged in user)
        //
        function userIsMyself(user) {
          if (user.id == vm.Auth().currentUser().id) {
            return true;
          } else {
            return false;
          }
        }


        //Handle profile pic upload for current team
        //
        //
        function handleProfilePicUpload(file) {
          AuthService.updateCurrentTeamProfilePic(file)
          .then(function(data) {
            if (data.status == 200) {
              toastr.success('Success','Your details have been saved.');
            } else {
              //
              //log error
              toastr.error('Error','There was an error saving.');
            }
          });
        }


    }
