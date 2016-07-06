angular.module('dropzio')
.controller('CompassController', function($state, $scope, $interval, CompassService, $cordovaGeolocation){

  $scope.currentLocation;
  $scope.destination;
  $scope.bearing;
  $scope.destination = false;
  $scope.currentLocation = {
    "compass": {
    }
  };
  $scope.callRes;

  var angleDeg = Math.atan2($scope.destination.long - $scope.currentLocation.long,   $scope.destination.lat - $scope.currentLocation.lat) * 180 / Math.PI;

  $scope.findNearbyPosts = function(){

    var watchOptions = {
      timeout: 15000,
      enableHighAccuracy: false
    };

    $cordovaGeolocation
    .getCurrentPosition(watchOptions)
    .then(function (position) {
      $scope.currentLocation.compass.lat = position.coords.latitude;
      $scope.currentLocation.compass.long = position.coords.longitude;
    })
    .then(function(done){
      CompassService.getNearbyPosts($scope.currentLocation)
      .then(function(res1){
        console.log(res1.data.posts[0].lat);
        $scope.destination.lat = res1.data.posts[0].lat;
        $scope.destination.long = res1.data.posts[0].long
        // angular.element(document.querySelector('#needle')).css('-webkit-transform', 'rotate(45deg)' )
        
      })

    })



  }





  $interval(function(){

    angular.element(document.querySelector('#needle'))

  }, 100);

})
