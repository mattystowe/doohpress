
    'use strict';
    var angular = require('angular');


    angular
        .module('app.compositions')
        .controller('FeaturedCompositionsController', FeaturedCompositionsController);

    FeaturedCompositionsController.$inject = [
      '$scope',
      '$state',
      'AuthService',
      'toastr',
      'SweetAlert',
      'CompositionService',
      '$stateParams',
      'JobService'];

    /* @ngInject */
    function FeaturedCompositionsController(
      $scope,
      $state,
      AuthService,
      toastr,
      SweetAlert,
      CompositionService,
      $stateParams,
      JobService) {




        var vm = this;

        vm.Auth = Auth;

        vm.featuredcompositions = [];
        vm.removeComposition = removeComposition;

        vm.dragControlListeners = {
          orderChanged: orderChanged
        }

        vm.openNewAddModal = openNewAddModal;

        vm.newfeaturedcomp = {};
        vm.addFeaturedComposition = addFeaturedComposition;

        vm.compositions;

        /////////////////////////////////////////////////
        activate();

        function activate() {
          loadFeaturedCompositions();
          getCompositions();
        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////


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

        function addFeaturedComposition() {
          var newFeatured = {
            composition_id: vm.newfeaturedcomp.id,
            priority: vm.featuredcompositions.length + 1
          }

          CompositionService.addNewFeaturedComposition(newFeatured)
          .then(function(data) {
            if (data.status == 200) {
              loadFeaturedCompositions();
              toastr.success('Success','Added');
            } else {
              //
              //log error
              toastr.error('Error','There was an error adding featured composition.');
            }
          });
        }



        function openNewAddModal() {
            vm.newfeaturedcomp = {};
            $('#newcompModal').modal('show');
        }




        function removeComposition(composition, index) {
          CompositionService.removeFeaturedComposition(composition)
          .then(
            function(data) {
            //
            toastr.success('Success','Removed');
            vm.featuredcompositions.splice(index,1);
            },
            function(data) {
              toastr.error('Error','Could not remove composition.');
            }
          );
        }

        function orderChanged(event) {

                  var orderValues = [];
                  vm.featuredcompositions.forEach(function(featuredcomp,key){
                    orderValues.push({
                      'featuredcomposition_id': featuredcomp.id,
                      'priority': key
                    });
                    featuredcomp.priority = key;
                  });
                  saveNewOrder(orderValues);

        }

        function saveNewOrder(orderValues) {
          CompositionService.saveFeaturedOrdering(orderValues)
          .then(
            function(data) {
            //
            toastr.success('Success','Order saved');
            },
            function(data) {
              toastr.error('Error','Could not save order.');
            }
          );
        }


        function loadFeaturedCompositions() {
          CompositionService.getFeatured()
          .then(
            function(data) {
            //
            vm.featuredcompositions = data.data;
            },
            function(data) {
              if (data.status == 404) {
                $state.go('404');
              } else {
                toastr.error('Error','There was an error loading featured compositions');
              }
            }
          );
        }


    }
