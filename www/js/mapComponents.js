angular.module('busitbaby')

.factory('fireMap', ['$firebaseObject', function($firebaseObject){
  var obj = {
    map: null,
    marker: null,
    init: function(){
      this.populateMap();
      this.renderBus();
      this.setOptions();
    },

    populateMap: function(){
      //Bronx,NY
      var myLatlng = new google.maps.LatLng(40.8373, -73.8860)
      var mapOptions = {
        zoom: 12,
        center: myLatlng,
      };
      this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    },

    renderBus: function(){
      var that = this;
      var ref = new Firebase('https://publicdata-transit.firebaseio.com/bronx');
      //get data for bus #266
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
      //update location
      bus.on('value', function(snap){
        if(this.marker){
          this.marker.setPosition(new google.maps.LatLng(snap.val().lat,snap.val().lon));
        }
      })

    },

    setOptions: function(){
      $('.stop').empty();
      if($('.direction').val() === 'Going to Wash. Heights'){
        $.getJSON('../json/stop1.json', function(data){
          data.stops.forEach(function(stop){
            $('.stop').append('<option>' + stop.name + '</option>')
          })
        })
      } else if($('.direction').val() === 'Going to W. Farms Rd'){
        $.getJSON('../json/stop2.json', function(data){
          data.stops.forEach(function(stop){
            $('.stop').append('<option>' + stop.name + '</option>')
          })
        })
      }
    },


  }
    return obj;
  }])

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

}])
