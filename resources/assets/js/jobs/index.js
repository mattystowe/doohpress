'use strict';

var angular = require('angular');

require('../core');

angular.module('app.jobs', [
  'app.core'
]);


require('./jobs.service');
require('./jobs.controller');
require('./jobslist.controller');
require('./routes');
