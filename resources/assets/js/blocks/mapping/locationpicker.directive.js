(function() {
    'use strict';

    angular
        .module('blocks.mapping')
        .directive('locationpicker', locationpicker);

    /* @ngInject */
    function locationpicker() {
        var directive = {
            restrict: 'EA',
            templateUrl: '/html/blocks/mapping/locationpicker.partial.html',
            scope: {
              marker: '=',
              center: '='
            },
            controller: LocationPickerController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    LocationPickerController.$inject = [
        '$scope',
        'uiGmapGoogleMapApi'
    ];

    /* @ngInject */
    function LocationPickerController($scope,uiGmapGoogleMapApi) {
        var vm = this;




        vm.map = {
          zoom: 14,
          center: {
            latitude:51.50104924156018, //default london
            longitude:-0.12441158294677734
          },
          options: {
            scrollwheel: false
          },
          events: {
              click: onClick
          }
        };


        ///////////////////////////////////////////////


        uiGmapGoogleMapApi.then(function(maps) {
          activate();
        });

        function activate() {
          vm.map.center.latitude = vm.center.latitude;
          vm.map.center.longitude = vm.center.longitude;
        }
        /////////////////////////////////////////////


        function onClick(mapModel, eventName, originalEventArgs) {
          //alert("user defined event: " + eventName, mapModel, originalEventArgs);
          //console.log(mapModel);
          var e = originalEventArgs[0];
          var coords =  {
            latitude: e.latLng.lat(),
            longitude: e.latLng.lng()
          }
          console.log(coords);
          vm.marker.latitude = coords.latitude;
          vm.marker.longitude = coords.longitude;
          //vm.onpicked({coords: coords});
          $scope.$apply();
        }

    }
})();
