
    'use strict';
    var angular = require('angular');


    angular
        .module('app.search')
        .controller('SearchCompositionsController', SearchCompositionsController);

    SearchCompositionsController.$inject = [
      '$scope',
      '$rootScope',
      '$state',
      '$stateParams',
      'AuthService',
      'toastr',
      '$sce',
      '$interval',
      'FrameService',
      'CityService',
      'OwnerService',
      'CompositionService'
    ];

    /* @ngInject */
    function SearchCompositionsController(
      $scope,
      $rootScope,
      $state,
      $stateParams,
      AuthService,
      toastr,
      $sce,
      $interval,
      FrameService,
      CityService,
      OwnerService,
      CompositionService
    ) {


        var vm = this;

        vm.Auth = Auth;

        vm.display = 'list'; // list or map view mode
        vm.compositions = [];

        vm.filters = {
          query: '',
          owner_id: null,
          city_id: null,
          frametype_id: null,
          compositioncategory_id: null,
          outputtype_id: null,
        }
        vm.clearFilters = clearFilters;

        vm.frametypes = [];
        vm.cities = [];
        vm.owners = [];
        vm.compositioncategories = [];
        vm.outputtypes = [];

        vm.doSearch = doSearch;

        vm.getFrameTypeIcon = getFrameTypeIcon;

        /////////////////////////////////////////////////
        activate();

        function activate() {
          getFrameTypes();
          getOwners();
          getCities();
          getCompositionCategories();
          getOutputTypes();
          //
          doSearch();
        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////

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



        function getFrameTypeIcon(frametype_id) {
          return FrameService.getFrameTypeIcon(frametype_id);
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



        function clearFilters() {
          vm.filters = {
            query: '',
            owner_id: null,
            city_id: null,
            frametype_id: null,
            compositioncategory_id: null,
            outputtype_id: null,
          }
          doSearch();
        }



        function doSearch() {
          CompositionService.searchFiltered(vm.filters)
          .then(
            function(data) {
            //
            //saved - send user somewhere
            vm.compositions = data.data
            },
            function(data) {
              toastr.error('Error','There was an error loading compositions');
            }
          );
        }


    }
