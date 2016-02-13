app.filter('tempfilter', function() {
  return function(input, unit) {
    if (isNaN(input)) {
      return input;
    }
    var out = (input - 273.15);
    if (unit === 'F') {
      out = (1.8 * (input - 273.15) + 32);
    }
    return out;
  };
});
