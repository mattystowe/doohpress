
    'use strict';
    var angular = require('angular');


    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope','$state','AuthService', 'toastr'];

    /* @ngInject */
    function ProfileController($scope, $state, AuthService, toastr) {
        var vm = this;

        vm.getUser = getUser;

        vm.localUser = {};
        vm.areDetailsValid = areDetailsValid;
        vm.arePasswordDetailsValid = arePasswordDetailsValid;
        vm.submitDetails = submitDetails;
        vm.submitPasswordChange = submitPasswordChange;

        /////////////////////////////////////////////////
        activate();

        function activate() {
            angular.copy(getUser(), vm.localUser); //clone user to local copy for editing

            //$scope.$watch( AuthService.currentUser, function ( currentUser ) {
              //console.log(currentUser);
            //});
        }

        /////////////////////////////////////////////////


        function getUser() {
          return AuthService.currentUser();
        }


        function areDetailsValid() {
          var valid = true;
          if (vm.localUser.firstname == null) { valid = false; }
          if (vm.localUser.lastname == null) { valid = false; }
          if (vm.localUser.email == null) { valid = false; }
          return valid;
        }


        function arePasswordDetailsValid() {
          var valid = true;
          if (vm.localUser.password == null) { valid = false; }
          if (vm.localUser.password_confirm == null) { valid = false; }
          if (vm.localUser.password != vm.localUser.password_confirm) { valid = false; }
          return valid;
        }


        //Submit details to be saved
        //
        //
        function submitDetails() {
          AuthService.updateUserDetails(vm.localUser)
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



        //Submit details to be saved
        //
        //
        function submitPasswordChange() {
          AuthService.updatePassword(vm.localUser)
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
