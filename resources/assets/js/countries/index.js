'use strict';

var angular = require('angular');

require('../core');

angular.module('app.countries', [
  'app.core'
]);

require('./routes');
require('./countries.controller');
require('./countries.service');
require('./cities.service');
