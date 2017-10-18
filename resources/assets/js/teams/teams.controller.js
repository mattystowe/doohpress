
    'use strict';
    var angular = require('angular');


    angular
        .module('app.teams')
        .controller('TeamsController', TeamsController);

    TeamsController.$inject = ['$scope','$state','AuthService', 'toastr','TeamService','RoleService','SweetAlert'];

    /* @ngInject */
    function TeamsController($scope, $state, AuthService, toastr, TeamService, RoleService,SweetAlert) {
        var vm = this;
        vm.Auth = Auth;

        vm.changeTeam = changeTeam;
        vm.getTeamDetails = getTeamDetails;
        vm.teamMembers = [];
        vm.userIsMyself = userIsMyself;
        vm.handleProfilePicUpload = handleProfilePicUpload;
        vm.changeUserRole = changeUserRole;
        vm.AmIOnlyAdminUser = AmIOnlyAdminUser;
        vm.removeMeFromTeam = removeMeFromTeam;
        vm.removeUserFromTeam = removeUserFromTeam;

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
          if (!userIsMyself(user)) {
            RoleService.updateUserRole(user.id,team.id,role_id)
            .then(function(data) {
              if (data.status == 200) {
                toastr.success('Success','User role updated.');
              } else {
                //
                //log error
                toastr.error('Error','There was an error loading team details.');
              }
            });
          } else {
            toastr.error('Error','You cannot change your own role.');
          }
        }


        //check if I am the only admin user for this current team
        //
        //
        function AmIOnlyAdminUser() {
          if (vm.Auth().getRole().id == 1) {
            //console.log("i am an admin user");
            //check if I am the only admin user
            var admin_users = [];
            vm.teamMembers.forEach(function(member) {
              if (member.role.id == 1) {
                admin_users.push(member);
              }
            });

            if (admin_users.length == 1) {
              //console.log('I am the only admin user')
              return true;
            } else {
              return false;
            }

          } else {
            //not an admin user
            return false;
          }
        }

        //Current user changing team context
        //
        //
        function changeTeam(team) {
          AuthService.changeCurrentTeam(team);
        }


        //Remove me from the current team
        //
        //
        //
        function removeMeFromTeam() {
          SweetAlert.swal({
             title: 'Are you ready?',
             text: '',
             type: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#DD6B55',confirmButtonText: 'Yes, Lets Go!',
             cancelButtonText: 'No, cancel!',
             closeOnConfirm: true,
             closeOnCancel: true },
          function(isConfirm){
             if (isConfirm) {
               sendForProcessing();
             }
          });
          //
          //check that I have another team in account- otherwise not allow
          if (vm.Auth().currentUser().teams.length>1) {

          } else {
            toastr.error('You cannot remove yourself.','This is your only team');
          }
          //remember to refresh Auth.init()
        }


        //remove a user from the current team
        function removeUserFromTeam(user) {

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
