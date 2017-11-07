
    'use strict';
    var angular = require('angular');


    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = [
      '$scope',
      '$state',
      'AuthService',
      'CompositionService'
    ];

    /* @ngInject */
    function HomeController(
      $scope,
      $state,
      AuthService,
      CompositionService
    ) {


        var vm = this;

        vm.Auth = Auth;

        vm.marker = {
          latitude: 51.212206693388616,
          longitude: 4.401054382324219
        }

        vm.featuredcompositions = [];




        /////////////////////////////////////////////////
        activate();

        function activate() {

          getFeaturedCompositions();
        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////


        function getFeaturedCompositions() {
          CompositionService.getFeatured()
          .then(
            function(data) {
            //
            //saved - send user somewhere
            vm.featuredcompositions = data.data;
            },
            function(data) {
              toastr.error('Error','There was an error getting featured compositions.');
            }
          );
        }


    }
