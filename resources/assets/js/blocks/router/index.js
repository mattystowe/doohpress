"use strict";

var angular = require('angular');
require('angular-ui-router');

angular.module('blocks.router', [
    'ui.router',
]);

require('./router-helper.provider');
