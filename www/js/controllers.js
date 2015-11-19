angular.module('busitbaby.controllers', [])


.controller('MainCtrl', function($scope){
	console.log("this is the first page!");

})
.controller('trackCtrl', function($scope){
	console.log("this is the second page with maps and start&end destination");
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

.controller('AboutCtrl', function($scope){
  console.log("about page!! our information goes here");

  $scope.people = [
  {name: 'Alon Robinson', title: 'Product Owner', image: '/img/alon.png'},
  {name: 'David Lee', title: 'Scrum Master', image: '/img/david.png'},
  {name: 'Mykia Smith', title: 'Software Engineer', image: '/img/mykia.png'},
  {name: 'Hera Kim', title: 'Software Engineer', image: '/img/hera.png'}
  ];

})
.controller('AlarmCtrl', function($scope) {
  console.log("Check out your alarm lists!");
   $scope.alarmList = [
    { id: 1, title: "September Remix", artist: "Kirk Franklin", url: '/music/september.mp3' },
    { id: 2, title: "Vibrate", artist: "", url: "" } 
  ];


})
.controller('facebookCtrl', function($scope, $rootScope, $firebase, $firebaseSimpleLogin) {

  // Get a reference to the Firebase
  var firebaseRef = new Firebase("https://busitbaby.firebaseio.com/");

  // Create a Firebase Simple Login object
  $scope.auth = $firebaseSimpleLogin(firebaseRef);

  // Initially set no user to be logged in
  $scope.user = null;

  // Logs a user in with inputted provider
  $scope.login = function(provider) {
    console.log("I am logging in");
    $scope.auth.$login(provider);
  };

  // Logs a user out
  $scope.logout = function() {
    console.log("I am logging out");
    $scope.auth.$logout();
  };

  // Upon successful login, set the user object
  $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
    $scope.user = user;
  });

  // Upon successful logout, reset the user object
  $rootScope.$on("$firebaseSimpleLogin:logout", function(event) {
    $scope.user = null;
  });

  // Log any login-related errors to the console
  $rootScope.$on("$firebaseSimpleLogin:error", function(event, error) {
    console.log("Error logging user in: ", error);
  });

  // Upon successful logout, reset the user object and clear cookies
  // $rootScope.$on("$firebaseSimpleLogin:logout", function(event) {
  //   $scope.user = null;
  //   window.cookies.clear(function() {
  //     console.log("Cookies cleared!");
  //   });
  // });

})
.controller('MapController', ['$scope', 'fireMap', function($scope, fireMap){
  $scope.init = function(){
    fireMap.init();
  }

  $scope.data = {
    sel: 'Going to W. Farms Rd',
    stop: ''
  }

  $scope.options = function(){
    fireMap.setOptions();
  }

  $scope.getLoc = function(){
    var stopArr = fireMap.data.stops;
    for(var i = 0; i < stopArr.length; i++){
      var stop = stopArr[i];
      if(stop.name === $scope.data.stop){

        //call location function
        console.log(stop.latitude)
        console.log(stop.longitude)
      }
    }
  }

}])










// <--------------- EXTRA FEATURES WE DIDN'T IMPLEMENT FOR GREENFIELD ------->
// AlarmCtrl
// var getSounds = function() {
//     console.log('getSounds called');
//     Sounds.get().then(function(sounds) {
//       console.dir(sounds);
//       $scope.sounds = sounds;
//     });
//   }

//   $scope.$on('$ionicView.enter', function(){
//     console.log('enter');
//     getSounds();
//   });
  
//   $scope.play = function(x) {
//     console.log('play', x);
//     Sounds.play(x); 
//   }
  
//   $scope.delete = function(x) {
//     console.log('delete', x);
//     Sounds.get().then(function(sounds) {
//       var toDie = sounds[x];
//       window.resolveLocalFileSystemURL(toDie.file, function(fe) {
//         fe.remove(function() {
//           Sounds.delete(x).then(function() {
//             getSounds();
//           });
//         }, function(err) {
//           console.log("err cleaning up file", err);
//         });
//       });
//     });
//   }
  
//   $scope.cordova = {loaded:false};
//   $ionicPlatform.ready(function() {
//     $scope.$apply(function() {
//       $scope.cordova.loaded = true;
//     });
//   });

// <---------------- RECORD CONTROLLER ------------------------------->
// .controller('RecordCtrl', function($scope, Sounds, $state, $ionicHistory) {
//   console.log(window.navigator);
//   console.log(navigator);
//   console.log(window.navigator.device)
//   console.log("i am inside Record Controller");
  
//   $scope.sound = {name:""};
  
//   $scope.saveSound = function() {
//     console.log('trying to save '+$scope.sound.name);

//     //error checking
//     if($scope.sound.name === "") {
//       navigator.notification.alert("Name this sound first.", null, "Error");
//       return;     
//     }
    
//     if(!$scope.sound.file) {
//       navigator.notification.alert("Record a sound first.", null, "Error");
//       return;     
//     }
    
    
//     var loc = cordova.file.dataDirectory;
   
//     var extension = $scope.sound.file.split(".").pop();
//     var filepart = Date.now();
//     var filename = filepart + "." + extension;
//     console.log("new filename is "+filename);

//     window.resolveLocalFileSystemURL(loc, function(d) {
//       window.resolveLocalFileSystemURL($scope.sound.file, function(fe) {
//         fe.copyTo(d, filename, function(e) {
//           console.log('success in copy');
//           console.dir(e);
//           $scope.sound.file = e.nativeURL;
//           $scope.sound.path = e.fullPath;

//           Sounds.save($scope.sound).then(function() {
//             $ionicHistory.nextViewOptions({
//                 disableBack: true
//             });
//             $state.go("home");
//           });
          
//         }, function(e) {
//           console.log('error in copy');console.dir(e);
//         });         
//       }, function(e) {
//         console.log("error");
//         console.dir(e);
//       });
      
      
//     }, function(e) {
//       console.log('error in fs');console.dir(e);
//     });

    
//   }

//   var captureError = function(e) {
//     console.log('captureError', e);
//   }
  
//   var captureSuccess = function(e) {
//     console.log('captureSuccess');console.dir(e);
//     $scope.sound.file = e[0].localURL;
//     $scope.sound.filePath = e[0].fullPath;
//   }
  
//   $scope.record = function() {
//     navigator.device.capture.captureAudio(
//         captureSuccess,captureError,{duration:10});
//   }
  
//   $scope.play = function() {
//     if(!$scope.sound.file) {
//       navigator.notification.alert("Record a sound first.", null, "Error");
//       return;
//     }
//     var media = new Media($scope.sound.file, function(e) {
//       media.release();
//     }, function(err) {
//       console.log("media err", err);
//     });
//     media.play();
//   }