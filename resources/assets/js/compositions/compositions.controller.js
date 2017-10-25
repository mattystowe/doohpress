
    'use strict';
    var angular = require('angular');


    angular
        .module('app.compositions')
        .controller('CompositionsController', CompositionsController);

    CompositionsController.$inject = ['$scope','$state','AuthService','toastr','SweetAlert','CompositionService','FrameService','WemockupService'];

    /* @ngInject */
    function CompositionsController($scope, $state, AuthService,toastr,SweetAlert,CompositionService,FrameService,WemockupService) {
        var vm = this;

        vm.Auth = Auth;

        vm.compositions = [];
        vm.outputtypes = [];
        vm.compositioncategories = [];

        vm.composition = {
          name: null,
          description: null,
          frames: [],
          outputtype: {},
          compositioncategory: {},
          thumbnail: null,
          image: null,
          example: null,
          published: 'true',
          wemockup_product: null
        }; // placeholder for new comp


        vm.openSelectAFrame = openSelectAFrame;
        vm.addFrameToComposition = addFrameToComposition;

        vm.searchFrames = searchFrames;
        vm.framesearch = '';
        vm.frame_search_results = [];

        vm.removeFrame = removeFrame;

        vm.handleThumbnail = handleThumbnail;
        vm.handleImage = handleImage;

        vm.searchProducts = searchProducts;
        vm.openSelectAProduct = openSelectAProduct;
        vm.productsearch = '';
        vm.product_search_results = [];
        vm.selectProduct = selectProduct;


        /////////////////////////////////////////////////
        activate();

        function activate() {

          getCompositions();
          getOutputTypes();
          getCompositionCategories();
        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////

        function openSelectAProduct() {
          vm.productsearch = '';
          vm.product_search_results = [];
          $('#selectProductModal').modal('show');
        }

        function searchProducts(query) {
          if (query != null) {
            if (query.length > 2) {
              WemockupService.search(query)
              .then(function(data) {
                if (data.status == 200) {

                  vm.product_search_results = data.data;
                } else {
                  //
                  //log error
                  toastr.error('Error','There was an error loading products');
                }
              });
            }
          }
        }

        function selectProduct(product) {
          vm.composition.wemockup_product = product;
          $('#selectProductModal').modal('hide');
        }




        function handleThumbnail(file) {
          vm.composition.thumbnail = file;
          $scope.$apply();
        }

        function handleImage(file) {
          vm.composition.image = file;
          $scope.$apply();
        }


        //open the select a frame modal
        function openSelectAFrame() {
          vm.framesearch = '';
          vm.frame_search_results = [];
          $('#selectFrameModal').modal('show');
        }

        //handle adding a frame to the composition
        function addFrameToComposition(frame) {
          $('#selectFrameModal').modal('hide');
          //add frame to composition if not already there
          var exists = false;
          vm.composition.frames.forEach(function(existing_frame) {
            if (existing_frame.id == frame.id) {
              exists = true;
            }
          });
          if (exists != true) {
            vm.composition.frames.push(frame);
          }
        }

        function removeFrame(index) {
          vm.composition.frames.splice(index,1);
        }


        function searchFrames(query) {
          if (query != null) {
            if (query.length > 2) {
              FrameService.search(query)
              .then(function(data) {
                if (data.status == 200) {

                  vm.frame_search_results = data.data;
                } else {
                  //
                  //log error
                  toastr.error('Error','There was an error loading frames');
                }
              });
            }
          }
        }



        function getCompositions() {
          CompositionService.getAll()
          .then(function(data) {
            if (data.status == 200) {
              vm.compositions = data.data;

            } else {
              //
              //log error
              toastr.error('Error','There was an error getting compositions.');
            }
          });
        }

        function getOutputTypes() {
          CompositionService.getOutputTypes()
          .then(function(data) {
            if (data.status == 200) {
              vm.outputtypes = data.data;

            } else {
              //
              //log error
              toastr.error('Error','There was an error getting compositions.');
            }
          });
        }

        function getCompositionCategories() {
          CompositionService.getCompositionCategories()
          .then(function(data) {
            if (data.status == 200) {

              vm.compositioncategories = data.data;
            } else {
              //
              //log error
              toastr.error('Error','There was an error getting compositions.');
            }
          });
        }


    }
