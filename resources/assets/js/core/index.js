"use strict";

var angular = require('angular');


require('../blocks/router');
require('../blocks/auth');
require('../blocks/filepicker');
require('../blocks/wemockup');
require('../blocks/example');
require('angular-animate');
require('angular-loading-bar');
require('angular-toastr');
require('sweetalert');
require('angular-sweetalert');
require('ng-tags-input');
require('ng-sortable');


angular.module('app.core', [
    'ngAnimate',
    'blocks.router',
    'blocks.auth',
    'blocks.filepicker',
    'blocks.wemockup',
    'blocks.example',
    'ui.router',
    'angular-loading-bar',
    'toastr',
    'oitozero.ngSweetAlert',
    'ngTagsInput',
    'as.sortable'
]);


require('./config');
require('./constants');
require('./core.route');
require('./filters');
require('./tags.service');
