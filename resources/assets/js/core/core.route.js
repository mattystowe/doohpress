
'use strict';
var angular = require('angular');

angular
    .module('app.core')
    .run(appRun);


appRun.$inject = ['routerHelper'];


    function appRun(routerHelper) {
        var otherwise = 'home';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: '/html/core/404.html',
                    title: '404'
                }
            }
        ];
    }
