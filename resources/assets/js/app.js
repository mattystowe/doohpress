'use strict';

//jquery expects global window access
window.$ = window.jQuery = require('jquery')
//require('bootstrap');
//Angular app
var angular = require('angular');

require('./core');
require('./layout');
require('./home');
require('./profile');

angular.module('app', [
  'app.core',
  'app.layout',
  'app.home',
  'app.profile'
]);
