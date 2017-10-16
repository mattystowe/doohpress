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


//Toastr config
//
//
core.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: 'toast-container',
    maxOpened: 0,
    newestOnTop: true,
    positionClass: 'toast-top-right', //toast-top-full-width
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body',
    timeOut: 4000,
  });
});
