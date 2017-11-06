(function() {
    'use strict';

    angular
        .module('blocks.mapping')
        .directive('locationdisplay', locationdisplay);

    /* @ngInject */
    function locationdisplay() {
        var directive = {
            restrict: 'EA',
            templateUrl: '/html/blocks/mapping/locationdisplay.partial.html',
            scope: {
              marker: '='
            },
            controller: LocationDisplayController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    LocationDisplayController.$inject = [
        '$scope',
        'uiGmapGoogleMapApi'
    ];

    /* @ngInject */
    function LocationDisplayController($scope,uiGmapGoogleMapApi) {
        var vm = this;



        vm.marker = {
          latitude:51.50104924156018, //default london
          longitude:-0.12441158294677734
        };

        vm.map = {
          zoom: 14,
          center: {
            latitude:51.50104924156018, //default london
            longitude:-0.12441158294677734
          },
          options: {
            scrollwheel: false
          }
        };


        ///////////////////////////////////////////////


        uiGmapGoogleMapApi.then(function(maps) {
          activate();
        });

        function activate() {
          if (vm.marker.latitude != null) {
            vm.map.center.latitude = vm.marker.latitude;
            vm.map.center.longitude = vm.marker.longitude;
          }


        }
        /////////////////////////////////////////////


    }
})();
