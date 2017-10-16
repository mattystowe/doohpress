"use strict";

var angular = require('angular');

var core = angular.module('app.core');


var config = {
    appErrorPrefix: '[MyProject Error] ',
    appTitle: 'MyProject'
};

core.value('config', config);

/**
 * Configure loading spinner
 *
 * @param  {[type]} loadingSpinnerConfig [description]
 * @return {[type]}                      [description]
 */
core.config(loadingSpinnerConfig);

loadingSpinnerConfig.$inject = ['cfpLoadingBarProvider'];

function loadingSpinnerConfig(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.latencyThreshold = 0; // set to 50 on production
}
