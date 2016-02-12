if ('geolocation' in navigator) {
  console.log('Geolocation: check');
  if ('permissions' in navigator) {
    console.log('Permissions: check');
    navigator.permissions.query({name: 'geolocation'})
    .then(function(result) {
      if (result.status === 'granted') {
        console.log('Granted');
        getPos();
      } else if (result.status === 'prompt') {
        console.log('bleh');
      }
      console.log('Granted');
      getPos();
    });
  } else {
    getPos();
  }
} else {
  console.log('fail');
}

/** Gets position using geolocation */
function getPos() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
    var req = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=aed6185e2ce407f75566d8df9954d81f&units=metric';
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', function() {
      var parsed = JSON.parse(this.responseText);
      console.log('Temperature: ' + parsed.main.temp);
      console.log('Country: ' + parsed.sys.country);
      console.log('City: ' + parsed.name);
    });
    oReq.open('GET', req);
    oReq.send();
  });
}

// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=aed6185e2ce407f75566d8df9954d81f
