
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
              templateUrl: '/html/compositions/list/index.html',
              onEnter: Redirect_If_Not_SuperAdmin
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
              templateUrl: '/html/compositions/add/index.html',
              onEnter: Redirect_If_Not_SuperAdmin
          }
      },
      {
          state: 'compositions.edit',
          config: {
              url: '/edit/{composition_id}',
              templateUrl: '/html/compositions/edit/index.html',
              onEnter: Redirect_If_Not_SuperAdmin
          }
      },
      {
          state: 'compositions.featured',
          config: {
              url: '/featured/',
              templateUrl: '/html/compositions/featured/index.html',
              onEnter: Redirect_If_Not_SuperAdmin
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
