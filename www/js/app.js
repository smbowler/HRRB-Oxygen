angular.module('busitbaby', ['ionic', 'busitbaby.controllers', 'busitbaby.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
  });
})


.config(function($stateProvider, $urlRouterProvider){
		$stateProvider

		.state('main', {
			url: "/main",
			templateUrl: "templates/main.html",
			controller: 'MainCtrl'
		})
		.state('page2', {
			url: "/page2",
			templateUrl: "templates/page2.html",
			controller: 'trackCtrl'
		})
		.state('alarm', {
			url: "/alarm",
			templateUrl: "templates/alarm.html",
			controller: 'AlarmCtrl'
		})
		.state('page4', {
			url: "/page4",
			templateUrl: "templates/page4.html",
			controller: 'EndCtrl'
		})
		.state('signin', {
			url: "/signin",
			templateUrl: "templates/signin.html",
			controller: 'SigninCtrl'
		})
		.state('signup', {
			url: "/signup",
			templateUrl: "templates/signup.html",
			controller: 'SignupCtrl'
		})
		.state('record', {
			url: "/record",
			templateUrl: "templates/record.html",
			controller: 'RecordCtrl'
		})
		$urlRouterProvider.otherwise('/main');

});



  
