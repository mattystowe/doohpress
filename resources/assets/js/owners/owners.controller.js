
    'use strict';
    var angular = require('angular');


    angular
        .module('app.owners')
        .controller('OwnersController', OwnersController);

    OwnersController.$inject = ['$scope','$rootScope','$state','$stateParams','AuthService','toastr','OwnerService'];

    /* @ngInject */
    function OwnersController($scope, $rootScope,$state, $stateParams, AuthService,toastr,OwnerService) {
        var vm = this;

        vm.Auth = Auth;

        vm.owners = [];
        vm.owner = {};

        vm.isOwnerValid = isOwnerValid;
        vm.saveOwner = saveOwner;
        vm.updateOwner = updateOwner;
        vm.handleLogo = handleLogo;

        /////////////////////////////////////////////////
        activate();

        function activate() {



          $rootScope.$on('$stateChangeStart',
          function(event, toState, toParams, fromState, fromParams){
              if (toState.name == 'owners.edit') {
                loadOwner(toParams.owner_id);
              }
              if (toState.name == 'owners.add') {
                vm.owner = {};
              }
              if (toState.name == 'owners.list') {
                getOwners();
              }
          });

          if ($state.current.name == 'owners.edit') {
            loadOwner($stateParams.owner_id);
          }
          if ($state.current.name == 'owners.list') {
            getOwners();
          }

        }


        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////

        function getOwners() {
          OwnerService.getAll()
          .then(
            function(data) {
            //
            vm.owners = data.data
            },
            function(data) {
              toastr.error('Error','There was an error loading owners');
            }
          );
        }

        function loadOwner(owner_id) {
          OwnerService.load(owner_id)
          .then(
            function(data) {
            //
            vm.owner = data.data
            },
            function(data) {
              toastr.error('Error','There was an error loading owner');
            }
          );
        }


        function saveOwner() {
          OwnerService.add(vm.owner)
          .then(
            function(data) {
            //
            toastr.success('Success','Owner saved');
            $state.go('owners.list',{},{ reload: true });
            },
            function(data) {
              toastr.error('Error','There was an error saving owner');
            }
          );
        }

        function updateOwner() {
          OwnerService.update(vm.owner)
          .then(
            function(data) {
            //
            toastr.success('Success','Owner updated');
            },
            function(data) {
              toastr.error('Error','There was an error updating owner');
            }
          );
        }


        function isOwnerValid() {
          var valid = true;

          return valid;
        }


        function handleLogo(file) {
          vm.owner.logo = file;
          $scope.$apply();
        }

    }
