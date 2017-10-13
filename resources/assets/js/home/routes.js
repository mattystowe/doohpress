
'use strict';
var angular = require('angular');

angular
    .module('app.home')
    .run(appRun);

appRun.$inject = ['routerHelper'];


function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [
      {
          state: 'home',
          config: {
              url: '/home',
              templateUrl: '/html/home/index.html'
          }
      }
    ];
}
