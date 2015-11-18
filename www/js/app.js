angular.module('ionicApp', ['ionic'])


.controller('MainCtrl', function($scope){
	console.log("this is the first page!");

})
.controller('trackCtrl', function($scope){
	console.log("this is the second page with maps and start&end destination");
})
.controller('AlarmCtrl', function($scope) {
	console.log("Check out your alarm lists!");

  $scope.loudAlarmList = [
    { text: "RingaRinga"},
    { text: "BokBokBok"},
    { text: "RAWLRRRRR"},
  ];
  $scope.softAlarmList = [
    { text: "loolala"},
    { text: "numnomnom"},
    { text: "dubdubeedu"},
  ];

   $scope.vibrate = [
    { text: "vibrate"} 
  ]

}) 
.controller('EndCtrl', function($scope){
	console.log("final page");
})
.controller('SigninCtrl', function($scope){
	console.log("sign in page");


})
.controller('SignupCtrl', function($scope){
	console.log("sign up page");
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
		$urlRouterProvider.otherwise('/main');

});



  
