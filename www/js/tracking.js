angular.module('trackingModule', []).
  controller('trackingCtrl', ['$scope', 'isWithinRadius', function($scope, isWithinRadius) {
    $scope.isWithinRadius = function(alertRadius, next, endCoords, startCoords) {
      isWithinRadius(alertRadius, next, endCoords, startCoords);
    };
  }]).
  factory('distance', function() {
    return function(lat1, lon1, lat2, lon2){
      var myPos = new google.maps.LatLng(lat1, lon1);
      var yoPos = new google.maps.LatLng(lat2, lon2);
      var a = google.maps.geometry
                 .spherical
                 .computeDistanceBetween(myPos,yoPos) * 0.00062
      console.log('dist: ', a)
      return a;
    }
  }).
  factory('isWithinRadius', ['distance', function(distance) {
    var usingGeolocation = false;
    return function(alertRadius, endCoords, startCoords, next) {
      console.log(alertRadius,endCoords,startCoords)
      var callback = function(startCoords) {
        if( usingGeolocation ){
          startCoords = startCoords.coords;
        }
        var usersDistanceFromDestination = distance(
          startCoords.latitude, startCoords.longitude,
          endCoords.latitude, endCoords.longitude);

        if( usersDistanceFromDestination <= alertRadius ){
          next(true);
        }
        else {
          next(false);
        }
      };
      if( startCoords ){
        callback(startCoords);
      }
      else {
        // If no start coordinates given, grab the user's current location
        usingGeolocation = true;
        navigator.geolocation.getCurrentPosition(callback);
      }
    }
  }]);
