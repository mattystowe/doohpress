
'use strict';
var angular = require('angular');

angular
    .module('app.owners')
    .run(appRun);

appRun.$inject = ['routerHelper',];


function appRun(routerHelper) {
    routerHelper.configureDefaults('/owners','/owners/list');
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [
      {
          state: 'owners',
          config: {
              url: '/owners',
              templateUrl: '/html/owners/index.html'
          }
      },
      {
          state: 'owners.list',
          config: {
              url: '/list',
              templateUrl: '/html/owners/list/index.html',
              onEnter: Redirect_If_Not_SuperAdmin
          }
      },
      {
          state: 'owners.add',
          config: {
              url: '/add',
              templateUrl: '/html/owners/add/index.html',
              onEnter: Redirect_If_Not_SuperAdmin
          }
      },
      {
          state: 'owners.edit',
          config: {
              url: '/edit/{owner_id}',
              templateUrl: '/html/owners/edit/index.html',
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
