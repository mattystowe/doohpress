
    'use strict';
    var angular = require('angular');


    angular
        .module('app.frames')
        .controller('FramesController', FramesController);

    FramesController.$inject = ['$scope','$rootScope','$state','$stateParams','AuthService','toastr','FrameService','OwnerService','CityService'];

    /* @ngInject */
    function FramesController($scope, $rootScope,$state, $stateParams, AuthService,toastr,FrameService,OwnerService,CityService) {
        var vm = this;

        vm.Auth = Auth;

        vm.frame = {};

        vm.frames = [];
        vm.frametypes = [];
        vm.owners = [];
        vm.countries = [];

        vm.handleThumbnail = handleThumbnail;
        vm.handleImage = handleImage;

        vm.isFrameValid = isFrameValid;
        vm.saveFrame = saveFrame;
        vm.updateFrame = updateFrame;

        /////////////////////////////////////////////////
        activate();

        function activate() {
          getFrames();
          getFrameTypes();
          getOwners();
          getCities();

          $rootScope.$on('$stateChangeStart',
          function(event, toState, toParams, fromState, fromParams){
              if (toState.name == 'frames.edit' || toState.name == 'frames.view' ) {
                loadFrame(toParams.frame_id);
              }
              if (toState.name == 'frames.add') {
                vm.frame = {};
              }
          });

          if ($state.current.name == 'frames.edit') {
            loadFrame($stateParams.frame_id);
          }

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



        function isFrameValid() {
            var valid = true;

            return valid;
        }

        function saveFrame() {
          FrameService.add(vm.frame)
          .then(
            function(data) {
            //
            //
            toastr.success('Success','Frame saved');
            $state.go('frames.view',{frame_id:data.data.id});
            },
            function(data) {
              toastr.error('Error','There was an error saving frame');
            }
          );
        }



        function updateFrame() {
          FrameService.save(vm.frame)
          .then(
            function(data) {
            //
            //
            toastr.success('Success','Frame updated');
            $state.go('frames.view',{frame_id:data.data.id});
            },
            function(data) {
              toastr.error('Error','There was an error saving frame');
            }
          );
        }


        function handleThumbnail(file) {
          vm.frame.thumbnail = file;
          $scope.$apply();
        }

        function handleImage(file) {
          vm.frame.image = file;
          $scope.$apply();
        }



        function getFrameTypes() {
          FrameService.getFrameTypes()
          .then(
            function(data) {
            //
            //saved - send user somewhere
            vm.frametypes = data.data
            },
            function(data) {
              toastr.error('Error','There was an error loading frame types');
            }
          );
        }

        function getCities() {
          CityService.getAllGroupedByCountry()
          .then(
            function(data) {
            //
            //saved - send user somewhere
            vm.countries = data.data
            },
            function(data) {
              toastr.error('Error','There was an error loading countries and cities');
            }
          );
        }

        function getOwners() {
          OwnerService.getAll()
          .then(
            function(data) {
            //
            //saved - send user somewhere
            vm.owners = data.data
            },
            function(data) {
              toastr.error('Error','There was an error loading owners');
            }
          );
        }


        function getFrames() {
          FrameService.getAll()
          .then(
            function(data) {
            //
            //saved - send user somewhere
            vm.frames = data.data
            },
            function(data) {
              toastr.error('Error','There was an error loading frames');
            }
          );
        }


    }
