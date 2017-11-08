"use strict";

var angular = require('angular');

var mapping = angular.module('blocks.mapping');

mapping.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDN2iXYoQw-tXbnrCjPoz1lmV3oEY8j-Yw',
        //v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})
