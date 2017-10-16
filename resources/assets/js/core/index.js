"use strict";

var angular = require('angular');



require('../blocks/router');
require('angular-loading-bar');

angular.module('app.core', [
    'blocks.router',
    'ui.router',
    'angular-loading-bar'
]);


require('./config');
require('./constants');
require('./core.route');
