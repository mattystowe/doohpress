
    'use strict';
    var angular = require('angular');


    angular
        .module('app.compositions')
        .controller('CompositionsEditController', CompositionsEditController);

    CompositionsEditController.$inject = ['$scope','$state','AuthService','toastr','SweetAlert','CompositionService','SkuService','WemockupService','FrameService','TagService','$stateParams'];

    /* @ngInject */
    function CompositionsEditController($scope, $state, AuthService,toastr,SweetAlert,CompositionService,SkuService,WemockupService,FrameService,TagService,$stateParams) {
        var vm = this;

        vm.Auth = Auth;

        vm.composition = {};
        vm.outputtypes = [];
        vm.compositioncategories = [];
        vm.skutypes = [];

        vm.isCompositionValid = isCompositionValid;
        vm.saveComposition = saveComposition;

        vm.removeSkuFromComposition = removeSkuFromComposition;
        vm.addSkuToComposition = addSkuToComposition;

        vm.changeSkuType = changeSkuType;

        vm.searchProducts = searchProducts;
        vm.openSelectAProduct = openSelectAProduct;
        vm.productsearch = '';
        vm.product_search_results = [];
        vm.selectProduct = selectProduct;



        vm.openSelectAFrame = openSelectAFrame;
        vm.addFrameToComposition = addFrameToComposition;

        vm.searchFrames = searchFrames;
        vm.framesearch = '';
        vm.frame_search_results = [];

        vm.removeFrame = removeFrame;

        vm.searchTags = searchTags;
        vm.tagAdded = tagAdded;
        vm.tagRemoved = tagRemoved;


        vm.removeExample = removeExample;
        vm.example = {};
        vm.openNewExample = openNewExample;
        vm.addExample = addExample;

        vm.dragControlListeners = {
          orderChanged: SkuOrderChanged
        }

        /////////////////////////////////////////////////
        activate();

        function activate() {
          loadComposition($stateParams.composition_id);
          getOutputTypes();
          getCompositionCategories();
          getSkuTypes();
        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////


        function SkuOrderChanged(event) {

                  var orderValues = [];
                  vm.composition.skus.forEach(function(sku,key){
                    orderValues.push({
                      'sku_id': sku.id,
                      'priority': key
                    });
                    sku.priority = key;
                  });
                  saveNewSkuOrder(orderValues);

        }

        function saveNewSkuOrder(orderValues) {
          SkuService.saveOrdering(orderValues)
          .then(
            function(data) {
            //
            toastr.success('Success','Sku order saved');
            },
            function(data) {
              toastr.error('Error','Could not save sku order.');
            }
          );
        }


        function removeExample(example,index) {
          CompositionService.removeExample(example)
          .then(
            function(data) {
            //
            toastr.success('Success','Example removed');
            vm.composition.examples.splice(index,1);
            },
            function(data) {
              toastr.error('Error','Could not remove example.');
            }
          );
        }


        function openNewExample() {
          //reset the new example.
          vm.example = {
            title: null,
            url: null,
            exampletype: 'Video_Vimeo'
          }
          $('#newExampleModal').modal('show');
        }

        function addExample() {
          $('#newExampleModal').modal('hide');
          CompositionService.addExample(vm.example,vm.composition)
          .then(
            function(data) {
            //
            toastr.success('Success','Example added');
            vm.composition.examples.push(data.data);
            },
            function(data) {
              toastr.error('Error','Could not add example.');
            }
          );
        }




        function searchTags(query) {
          return TagService.search(query);
        }


        function tagAdded(tag) {
          TagService.addTagToComposition(tag, vm.composition)
          .then(
            function(data) {
            //
            //saved - send user somewhere
            toastr.success('Success','Tag added');
            },
            function(data) {
              toastr.error('Error','Could not save tag to composition.');
            }
          );
        }


        function tagRemoved(tag) {
          TagService.removeTagFromComposition(tag, vm.composition)
          .then(
            function(data) {
            //
            //saved - send user somewhere
            toastr.success('Success','Tag removed');
            },
            function(data) {
              toastr.error('Error','Could not remove tag to composition.');
            }
          );
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

            FrameService.addFrameToComposition(vm.composition, frame)
            .then(
              function(data) {
              //
              //saved - send user somewhere
              toastr.success('Success','Saved!');
              vm.composition.frames.push(frame);

              },
              function(data) {
                toastr.error('Error','There was an error adding frame.');
              }
            );



          }
        }



        function removeFrame(frame, index) {
          FrameService.removeFrameFromComposition(vm.composition, frame)
          .then(
            function(data) {
            //
            //saved - send user somewhere
            toastr.success('Success','Saved!');
            vm.composition.frames.splice(index,1);

            },
            function(data) {
              toastr.error('Error','There was an error removing frame.');
            }
          );


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





        //Update the product associated with this composition
        //
        //
        function selectProduct(product) {
          CompositionService.updateProduct(vm.composition, product)
          .then(
            function(data) {
            //
            //saved - send user somewhere
            toastr.success('Success','Saved!');
            loadComposition($stateParams.composition_id);
            $('#selectProductModal').modal('hide');
            },
            function(data) {
              toastr.error('Error','There was an error updating your product.');
            }
          );


        }




        function changeSkuType(sku) {
          SkuService.updateSkuType(sku)
          .then(
            function(data) {
            //
            //saved - send user somewhere
            toastr.success('Success','Sku saved!');

            },
            function(data) {
              toastr.error('Error','There was an error updating the sku');
            }
          );
        }


        function removeSkuFromComposition(sku, index) {
          SkuService.removeSku(sku)
          .then(
            function(data) {
            //
            //saved - send user somewhere
            toastr.success('Success','Sku removed!');

            //remove from added list
            vm.composition.skus.splice(index,1);
            loadComposition($stateParams.composition_id);
            },
            function(data) {
              toastr.error('Error','There was an error removing the sku');
            }
          );
        }



        function addSkuToComposition(sku,index) {

              var newSku = {
                composition_id: vm.composition.id,
                wemockup_sku: sku.id,
                skutype_id: sku.skutype.id,
                priority: vm.composition.skus.length+1
              }


            if (!skuAlreadyAdded(newSku)) {
              SkuService.addSku(newSku)
              .then(
                function(data) {
                //
                //saved - send user somewhere
                toastr.success('Success','Sku added!');
                loadComposition($stateParams.composition_id);
                },
                function(data) {
                  toastr.error('Error','There was an error adding the sku');
                }
              );
            } else {
              toastr.error('Error','Sku already added');
            }
        }


        function skuAlreadyAdded(sku) {

          var is_added = false;
          vm.composition.skus.forEach(function(comp_sku) {
            if (comp_sku.wemockup_sku == sku.wemockup_sku) {
              is_added = true;
            }
          })
          return is_added;
        }



        //process saving of the composition
        //
        //
        //
        function saveComposition() {
          CompositionService.updateComposition(vm.composition)
          .then(
            function(data) {
            //
            //saved - send user somewhere
            toastr.success('Success','Saved!');
            },
            function(data) {
              toastr.error('Error','There was an error saving your composition');
            }
          );
        }



        function isCompositionValid() {
          var valid = true;

          return valid;
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

        function getSkuTypes() {
          SkuService.getAllTypes()
          .then(function(data) {
            if (data.status == 200) {

              vm.skutypes = data.data
            } else {
              //
              //log error
              toastr.error('Error','There was an error loading sku types');
            }
          });
        }



        //Load the composition id
        //
        //
        //
        function loadComposition(composition_id) {
          CompositionService.load(composition_id)
          .then(
            function(data) {
            //
            //saved - send user somewhere
            vm.composition = data.data;

            },
            function(data) {
              toastr.error('Error','There was an error loading composition.');
            }
          );
        }


    }
