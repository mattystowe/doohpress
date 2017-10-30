'use strict';

var angular = require('angular');

require('../core');

angular.module('app.owners', [
  'app.core'
]);

require('./routes');
require('./owners.service');
require('./owners.controller');
