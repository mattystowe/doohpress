
    'use strict';
    var angular = require('angular');


    angular
        .module('app.teams')
        .controller('TeamsController', TeamsController);

    TeamsController.$inject = ['$scope','$state','AuthService', 'toastr','TeamService'];

    /* @ngInject */
    function TeamsController($scope, $state, AuthService, toastr, TeamService) {
        var vm = this;

        vm.getUser = getUser;
        vm.changeTeam = changeTeam;
        vm.getCurrentTeam = getCurrentTeam;

        vm.getTeamDetails = getTeamDetails;

        vm.teamMembers = [];

        vm.userIsMyself = userIsMyself;

        vm.handleProfilePicUpload = handleProfilePicUpload;

        /////////////////////////////////////////////////
        activate();

        function activate() {
          getTeamDetails();
          $scope.$watch( AuthService.currentTeam, function ( currentTeam ) {
            vm.getTeamDetails();
          });
        }

        /////////////////////////////////////////////////


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
