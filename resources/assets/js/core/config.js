"use strict";

var angular = require('angular');

var core = angular.module('app.core');


var config = {
    appErrorPrefix: '[MyProject Error] ',
    appTitle: 'MyProject'
};

core.value('config', config);
