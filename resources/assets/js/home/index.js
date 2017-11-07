'use strict';

var angular = require('angular');

require('../core');

angular.module('app.home', [
  'app.core',
  'app.compositions',
  'app.jobs'
]);

require('./routes');
require('./home.controller');
