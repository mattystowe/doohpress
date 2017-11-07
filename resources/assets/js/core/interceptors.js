"use strict";

var angular = require('angular');
var core = angular.module('app.core');

core.factory('redirectInterceptor', function($q,$location,$window){
return  {
    'responseError':function(response){
      if (response.status == 401) {
        $window.location.href = "/logout"; // send user back to login screen to relogin
        return $q.reject(response);
      }
      //
      //Catch other global http response codes here 
      //
      //
    }
}

});

core.config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push('redirectInterceptor');
}]);
