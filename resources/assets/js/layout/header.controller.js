
    'use strict';
    var angular = require('angular');


    angular
        .module('app.layout')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope','$state','AuthService'];

    /* @ngInject */
    function HeaderController($scope, $state, AuthService) {
        var vm = this;
        vm.Auth = Auth;


        vm.toggleMenu = toggleMenu;
      

        vm.changeTeam = changeTeam;


        /////////////////////////////////////////////////
        activate();

        function activate() {

        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////


        //Toggle menu
        //
        function toggleMenu() {
          $('#burgerMenu').toggleClass('open');
          $('#navigation').slideToggle(400);
        }




        function changeTeam(team) {
          AuthService.changeCurrentTeam(team);
        }



    }
