
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
        vm.removeOtherUserFromTeam = removeOtherUserFromTeam;

        vm.newTeam = {
          name: 'khkjhkjhkjh'
        }
        vm.saveNewTeam = saveNewTeam;
        vm.isNewTeamValid = isNewTeamValid;

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

        //save a new team and update the Auth model
        //
        //
        //
        function saveNewTeam() {
          console.log('Adding new team: ' + vm.newTeam.name);
          TeamService.addNew(vm.newTeam)
          .then(function(data) {
            if (data.status == 200) {
              //add new team to the Auth store
              var team = data.data;
              vm.Auth().currentUser().teams.push(team);
              //set the current team to the new one
              vm.Auth().changeCurrentTeam(team);
              toastr.success('Success','Team created!');
            } else {
              //
              //log error
              toastr.error('Error','There was an error saving your team');
            }
          });
        }


        function isNewTeamValid() {
            var valid = true;
            if (vm.newTeam.name == null) { valid = false; }
            return valid;
        }




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
          //
          //check that I have another team in account- otherwise not allow
          if (vm.Auth().currentUser().teams.length>1) {
            SweetAlert.swal({
               title: 'Are you sure?',
               text: '',
               type: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#DD6B55',confirmButtonText: 'Yes, Lets Go!',
               cancelButtonText: 'No, cancel!',
               closeOnConfirm: true,
               closeOnCancel: true },
            function(isConfirm){
               if (isConfirm) {
                 removeUserFromTeam(vm.Auth().currentUser());
               }
            });
          } else {
            toastr.error('You cannot remove yourself.','This is your only team');
          }
          //remember to refresh Auth.init()
        }






        //remove a user from the current team
        function removeUserFromTeam(user) {
          TeamService.removeUser(user, vm.Auth().currentTeam())
          .then(function(data) {
            if (data.status == 200) {
              //
              //
              if (userIsMyself(user)) {
                //renew currently logged in user data
                vm.Auth().init();
              } else {
                //update the teams view
                vm.teamMembers.forEach(function(member, index) {
                  if (member.id == user.id) {
                    vm.teamMembers.splice(index,1);
                  }
                });
              }
              toastr.success('Success','Removed successfully');
            } else {
              //
              //log error
              toastr.error('Error','There was an error loading team details.');
            }
          });
        }



        //remove a user other than currently logged in user
        function removeOtherUserFromTeam(user) {
          SweetAlert.swal({
             title: 'Are you sure?',
             text: '',
             type: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#DD6B55',confirmButtonText: 'Yes, Lets Go!',
             cancelButtonText: 'No, cancel!',
             closeOnConfirm: true,
             closeOnCancel: true },
          function(isConfirm){
             if (isConfirm) {
               removeUserFromTeam(user);
             }
          });
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
