/*
** Schema **

{ 
  'routes': { 
    'username': {
      'randomlyGeneratedId': {
        'name': 'Home to School',
        'start': {
          'long': 57.123,
          'lat':  35.127
        },
        'end': {
          'long': 71.352,
          'lat':  39.261
        }
      },
      'anotherRandomlyGeneratedId': {
        'name': 'Home to Work',
        'start': {
          'long': 77.125,
          'lat':  12.121
        },
        'end': {
          'long': 91.342,
          'lat':  13.231
        }
      }
    },
    'anotherUsername': {
      ...
    },
    'yetAnotherUsername': {
      ...
    }
  }
}

Random id numbers are generated for each route when using the saveRoute() method

*/

// TODO: Replace url with actual database url
var db = new Firebase('FILL_IN_URL_TO_DATABASE');
var routes = db.child('routes');

// TODO: Verify this method is functioning as expected
// Start and end arguments should be objects with .long and .lat properties
var saveRoute = function(user, routeName, start, end) {
  routes.child(user).push({
    'name': routeName,
    'start': start,
    'end': end
  });
};

// TODO: Debug?
var getRoutes = function(user) {
  var routes = [];
  routes.child(user).on('value', function(route) {
    routes.push(route);
  });
  return routes;
};

// TODO: Debug?
var getSpecificRoute = function(user, routeName) {
  var result;
  routes.child(user).orderByChild('name').equalTo(routeName).on('value', function(route) {
    result = route.val();
  });
  return result;
};