
    'use strict';
    var angular = require('angular');


    angular
        .module('app.jobs')
        .controller('JobsController', JobsController);

    JobsController.$inject = [
      '$scope',
      '$rootScope',
      '$state',
      '$stateParams',
      'AuthService',
      'toastr',
      'JobService',
      '$sce'
    ];

    /* @ngInject */
    function JobsController(
      $scope,
      $rootScope,
      $state,
      $stateParams,
      AuthService,
      toastr,
      JobService,
      $sce
    ) {


        var vm = this;

        vm.Auth = Auth;


        vm.job = {};
        vm.getStageInclude = getStageInclude;
        vm.handleFileUpload = handleFileUpload;

        vm.filestackprocessingurl = 'https://process.filestackapi.com/AVYahdTpfRL2K66BOAfvKz/';
        vm.getResponsiveImageUrl = getResponsiveImageUrl;

        vm.getSafeHTML = getSafeHTML;
        vm.submitValid = submitValid;

        vm.submitJob = submitJob;

        vm.isImage = isImage;
        vm.isVideo = isVideo;
        vm.getResponsiveFileUrl = getResponsiveFileUrl;


        /////////////////////////////////////////////////
        activate();

        function activate() {
          loadJob($stateParams.job_id);
        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////


        /**
         * Returns bool for whether a filename is an image or not for display purposes only.
         *
         *
         *
         * @param  {[type]}  filename [description]
         * @return {Boolean}          [description]
         */
        function isImage(filename) {
          var isImage = false;
          var imageTypes = [
            'png',
            'jpg',
            'jpeg'
          ]
          imageTypes.forEach(function(type) {
            if (filename.includes(type)) { isImage = true; }
          })

          return isImage;
        }


        function isVideo(filename) {
          var isVideo = false;
          var videoTypes = [
            'mov',
            'mp4'
          ]
          videoTypes.forEach(function(type) {
            if (filename.includes(type)) { isVideo = true; }
          })

          return isVideo;
        }



        function getResponsiveFileUrl(url,maxwidth,maxheight) {
          if (url) {
            return vm.filestackprocessingurl + 'resize=width:' + maxwidth + ',height:' + maxheight + ',fit:clip/' + url;
          } else {
            return '';
          }
        }



        function submitJob() {
          JobService.submitJob(vm.job)
          .then(
            function(data) {
            //
            //vm.job = data.data;
            toastr.success('Job Submitted Successfully','Success');
            },
            function(data) {
              if (data.status == 404) {
                $state.go('404');
              } else {
              toastr.error('Error','There was an error submitting your job.');
              }
            }
          );
        }


        function submitValid() {
          var valid = true;
          vm.job.wemockup_sku.product.inputoptions.forEach(function(inputoption) {
            if (!inputoption.value) {
              valid = false;
            }
          });

          if (vm.submitting) {
            valid = false;
          }

          return valid;
        }



        function getSafeHTML(html) {
          var trusted_html = $sce.trustAsHtml(html);
          return trusted_html;
        }

        function handleFileUpload(file, inputoption) {
          inputoption.value = file;
          $scope.$apply();
        }


        function getResponsiveImageUrl(url,maxwidth,maxheight) {

          return vm.filestackprocessingurl + 'resize=width:' + maxwidth + ',height:' + maxheight + ',fit:clip/' + url;

        }



        function loadJob(job_id) {
          JobService.load(job_id)
          .then(
            function(data) {
            //
            vm.job = data.data;
            },
            function(data) {
              if (data.status == 404) {
                $state.go('404');
              } else {
              toastr.error('Error','There was an error loading the job');
              }
            }
          );
        }



        /**
         * Return the include path for the current item stage display
         *
         *
         *
         * @return {[type]} [description]
         */
        function getStageInclude() {
          switch (vm.job.status) {
            case 'PENDINGSETUP':
              return'/html/jobs/view/partials/setup.html';
            case 'QUEUED':
              return'/html/jobs/view/partials/queued.html';
            case 'PROCESSING_MEDIA':
              return'/html/jobs/view/partials/processing_media.html';
            case 'RENDERING':
              return'/html/jobs/view/partials/rendering.html';
            case 'COMPLETE':
              return'/html/jobs/view/partials/complete.html';
              break;
            case 'FAILED':
              return'/html/jobs/view/partials/failed.html';
              break;
            case 'CANCELLED':
              return'/html/jobs/view/partials/cancelled.html';
              break;
            default:
            return '/html/jobs/view/partials/blank.html';

          }
        }




    }
