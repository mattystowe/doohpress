'use strict';

var angular = require('angular');

require('angular-simple-logger'); // requirement for angular-google-maps
require('angular-google-maps');

angular.module('blocks.mapping', [
  'uiGmapgoogle-maps'
]);

require('./config');
require('./locationpicker.directive');
require('./locationdisplay.directive');
