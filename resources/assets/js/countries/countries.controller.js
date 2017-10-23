
    'use strict';
    var angular = require('angular');


    angular
        .module('app.countries')
        .controller('CountriesController', CountriesController);

    CountriesController.$inject = ['$scope','$state','AuthService','CountryService','CityService','toastr','SweetAlert'];

    /* @ngInject */
    function CountriesController($scope, $state, AuthService,CountryService, CityService,toastr,SweetAlert) {
        var vm = this;

        vm.Auth = Auth;

        vm.countries = [];
        vm.cities = [];

        vm.selectedCountry = {};

        vm.selectCountry = selectCountry;

        vm.newCity = {
          name: null
        };

        vm.addNewCity = addNewCity;
        vm.isNewCityValid = isNewCityValid;
        vm.confirmRemoveCity = confirmRemoveCity;


        vm.newCountry = {
          name: null,
          country_code: null
        };

        vm.addNewCountry = addNewCountry;
        vm.isNewCountryValid = isNewCountryValid;
        vm.confirmRemoveCountry = confirmRemoveCountry;



        /////////////////////////////////////////////////
        activate();

        function activate() {
          getCountries();

        }

        function Auth() {
          return AuthService;
        }
        /////////////////////////////////////////////////


        function getCountries() {
          CountryService.getAll()
          .then(function(data) {
            if (data.status == 200) {

              vm.countries = data.data;
            } else {
              //
              //log error
              toastr.error('Error','There was an error getting countries.');
            }
          });
        }

        function getCities(country) {
          CityService.getAllInCountry(country)
          .then(function(data) {
            if (data.status == 200) {

              vm.cities = data.data;
            } else {
              //
              //log error
              toastr.error('Error','There was an error getting cities.');
            }
          });
        }



        function selectCountry(country) {
          vm.selectedCountry = country;
          getCities(country);
        }


        function addNewCity() {
          CityService.addNew(vm.newCity, vm.selectedCountry)
          .then(function(data) {
            if (data.status == 200) {
              //vm.cities.push(data.data);
              getCities(vm.selectedCountry);
              toastr.success('Success','City saved.');
              vm.newCity.name = null;
            } else {
              //
              //log error
              toastr.error('Error','There was an error saving city.');
            }
          });
        }

        function addNewCountry() {
          CountryService.addNew(vm.newCountry)
          .then(function(data) {
            if (data.status == 200) {
              //vm.cities.push(data.data);
              getCountries();
              toastr.success('Success','Country saved.');
            } else {
              //
              //log error
              toastr.error('Error','There was an error saving city.');
            }
          });
        }

        function isNewCityValid() {
          var valid = true;
          if (vm.newCity.name == null) { valid = false; }

          return valid;
        }

        function isNewCountryValid() {
          var valid = true;
          if (vm.newCountry.name == null) { valid = false; }
          if (vm.newCountry.country_code == null) { valid = false; }


          return valid;
        }


        function confirmRemoveCity(city,index) {
          SweetAlert.swal({
             title: 'Are you sure?',
             text: '',
             type: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#DD6B55',confirmButtonText: 'Yes, Lets Go!',
             cancelButtonText: 'No, cancel!',
             closeOnConfirm: true,
             closeOnCancel: true },
          function(isConfirm){
             if (isConfirm) {
               removeCity(city,index);
             }
          });
        }

        function confirmRemoveCountry(country,index) {
          SweetAlert.swal({
             title: 'Are you sure?',
             text: '',
             type: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#DD6B55',confirmButtonText: 'Yes, Lets Go!',
             cancelButtonText: 'No, cancel!',
             closeOnConfirm: true,
             closeOnCancel: true },
          function(isConfirm){
             if (isConfirm) {
               removeCountry(country,index);
             }
          });
        }


        function removeCity(city,index) {
          CityService.removeCity(city)
          .then(function(data) {
            if (data.status == 200) {
              toastr.success('Success','City remobved.');
              //remove from the list
              vm.cities.splice(index,1);
            } else {
              //
              //log error
              toastr.error('Error','There was an error removing city.');
            }
          });
        }

        function removeCountry(country,index) {
          CountryService.removeCountry(country)
          .then(function(data) {
            if (data.status == 200) {
              toastr.success('Success','Country remobved.');
              //remove from the list
              vm.countries.splice(index,1);
            } else {
              //
              //log error
              toastr.error('Error','There was an error removing city.');
            }
          });
        }





    }
