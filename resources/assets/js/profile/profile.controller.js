
    'use strict';
    var angular = require('angular');


    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope','$state','AuthService','UserService'];

    /* @ngInject */
    function ProfileController($scope, $state, AuthService, UserService) {
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
            vm.localUser = getUser();
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
          console.log(vm.localUser);
        }



        //Submit details to be saved
        //
        //
        function submitPasswordChange() {
          console.log(vm.localUser);
        }




    }
