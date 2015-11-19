angular.module('busitbaby.services', [])

.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https://busitbaby.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})

.factory('fireMap', ['$firebaseObject', function($firebaseObject){
  var obj = {
    map: null,
    marker: null,
    data: null,
    init: function(){
      this.populateMap();
      this.renderBus();
      this.setOptions();
      this.addDraggableMarker();
    },

    populateMap: function(){
      //map of Bronx,NY
      var myLatlng = new google.maps.LatLng(40.8373, -73.8860)
      var mapOptions = {
        zoom: 12,
        center: myLatlng,
      };
      this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var transitLayer = new google.maps.TransitLayer();
      transitLayer.setMap(this.map);
    },

    renderBus: function(){
      //save context
      var that = this;
      var ref = new Firebase('https://publicdata-transit.firebaseio.com/bronx');
      //get data for one bus
      var bus = ref.child('vehicles').child('300');
      //get initial location
      bus.once('value', function(snap){
        var it = snap.val();
        console.log(it)
        var latlng = new google.maps.LatLng(it.lat,it.lon);
        that.marker = new google.maps.Marker({
          position: latlng,
          map: that.map
        })
      });
      //update location on change to bus
      bus.on('value', function(snap){
        if(this.marker){
          this.marker.setPosition(new google.maps.LatLng(snap.val().lat,snap.val().lon));
        }
      })

    },

    setOptions: function(){
      //save context
      var that = this;
      //empty list of options on each call
      $('.stop').empty();
      if($('.direction').val() === 'Going to Wash. Heights'){
        $.getJSON('../json/stop1.json', function(data){
          that.data = data;
          data.stops.forEach(function(stop){
            //add list of options for wash heights direction
            $('.stop').append('<option>' + stop.name + '</option>')
          })
        })
      } else if($('.direction').val() === 'Going to W. Farms Rd'){
        $.getJSON('../json/stop2.json', function(data){
          that.data = data;
          data.stops.forEach(function(stop){
            $('.stop').append('<option>' + stop.name + '</option>')
          })
        })
      }
    },

    addDraggableMarker: function(){
      // var image = ''; // Use your own image
      var marker = new google.maps.Marker({
        position: {lat: 40.849462, lng: -73.882599 },
        map: this.map,
        // icon: image,
        draggable: true
      });

      marker.addListener('dragend', function() {
        var coords = marker.getPosition();
        $scope.getLoc(coords);
      });
    }

  }
    return obj;
  }])


// .factory('Sounds', function($q) {

// 	var deleteSound = function(x) {
// 		console.log("calling deleteSound");
// 		var deferred = $q.defer();
// 		getSounds().then(function(sounds) {
// 			sounds.splice(x,1);
// 			localStorage.busitbaby = JSON.stringify(sounds);
// 			deferred.resolve();
// 		});

// 		return deferred.promise;

// 	}

// 	var getSounds = function() {
// 		var deferred = $q.defer();
// 		var sounds = [];

// 		if(localStorage.busitbaby) {
// 			sounds = JSON.parse(localStorage.busitbaby);
// 		}
// 		deferred.resolve(sounds);

// 		return deferred.promise;
// 	}

// 	var playSound = function(x) {
// 		getSounds().then(function(sounds) {
// 			var sound = sounds[x];


// 			var mediaUrl = sound.file;
// 			if(device.platform.indexOf("iOS") >= 0) {
// 				mediaUrl = "../Library/NoCloud/FILE" + mediaUrl.split("/").pop();
// 			}
// 			var media = new Media(mediaUrl, function(e) {
// 				media.release();
// 			}, function(err) {
// 				console.log("media err", err);
// 			});
// 			media.play();
// 		});
// 	}

// 	var saveSound = function(s) {
// 		console.log("calling saveSound");
// 		var deferred = $q.defer();
// 		getSounds().then(function(sounds) {
// 			sounds.push(s);
// 			localStorage.busitbaby = JSON.stringify(sounds);
// 			deferred.resolve();
// 		});

// 		return deferred.promise;
// 	}

// 	return {
// 		get:getSounds,
// 		save:saveSound,
// 		delete:deleteSound,
// 		play:playSound
// 	};
