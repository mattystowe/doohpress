
'use strict';
var angular = require('angular');

angular
    .module('app.frames')
    .run(appRun);

appRun.$inject = ['routerHelper',];


function appRun(routerHelper) {
    routerHelper.configureDefaults('/frames','/frames/list');
    routerHelper.configureStates(getStates());
}

function getStates() {
    return [
      {
          state: 'frames',
          config: {
              url: '/frames',
              templateUrl: '/html/frames/index.html'
          }
      },
      {
          state: 'frames.list',
          config: {
              url: '/list',
              templateUrl: '/html/frames/list/index.html',
              onEnter: Redirect_If_Not_SuperAdmin
          }
      },
      {
          state: 'frames.add',
          config: {
              url: '/add/',
              templateUrl: '/html/frames/add/index.html',
              onEnter: Redirect_If_Not_SuperAdmin
          }
      },
      {
          state: 'frames.edit',
          config: {
              url: '/edit/{frame_id}',
              templateUrl: '/html/frames/edit/index.html',
              onEnter: Redirect_If_Not_SuperAdmin
          }
      },
      {
          state: 'frames.view',
          config: {
              url: '/view/{frame_id}',
              templateUrl: '/html/frames/view/index.html'
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
