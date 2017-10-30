
    'use strict';
    var angular = require('angular');


    angular
        .module('app.compositions')
        .controller('CompositionsViewController', CompositionsViewController);

    CompositionsViewController.$inject = ['$scope','$state','AuthService','toastr','SweetAlert','CompositionService','$stateParams'];

    /* @ngInject */
    function CompositionsViewController($scope, $state, AuthService,toastr,SweetAlert,CompositionService,$stateParams) {
        var vm = this;

        vm.Auth = Auth;

        vm.composition = {};



        /////////////////////////////////////////////////
        activate();

        function activate() {
          loadComposition($stateParams.composition_id);
        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////

        function loadComposition(composition_id) {
          CompositionService.load(composition_id)
          .then(
            function(data) {
            //
            vm.composition = data.data;
            },
            function(data) {
              if (data.status == 404) {
                $state.go('404');
              } else {
              toastr.error('Error','There was an error loading the composition');
              }
            }
          );
        }


    }
