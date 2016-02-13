app.directive('currentWeather', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'views/currentWeather.html'
  };
});
