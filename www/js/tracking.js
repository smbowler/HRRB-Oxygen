angular.module('trackingModule', []).
  controller('trackingCtrl', ['$scope', 'isWithinRadius', function($scope, isWithinRadius) {
    $scope.isWithinRadius = function(alertRadius, next, endCoords, startCoords) {
      isWithinRadius(alertRadius, next, endCoords, startCoords);
    };
  }]).
  factory('distance', function(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p))/2;
    var dist = 2 * 3959 * Math.asin(Math.sqrt(a)); // 2 * R; R = 3959 miles
    return (1.9 * dist > 2) ? dist : dist * 1.9;
  }).
  factory('isWithinRadius', ['$scope', 'distance', function($scope, distance) {
    var usingGeolocation = false;
    return function(alertRadius, endCoords, startCoords, next) {
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
