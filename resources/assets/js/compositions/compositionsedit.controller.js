
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
        vm.outputtypes = [];
        vm.compositioncategories = [];

        vm.isCompositionValid = isCompositionValid;
        vm.saveComposition = saveComposition;

        /////////////////////////////////////////////////
        activate();

        function activate() {
          loadComposition($stateParams.composition_id);
          getOutputTypes();
          getCompositionCategories();
          //getSkuTypes();
        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////


        //process saving of the composition
        //
        //
        //
        function saveComposition() {
          CompositionService.updateComposition(vm.composition)
          .then(
            function(data) {
            //
            //saved - send user somewhere
            toastr.success('Success','Saved!');
            },
            function(data) {
              toastr.error('Error','There was an error saving your composition');
            }
          );
        }



        function isCompositionValid() {
          var valid = true;

          return valid;
        }


        function getOutputTypes() {
          CompositionService.getOutputTypes()
          .then(function(data) {
            if (data.status == 200) {
              vm.outputtypes = data.data;

            } else {
              //
              //log error
              toastr.error('Error','There was an error getting compositions.');
            }
          });
        }

        function getCompositionCategories() {
          CompositionService.getCompositionCategories()
          .then(function(data) {
            if (data.status == 200) {

              vm.compositioncategories = data.data;
            } else {
              //
              //log error
              toastr.error('Error','There was an error getting compositions.');
            }
          });
        }

        function getSkuTypes() {
          SkuService.getAllTypes()
          .then(function(data) {
            if (data.status == 200) {

              vm.skutypes = data.data
            } else {
              //
              //log error
              toastr.error('Error','There was an error loading sku types');
            }
          });
        }



        //Load the composition id
        //
        //
        //
        function loadComposition(composition_id) {
          CompositionService.load(composition_id)
          .then(
            function(data) {
            //
            //saved - send user somewhere
            vm.composition = data.data;

            },
            function(data) {
              toastr.error('Error','There was an error loading composition.');
            }
          );
        }


    }
