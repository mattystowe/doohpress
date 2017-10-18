
    'use strict';
    var angular = require('angular');


    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope','$state','AuthService'];

    /* @ngInject */
    function HomeController($scope, $state, AuthService) {
        var vm = this;

        vm.Auth = Auth;




        /////////////////////////////////////////////////
        activate();

        function activate() {


        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////

        


    }
