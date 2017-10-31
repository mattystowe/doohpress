'use strict';

var angular = require('angular');

require('../core');

angular.module('app.compositions', [
  'app.core',
  'app.frames',
  'app.jobs'
]);

require('./routes');
require('./compositions.service');
require('./skus.service');
require('./preprocesses.service');
require('./compositions.controller');
require('./compositionsview.controller');
require('./compositionsedit.controller');
