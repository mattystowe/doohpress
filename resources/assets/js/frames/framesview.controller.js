
    'use strict';
    var angular = require('angular');


    angular
        .module('app.frames')
        .controller('FramesViewController', FramesViewController);

    FramesViewController.$inject = [
      '$scope',
      '$rootScope',
      '$state',
      '$stateParams',
      'AuthService',
      'toastr',
      'FrameService',
      'OwnerService',
      'CityService'
    ];

    /* @ngInject */
    function FramesViewController(
      $scope,
      $rootScope,
      $state,
      $stateParams,
      AuthService,
      toastr,
      FrameService,
      OwnerService,
      CityService
    ) {




        var vm = this;

        vm.Auth = Auth;

        vm.frame = {};



        /////////////////////////////////////////////////
        activate();

        function activate() {
          loadFrame($stateParams.frame_id);

        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////


        function loadFrame(frame_id) {
          FrameService.load(frame_id)
          .then(
            function(data) {
            //
            vm.frame = data.data
            },
            function(data) {
              toastr.error('Error','There was an error loading frame');
            }
          );
        }




    }
