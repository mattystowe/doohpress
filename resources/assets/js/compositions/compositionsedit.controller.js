
    'use strict';
    var angular = require('angular');


    angular
        .module('app.compositions')
        .controller('CompositionsEditController', CompositionsEditController);

    CompositionsEditController.$inject = ['$scope','$state','AuthService','toastr','SweetAlert','CompositionService','$stateParams'];

    /* @ngInject */
    function CompositionsEditController($scope, $state, AuthService,toastr,SweetAlert,CompositionService,$stateParams) {
        var vm = this;

        vm.Auth = Auth;

        vm.composition = {};



        /////////////////////////////////////////////////
        activate();

        function activate() {
          console.log($stateParams.composition_id);

        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////




    }
