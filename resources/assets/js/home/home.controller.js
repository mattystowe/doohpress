
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

        vm.marker = {
          latitude: 51.212206693388616,
          longitude: 4.401054382324219
        }





        /////////////////////////////////////////////////
        activate();

        function activate() {


        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////



    }
