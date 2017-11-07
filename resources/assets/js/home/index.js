'use strict';

var angular = require('angular');

require('../core');

angular.module('app.home', [
  'app.core',
  'app.compositions'
]);

require('./routes');
require('./home.controller');
