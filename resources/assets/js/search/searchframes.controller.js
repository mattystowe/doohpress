
    'use strict';
    var angular = require('angular');


    angular
        .module('app.search')
        .controller('SearchFramesController', SearchFramesController);

    SearchFramesController.$inject = [
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
      'OwnerService'
    ];

    /* @ngInject */
    function SearchFramesController(
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
      OwnerService
    ) {


        var vm = this;

        vm.Auth = Auth;

        vm.display = 'list'; // list or map view mode

        vm.filters = {
          query: '',
          owner_id: null,
          city_id: null,
          frametype_id: null
        }
        vm.clearFilters = clearFilters;

        vm.frametypes = [];
        vm.cities = [];
        vm.owners = [];

        vm.doSearch = doSearch;

        vm.getFrameTypeIcon = getFrameTypeIcon;

        /////////////////////////////////////////////////
        activate();

        function activate() {
          getFrameTypes();
          getOwners();
          getCities();
          //
          doSearch();
        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////




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
            frametype_id: null
          }
          doSearch();
        }



        function doSearch() {
          FrameService.searchFiltered(vm.filters)
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
