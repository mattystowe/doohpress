'use strict';

var angular = require('angular');

require('../core');

angular.module('app.teams', [
  'app.core'
]);

require('./routes');
require('./teams.controller');
require('./teams.service');
