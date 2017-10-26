
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
      },
      {
          state: 'compositions.view',
          config: {
              url: '/view/{composition_id}',
              templateUrl: '/html/compositions/view/index.html'
          }
      },
      {
          state: 'compositions.add',
          config: {
              url: '/add/',
              templateUrl: '/html/compositions/add/index.html'
          }
      },
      {
          state: 'compositions.edit',
          config: {
              url: '/edit/{composition_id}',
              templateUrl: '/html/compositions/edit/index.html'
          }
      }
    ];
}
