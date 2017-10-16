"use strict";

var angular = require('angular');



require('../blocks/router');
require('angular-animate');
require('angular-loading-bar');
require('angular-toastr');

angular.module('app.core', [
    'ngAnimate',
    'blocks.router',
    'ui.router',
    'angular-loading-bar',
    'toastr'
]);


require('./config');
require('./constants');
require('./core.route');
