
    'use strict';
    var angular = require('angular');


    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = [
      '$scope',
      '$state',
      'AuthService',
      'CompositionService',
      'JobService'
    ];

    /* @ngInject */
    function HomeController(
      $scope,
      $state,
      AuthService,
      CompositionService,
      JobService
    ) {


        var vm = this;

        vm.Auth = Auth;

        vm.marker = {
          latitude: 51.212206693388616,
          longitude: 4.401054382324219
        }

        vm.getLatestTeamJobs = getLatestTeamJobs;
        vm.getLatestUserJobs = getLatestUserJobs;
        vm.featuredcompositions = [];
        vm.latestTeamJobs = [];
        vm.latestMyJobs = [];


        /////////////////////////////////////////////////
        activate();

        function activate() {

          getFeaturedCompositions();
          getLatestTeamJobs();
          getLatestUserJobs();

          $scope.$watch( AuthService.currentTeam, function ( currentTeam ) {
            vm.getLatestTeamJobs();
            vm.getLatestUserJobs();
          });

        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////

        function getLatestTeamJobs() {
          JobService.getJobs({
            display: 'teamjobs',
            team_id: vm.Auth().currentTeam().id
          })
          .then(
            function(data) {
            //
            //saved - send user somewhere
            vm.latestTeamJobs = data.data;
            },
            function(data) {
              toastr.error('Error','There was an error getting latest team jobs');
            }
          );
        }

        function getLatestUserJobs() {
          JobService.getJobs({
            display: 'myjobs',
            team_id: vm.Auth().currentTeam().id
          })
          .then(
            function(data) {
            //
            //saved - send user somewhere
            vm.latestMyJobs = data.data;
            },
            function(data) {
              toastr.error('Error','There was an error getting latest team jobs');
            }
          );
        }

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
