
    'use strict';
    var angular = require('angular');


    angular
        .module('app.jobs')
        .controller('JobsListController', JobsListController);

    JobsListController.$inject = [
      '$scope',
      '$rootScope',
      '$state',
      '$stateParams',
      'AuthService',
      'toastr',
      'JobService',
      '$sce',
      '$interval'
    ];

    /* @ngInject */
    function JobsListController(
      $scope,
      $rootScope,
      $state,
      $stateParams,
      AuthService,
      toastr,
      JobService,
      $sce,
      $interval
    ) {


        var vm = this;

        vm.Auth = Auth;

        vm.display = 'myjobs'; // default display mode
        vm.jobs = [];
        vm.getJobs = getJobs;

        vm.getStatusClass = getStatusClass;


        /////////////////////////////////////////////////
        activate();

        function activate() {
          if ($stateParams.display != null) {
            vm.display = $stateParams.display;
          }
          getJobs();

          $scope.$watch( AuthService.currentTeam, function ( currentTeam ) {
            vm.getJobs();
          });
        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////


        function getJobs() {
          var params = {
            display: vm.display,
            team_id: Auth().currentTeam().id,
          }

          JobService.getJobs(params)
          .then(
            function(data) {
            //
            vm.jobs = data.data
            },
            function(data) {
              toastr.error('Error','There was an error loading jobs.');
            }
          );
        }


        function getStatusClass(status) {
          switch (status) {
            case 'PENDINGSETUP':
              return 'label label-inverse';
              break;
              case 'PROCESSING_MEDIA':
                return 'label label-primary';
                break;
                case 'RENDERING':
                  return 'label label-warning';
                  break;
                  case 'COMPLETE':
                    return 'label label-success';
                    break;
                  case 'CANCELLED':
                    return 'label label-white';
                    break;
                    case 'FAILED':
                      return 'label label-danger';
                      break;
            default:
              return 'label label-inverse';
          }
        }

    }
