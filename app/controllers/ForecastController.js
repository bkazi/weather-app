app.controller('ForecastController', ['$scope', '$http', function($scope, $http) {

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
      var reqUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&APPID=aed6185e2ce407f75566d8df9954d81f&cnt=7';
      $http({
        method: 'GET',
        url: reqUrl
      }).then(function(res) {
        var data = res.data;
        $scope.list = parseForecast(data);
      }, function(res) {
        console.log(res.statusText);
      });
    });
  }

  function parseForecast(data) {
    var forecast = [];
    for (var index in data.list) {
      var day = data.list[index];
      forecast.push({
        dt: day.dt * 1000,
        max: day.temp.max,
        min: day.temp.min,
        description: day.weather[0].main,
        id: day.weather[0].id
      });
    }
    return forecast;
  }

	// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=aed6185e2ce407f75566d8df9954d81f

}]);
