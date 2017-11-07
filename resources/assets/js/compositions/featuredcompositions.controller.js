
    'use strict';
    var angular = require('angular');


    angular
        .module('app.compositions')
        .controller('FeaturedCompositionsController', FeaturedCompositionsController);

    FeaturedCompositionsController.$inject = [
      '$scope',
      '$state',
      'AuthService',
      'toastr',
      'SweetAlert',
      'CompositionService',
      '$stateParams',
      'JobService'];

    /* @ngInject */
    function FeaturedCompositionsController(
      $scope,
      $state,
      AuthService,
      toastr,
      SweetAlert,
      CompositionService,
      $stateParams,
      JobService) {




        var vm = this;

        vm.Auth = Auth;

        vm.featuredcompositions = [];



        /////////////////////////////////////////////////
        activate();

        function activate() {
          loadFeaturedCompositions();
        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////


        function loadFeaturedCompositions() {
          CompositionService.getFeatured()
          .then(
            function(data) {
            //
            vm.featuredcompositions = data.data;
            },
            function(data) {
              if (data.status == 404) {
                $state.go('404');
              } else {
                toastr.error('Error','There was an error loading featured compositions');
              }
            }
          );
        }


    }
