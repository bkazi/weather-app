app.controller('CurrentController', ['$scope', '$http', function($scope, $http) {
  if ('geolocation' in navigator) {
    console.log('Geolocation: check');
    if ('permissions' in navigator) {
      console.log('Permissions: check');
      navigator.permissions.query({
        name: 'geolocation'
      })
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
      var reqUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=aed6185e2ce407f75566d8df9954d81f&units=metric';
      $http({
        method: 'GET',
        url: reqUrl
      }).then(function(res) {
        var data = res.data;
        $scope.curr = {
          city: data.name,
          country: data.sys.country
        };
      }, function(res) {
        console.log(res.statusText);
      });
    });
  }

	// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=aed6185e2ce407f75566d8df9954d81f
}]);
