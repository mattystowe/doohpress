
    'use strict';
    var angular = require('angular');


    angular
        .module('app.compositions')
        .controller('CompositionsViewController', CompositionsViewController);

    CompositionsViewController.$inject = [
      '$scope',
      '$state',
      'AuthService',
      'toastr',
      'SweetAlert',
      'CompositionService',
      '$stateParams',
      'JobService'];

    /* @ngInject */
    function CompositionsViewController(
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

        vm.composition = {};

        vm.setupJob = setupJob;



        /////////////////////////////////////////////////
        activate();

        function activate() {
          loadComposition($stateParams.composition_id);
        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////

        function loadComposition(composition_id) {
          CompositionService.load(composition_id)
          .then(
            function(data) {
            //
            vm.composition = data.data;
            },
            function(data) {
              if (data.status == 404) {
                $state.go('404');
              } else {
              toastr.error('Error','There was an error loading the composition');
              }
            }
          );
        }


        //Process request for setting up a new job now and direct to setup straight away.
        //
        //
        function setupJob(sku, method) {
          var job = {
            team_id: Auth().currentTeam().id,
            user_id: Auth().currentUser().id,
            sku_id: sku.id
          }
          JobService.create(job)
          .then(
            function(data) {
            //


              if (method == 'setup_now') {
                toastr.success('Success!','Your job is ready for setup now!');
                $state.go('jobs.view',{job_id:data.data.id},{reload: true});
              }
              if (method == 'add_to_my_jobs') {
                toastr.success('Success!','View your jobs to see jobs awaiting setup.');

              }
            },
            function(data) {
              if (data.status == 404) {
                $state.go('404');
              } else {
                toastr.error('Error','There was an error creating the job.');
              }
            }
          );
        }



    }
