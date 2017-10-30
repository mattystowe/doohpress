
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
              templateUrl: '/html/countries/index.html',
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
