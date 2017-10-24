
    'use strict';
    var angular = require('angular');


    angular
        .module('app.compositions')
        .controller('CompositionsController', CompositionsController);

    CompositionsController.$inject = ['$scope','$state','AuthService','toastr','SweetAlert','CompositionService'];

    /* @ngInject */
    function CompositionsController($scope, $state, AuthService,toastr,SweetAlert,CompositionService) {
        var vm = this;

        vm.Auth = Auth;

        vm.compositions = [];
        vm.outputtypes = [];
        vm.compositioncategories = [];

        vm.composition = {
          name: null,
          description: null,
          frames: [],
          outputtype: {},
          compositioncategory: {}
        }; // placeholder for new comp



        /////////////////////////////////////////////////
        activate();

        function activate() {

          getCompositions();
          getOutputTypes();
          getCompositionCategories();
        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////


        function getCompositions() {
          CompositionService.getAll()
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

        function getOutputTypes() {
          CompositionService.getOutputTypes()
          .then(function(data) {
            if (data.status == 200) {

              vm.compositions = data.data;
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


    }
