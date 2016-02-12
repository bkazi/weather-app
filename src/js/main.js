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
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  });
}
