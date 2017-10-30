
'use strict';
var angular = require('angular');

angular
    .module('app.jobs')
    .run(appRun);

appRun.$inject = ['routerHelper',];


function appRun(routerHelper) {
    routerHelper.configureDefaults('/jobs','/jobs/myjobs');
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [
      {
          state: 'jobs',
          config: {
              url: '/jobs',
              templateUrl: '/html/jobs/index.html'
          }
      },
      {
          state: 'jobs.view',
          config: {
              url: '/view/{job_id}',
              templateUrl: '/html/jobs/view/index.html'
          }
      }
    ];
}

Redirect_If_Not_SuperAdmin.$inject = ['$state','AuthService'];

/* @ngInject */
function Redirect_If_Not_SuperAdmin($state, AuthService) {
  if (!AuthService.isSuperAdmin()) {
    $state.transitionTo('404');
  }
}
