(function() {
    'use strict';

    angular
        .module('blocks.example')
        .directive('example', example);

    /* @ngInject */
    function example() {
        var directive = {
            restrict: 'EA',
            templateUrl: '/html/blocks/example/example.partial.html',
            scope: {
              exampletype: '=',
              exampleurl: '=',
              exampletitle: '=',
              showtitle:'='
            },
            controller: ExampleController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    ExampleController.$inject = [
        '$scope','$sce'
    ];

    /* @ngInject */
    function ExampleController($scope,$sce) {
        var vm = this;

        vm.getTrustedUrl = getTrustedUrl;


        ///////////////////////////////////////////////
        activate();



        function activate() {
          vm.trustedSourceUrl = $sce.trustAsResourceUrl(vm.exampleurl);

        }
        /////////////////////////////////////////////

        function getTrustedUrl() {
          var url = $sce.trustAsResourceUrl(vm.exampleurl);
          return url;

        }

    }
})();
