
'use strict';
var angular = require('angular');

angular
    .module('app.countries')
    .run(appRun);

appRun.$inject = ['routerHelper'];


function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [
      {
          state: 'countries',
          config: {
              url: '/countries',
              templateUrl: '/html/countries/index.html'
          }
      }
    ];
}
