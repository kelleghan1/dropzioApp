angular.module('dropzio')
.controller('CompassController', function($state, $scope, $interval, CompassService, $cordovaGeolocation, $cordovaDeviceOrientation){

  $scope.currentLocation;
  $scope.destination = {};
  $scope.bearing;
  // $scope.testing = $cordovaDeviceOrientation.getCurrentHeading();
  $scope.currentLocation = {
    "compass": {
    }
  };

  var watchOptions = {
    timeout: 1000,
    enableHighAccuracy: false
  };

  $cordovaGeolocation
  .getCurrentPosition(watchOptions)
  .then(function (position) {
    $scope.currentLocation.compass.lat = position.coords.latitude;
    $scope.currentLocation.compass.long = position.coords.longitude;
  })
  .then(function(done){

    $scope.findNearbyPosts = function(){

      CompassService.getNearbyPosts($scope.currentLocation)
      .then(function(res1){
        console.log(res1.data.posts[0].lat);
        console.log(res1.data.posts[0].long);

        $scope.destination.lat = res1.data.posts[0].lat;
        $scope.destination.long = res1.data.posts[0].long;
      })

    }
  })


  $interval(function(){

    $cordovaDeviceOrientation.getCurrentHeading()
    .then(function(orientResult){
      if ($scope.angleDeg ) {

      }
      $scope.bearing = orientResult.magneticHeading

    })

    var watchOptions = {
      timeout: 1000,
      enableHighAccuracy: false
    };

    $cordovaGeolocation
    .getCurrentPosition(watchOptions)
    .then(function (position) {
      $scope.currentLocation.compass.lat = position.coords.latitude;
      $scope.currentLocation.compass.long = position.coords.longitude;
    })


    $scope.angleDeg = Math.atan2($scope.destination.lat - $scope.currentLocation.compass.lat, $scope.destination.long - $scope.currentLocation.compass.long) * 180 / Math.PI
    // console.log(orientation);
    angular.element(document.querySelector('#needle')).css('-webkit-transform', 'rotate(' + $scope.testing + 'deg)' )


  }, 1000);



})
