
    'use strict';
    var angular = require('angular');


    angular
        .module('app.teams')
        .controller('TeamsController', TeamsController);

    TeamsController.$inject = ['$scope','$state','AuthService', 'toastr','TeamService','RoleService'];

    /* @ngInject */
    function TeamsController($scope, $state, AuthService, toastr, TeamService, RoleService) {
        var vm = this;

        vm.getUser = getUser;
        vm.changeTeam = changeTeam;
        vm.getCurrentTeam = getCurrentTeam;

        vm.getTeamDetails = getTeamDetails;

        vm.teamMembers = [];

        vm.userIsMyself = userIsMyself;

        vm.handleProfilePicUpload = handleProfilePicUpload;

        vm.availableRoles = [];
        vm.changeUserRole = changeUserRole;

        /////////////////////////////////////////////////
        activate();

        function activate() {
          getTeamDetails();
          getAvailableRoles();
          $scope.$watch( AuthService.currentTeam, function ( currentTeam ) {
            vm.getTeamDetails();
          });
        }

        /////////////////////////////////////////////////

        function changeUserRole(teamMember_id, team_id, role_id) {
          console.log('Change user ' + teamMember_id + ' to role: ' + role_id + ' for team: ' + team_id);
          RoleService.updateUserRole(teamMember_id,team_id,role_id)
          .then(function(data) {
            if (data.status == 200) {
              toastr.success('Success','User role updated.');
            } else {
              //
              //log error
              toastr.error('Error','There was an error loading team details.');
            }
          });
        }

        function getUser() {
          return AuthService.currentUser();
        }

        function changeTeam(team) {
          AuthService.changeCurrentTeam(team);
        }

        function getCurrentTeam() {
          return AuthService.currentTeam();
        }



        function getTeamDetails() {
          TeamService.getTeamDetails(getCurrentTeam().id)
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

        function getAvailableRoles() {
          RoleService.getAll()
          .then(function(data) {
            if (data.status == 200) {
              vm.availableRoles = data.data;
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
          if (user.id == getUser().id) {
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
