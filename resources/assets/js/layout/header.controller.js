
    'use strict';
    var angular = require('angular');


    angular
        .module('app.layout')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope','$state'];

    /* @ngInject */
    function HeaderController($scope, $state) {
        var vm = this;

        vm.toggleMenu = toggleMenu;

        /////////////////////////////////////////////////
        activate();

        function activate() {
            //console.log($state.current.name);
        }

        /////////////////////////////////////////////////


        //Toggle menu
        //
        function toggleMenu() {
          $('#burgerMenu').toggleClass('open');
          $('#navigation').slideToggle(400);
        }

    }
