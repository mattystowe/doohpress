
'use strict';
var angular = require('angular');

angular
    .module('app.search')
    .run(appRun);

appRun.$inject = ['routerHelper',];


function appRun(routerHelper) {
    routerHelper.configureDefaults('/search','/search/frames');
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [
      {
          state: 'search',
          config: {
              url: '/search',
              templateUrl: '/html/search/index.html'
          }
      },
      {
          state: 'search.frames',
          config: {
              url: '/frames',
              templateUrl: '/html/search/frames/index.html'
          }
      },
      {
          state: 'search.compositions',
          config: {
              url: '/compositions',
              templateUrl: '/html/search/compositions/index.html'
          }
      }
    ];
}
