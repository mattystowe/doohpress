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
        .directive('profilepicker', profilepicker);

    /* @ngInject */
    function profilepicker() {
        var directive = {
            restrict: 'EA',
            templateUrl: '/html/blocks/filepicker/profilepicker.partial.html',
            scope: {
              callback: '&',
            },
            controller: ProfilePickerController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    ProfilePickerController.$inject = [
        '$scope'
    ];

    /* @ngInject */
    function ProfilePickerController($scope) {
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
            maxSize: 1 * 1024 * 1024,
            //startUploadingWhenMaxFilesReached: true,
            imageDim:[200,200],
            storeTo: {
              location: 's3',
              path: '/profilepics/',
              access: 'public'
            },
            transformations: {
              crop: {
                aspectRatio: 200/200,
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
