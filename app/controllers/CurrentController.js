app.controller('CurrentController', ['$scope', '$http', function($scope, $http) {
  $scope.loading = true;
  if ('geolocation' in navigator) {
    getPos();
  } else {
    console.log('Geoloaction not available');
  }

	/** Gets position using geolocation */
  function getPos() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var reqUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=aed6185e2ce407f75566d8df9954d81f';
      $http({
        method: 'GET',
        url: reqUrl
      }).then(function(res) {
        var data = res.data;
        $scope.curr = parseCurrData(data);
      }, function(res) {
        console.log(res.statusText);
      }).finally(function() {
        $scope.loading = false;
      });
    });
  }

  /** Parses the response JSON and returns a more useable one
  @param {Object} data - JSON object from API
  @return {Object} JSON obkect to be used by view */
  function parseCurrData(data) {
    return {
      city: data.name,
      // country: data.sys.country,
      temp: data.main.temp,
      min: data.main.temp_min,
      max: data.main.temp_max,
      humidity: data.main.humidity,
      dt: data.dt,
      id: data.weather[0].id,
      description: data.weather[0].description,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset
    };
  }

	// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=aed6185e2ce407f75566d8df9954d81f
}]);
