'use strict';

var angular = require('angular');

require('../core');

angular.module('app.search', [
  'app.core',
  'app.compositions',
  'app.frames'
]);

require('./searchframes.controller');
require('./searchcompositions.controller');
require('./routes');
