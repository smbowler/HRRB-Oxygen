angular.module('busitbaby')

.factory('fireMap', ['$firebaseObject', function($firebaseObject){
  var obj = {
    map: null,
    marker: null,
    init: function(){
      this.populateMap();
      this.renderBus();
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
      var ref = new Firbase('https://publicdata-transit.firebaseio.com/bronx');
      //get data for bus #266
      var bus = ref.child('vehicles').child('266');
      //get initial location
      bus.once('value', function(snap){
        var it = snap.val();
        var latlng = new google.maps.LatLng(it.lat,it.lon);
        this.marker = new google.maps.Marker({
          position: latlng,
          map: this.map
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
      $.ajax({
        
      })
    }
  }









}])
