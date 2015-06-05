// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('WeatherService', function($http, $q){
      var service = {};
      service.getCurrentWeather = function (zipCode) {
        var def = $q.defer();
        $http.get('http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&units=imperial')
            .success(function (response) {
              def.resolve(response);
            })
            .error(function (response) {
              def.reject(response);
              console.log(response);
            });
        return def.promise;
      };
      return service;

    })
.controller('WeatherAppController', function($scope, WeatherService){
      $scope.getWeather = function(zipCode){
        WeatherService.getCurrentWeather(zipCode).then(function(data){
          $scope.weatherData = data;
        })
      }


    })