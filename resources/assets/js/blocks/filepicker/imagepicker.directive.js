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
        .directive('imagepicker', imagepicker);

    /* @ngInject */
    function imagepicker() {
        var directive = {
            restrict: 'EA',
            templateUrl: '/html/blocks/filepicker/imagepicker.partial.html',
            scope: {
              callback: '&',
              dimx: '=',
              dimy: '=',
              path: '=',
              aspect: '='
            },
            controller: ImagePickerController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    ImagePickerController.$inject = [
        '$scope'
    ];

    /* @ngInject */
    function ImagePickerController($scope) {
        var vm = this;

        vm.openPicker = openPicker;

        ///////////////////////////////////////////////
        activate();



        function activate() {


        }
        /////////////////////////////////////////////


        function openPicker() {
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
            accept: 'image/*',
            maxFiles: 1,
            maxSize: 5 * 1024 * 1024,
            //startUploadingWhenMaxFilesReached: true,
            imageMax:[vm.dimx,vm.dimy],
            imageMin:[vm.dimx,vm.dimy],
            storeTo: {
              location: 's3',
              path: vm.path,
              access: 'public'
            },
            transformations: {
              crop: {
                aspectRatio: vm.aspect,
                force: true
              }
            }
          }).then(function(result) {
            //console.log(result.filesUploaded);
            vm.callback({file: s3prefix + '/' + result.filesUploaded[0].key});
            //addFilesToField(result.filesUploaded);
          });
        }





    }
})();
