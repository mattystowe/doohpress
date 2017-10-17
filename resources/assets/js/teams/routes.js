
'use strict';
var angular = require('angular');

angular
    .module('app.teams')
    .run(appRun);

appRun.$inject = ['routerHelper'];


function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [
      {
          state: 'teams',
          config: {
              url: '/teams',
              templateUrl: '/html/teams/index.html'
          }
      }
    ];
}
