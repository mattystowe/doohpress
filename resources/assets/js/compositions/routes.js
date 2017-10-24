
'use strict';
var angular = require('angular');

angular
    .module('app.compositions')
    .run(appRun);

appRun.$inject = ['routerHelper'];


function appRun(routerHelper) {
    routerHelper.configureDefaults('/compositions','/compositions/list');
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [
      {
          state: 'compositions',
          config: {
              url: '/compositions',
              templateUrl: '/html/compositions/index.html'
          }
      },
      {
          state: 'compositions.list',
          config: {
              url: '/list',
              templateUrl: '/html/compositions/list/index.html'
          }
      }
    ];
}
