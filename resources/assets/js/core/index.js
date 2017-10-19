"use strict";

var angular = require('angular');


require('../blocks/router');
require('../blocks/auth');
require('../blocks/filepicker');
require('angular-animate');
require('angular-loading-bar');
require('angular-toastr');
require('sweetalert');
require('angular-sweetalert');


angular.module('app.core', [
    'ngAnimate',
    'blocks.router',
    'blocks.auth',
    'blocks.filepicker',
    'ui.router',
    'angular-loading-bar',
    'toastr',
    'oitozero.ngSweetAlert'
]);


require('./config');
require('./constants');
require('./core.route');
require('./filters');
