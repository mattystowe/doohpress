'use strict';

var angular = require('angular');

require('../core');

angular.module('app.compositions', [
  'app.core'
]);

require('./routes');
require('./compositions.service');
require('./compositions.controller');
require('./compositionsview.controller');