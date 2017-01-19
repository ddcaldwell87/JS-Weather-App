$(document).ready(function()
{
  
  var lon;
  var lat;
  var local = true;
  var nav = navigator.geolocation;

 
  // Gets the browsers location
  navigator.geolocation.getCurrentPosition(function(position)
  {
    
    lon = position.coords.longitude;
    lat = position.coords.latitude;

    // Coordinate API from Open Weather API
    var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=12305dcb1bc441c342264e813a38d17d";

    $.getJSON(api, function(data)
    {
      // Coordinate based JSON call from Open Weather API

      function weatherData()
      {
        var weatherType = data.weather[0].description;
        var kTemp = data.main.temp;
        var city = data.name;
        var windSpeed = data.wind.speed;

        // Kelvin to farhrenheit conversion
        var fTemp = Math.ceil((kTemp) * (9 / 5) - 459.67);
        // Kelvin to celsius conversion
        var cTemp = Math.ceil(kTemp - 273);
        var temp = $("#temp");

        // Changes temp reading to either farhrenheit or celsius
        $("#fSwap").click(function(temp)
        {
          $("#temp").html(fTemp + "&deg;F");
        });

        $("#cSwap").click(function(temp)
        {
          $("#temp").html(cTemp + "&deg;C");
        });

        // Title Cases the var weatherType weather description
        function weatherTypeCase(str)
        {
          str = str.toLowerCase().split(' ');
          for (var i = 0; i < str.length; i++)
          {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
          }
          return str.join(' ');
        }

        console.log(city);
        console.log(weatherType);
        console.log(fTemp);
        console.log(lon);
        console.log(lat);
        console.log(api);
        console.log(temp);
        // Displays weather data in browser
        $("#city").html(city);
        $("#weatherType").html(weatherTypeCase(weatherType));
        $("#temp").html(fTemp + "&deg;F");
      }
      weatherData();
    });
  });

  

  var userCityInput;
  var userStateInput;
  var cityInput = $("#cityInput");
  var stateInput = $("#stateInput");

  // Displays user inputed city weather data (not working)
  $("#cityInputButton").click(function()
  {
    
    userCityInput = cityInput.val();
    userStateInput = stateInput.val();

    // City API from Open Weather API
    var userCity = "http://api.openweathermap.org/data/2.5/weather?q="+userCityInput+","+userStateInput+"&appid=12305dcb1bc441c342264e813a38d17d"
  
    $.getJSON(userCity, function(data)
    {
      // City based JSON call from Open Weather API
      weatherData();
    });
  });

});