
'use strict';
var angular = require('angular');

angular
    .module('app.profile')
    .run(appRun);

appRun.$inject = ['routerHelper'];


function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [
      {
          state: 'profile',
          config: {
              url: '/profile',
              templateUrl: '/html/profile/index.html'
          }
      }
    ];
}
