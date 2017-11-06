(function() {
    'use strict';
    //
    //
    //CONFIG FILESTACK AND STORAGE
    //
    //
    var filestack = require('filestack-js').default;
    var client = filestack.init('AVYahdTpfRL2K66BOAfvKz');
    var s3prefix = 'https://s3-eu-west-1.amazonaws.com/doohpressstorage';
    //
    //
    //
    //
    //
    //
    angular
        .module('blocks.filepicker')
        .directive('filepicker', filepicker);

    /* @ngInject */
    function filepicker() {
        var directive = {
            restrict: 'EA',
            templateUrl: '/html/blocks/filepicker/filepicker.partial.html',
            scope: {
              callback: '&',
              path: '='
            },
            controller: FilePickerController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    FilePickerController.$inject = [
        '$scope'
    ];

    /* @ngInject */
    function FilePickerController($scope) {
        var vm = this;

        vm.openPicker = openPicker;

        ///////////////////////////////////////////////
        activate();



        function activate() {


        }
        /////////////////////////////////////////////


        function openPicker() {
          var aspectRatio = Number(eval(vm.aspect));
          console.log('opening picker');
          client.pick({
            fromSources: [
              'local_file_system',
              'facebook',
              'googledrive',
              'imagesearch',
              'dropbox',
              'webcam'
            ],
            maxFiles: 1,
            maxSize: 5 * 1024 * 1024,
            storeTo: {
              location: 's3',
              path: vm.path,
              access: 'public'
            }
          }).then(function(result) {
            //console.log(result.filesUploaded);
            vm.callback({file: s3prefix + '/' + result.filesUploaded[0].key});
            //addFilesToField(result.filesUploaded);
          });
        }





    }
})();
