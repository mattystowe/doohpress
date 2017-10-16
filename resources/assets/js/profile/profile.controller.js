
    'use strict';
    var angular = require('angular');


    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope','$state','AuthService'];

    /* @ngInject */
    function ProfileController($scope, $state, AuthService) {
        var vm = this;

        vm.getUser = getUser;


        /////////////////////////////////////////////////
        activate();

        function activate() {

            //$scope.$watch( AuthService.currentUser, function ( currentUser ) {
              //console.log(currentUser);
            //});
        }

        /////////////////////////////////////////////////


        function getUser() {
          return AuthService.currentUser();
        }




    }
