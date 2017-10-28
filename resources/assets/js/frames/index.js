'use strict';

var angular = require('angular');

require('../core');

angular.module('app.frames', [
  'app.core',
  'app.compositions',
  'app.owners',
  'app.countries'
]);

require('./routes');
require('./frames.controller');
require('./frames.service');
