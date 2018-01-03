function getGeolocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = Number(position.coords.latitude);
    var lon = Number(position.coords.longitude);
    $.ajax({
      type: 'GET',
      url: 'https://fcc-weather-api.glitch.me/api/current?lon=' + lon + '&lat=' + lat,
      success: function(res) {
        $('.weather_place').text('');
        $('.weather_position').text('');
        $('.weather_desc').text('');
        document.querySelector('.weather_icon').src = '';
        $('.--temperature').text('');
        $('.--wind').text('');
        $('.--humidity').text('');

        $('.weather_place').text(res.name + ', ' + res.sys.country);
        $('.weather_position').text('Lat: ' + res.coord.lat + ' Lon: ' + res.coord.lon);
        $('.weather_desc').text(res.weather[0].description);
        document.querySelector('.weather_icon').src = res.weather[0].icon;
        $('.--temperature').html(Math.round(res.main.temp) + '&deg; C');
        $('.--wind').text(res.wind.speed + 'm/s');
        $('.--humidity').text(res.main.humidity + '%');

        $('button').on('click', function(event) {
          $('.--temperature').text('');
          if ($(this).hasClass('tempC')) {
              $('.--temperature').html(Math.round(res.main.temp) + '&deg; C');
            } else if ($(this).hasClass('tempF')) {
              var convertCF = Math.round((res.main.temp * 1.8) + 32);
              $('.--temperature').html(convertCF + '&deg; F');
            }
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
}

if (navigator.geolocation) {
  getGeolocation();
} else {
  var warning = document.createElement('p');
  warning.textContent = "Geolocation is not supported by your browser";
  document.body.appendChild(warning);
};
