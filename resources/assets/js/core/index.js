"use strict";

var angular = require('angular');



require('../blocks/router');


angular.module('app.core', [
    'blocks.router',
    'ui.router'
]);


require('./config');
require('./constants');
require('./core.route');
