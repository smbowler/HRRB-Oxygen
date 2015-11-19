angular.module('busitbaby', ['ionic', 'busitbaby.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
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
		.state('page3', {
			url: "/page3",
			templateUrl: "templates/page3.html",
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
		.state('about', {
			url: "/about",
			templateUrl: "templates/about.html",
			controller: 'AboutCtrl'
		})
		// .state('record', {
		// 	url: "/record",
		// 	templateUrl: "templates/record.html",
		// 	controller: 'RecordCtrl'
		// })
		$urlRouterProvider.otherwise('/main');

});



  
