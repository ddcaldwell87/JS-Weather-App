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
        var icon = data.weather[0].icon;
        //var iconUrl = "http://openweathermap.org/img/w/"+icon+".png";

        // Kelvin to fahrenheit conversion
        var fTemp = Math.ceil((kTemp) * (9 / 5) - 459.67);
        // Kelvin to celsius conversion
        var cTemp = Math.ceil(kTemp - 273);
        var temp = $("#temp");

        // Changes temp reading to either fahrenheit or celsius
        $("#fSwap").click(function(temp)
        {
          $("#temp").fadeToggle(200, function()
          {
            $("#temp").html(fTemp + "&deg;F").fadeIn(200);
          });
        });
        $("#cSwap").click(function(temp)
        {
          $("#temp").fadeToggle(200, function()
          {
            $("#temp").html(cTemp + "&deg;F").fadeIn(200);
          });
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

        // Daytime icons
        switch (icon)
        {
          case "01d":
            $("#icon").addClass("wi wi-day-sunny");
          break;

          case "02d":
            $("#icon").addClass("wi wi-day-cloudy");
          break;

          case "03d":
            $("#icon").addClass("wi wi-cloud");
          break;

          case "04d":
            $("#icon").addClass("wi wi-cloudy");
          break;

          case "09d":
            $("#icon").addClass("wi wi-rain");
          break;

          case "10d":
            $("#icon").addClass("wi wi-fw wi-day-rain");
          break;

          case "11d":
            $("#icon").addClass("wi wi-thunderstorm");
          break;

          case "13d":
            $("#icon").addClass("wi wi-day-snow");
          break;

          case "50d":
            $("#icon").addClass("wi wi-day-fog");
          break;
        }

        // Nighttime icons
        switch (icon)
        {
          case "01n":
            $("#icon").addClass("wi wi-night-clear");
          break;

          case "02n":
            $("#icon").addClass("wi wi-night-alt-cloudy");
          break;

          case "03n":
            $("#icon").addClass("wi wi-cloud");
          break;

          case "04n":
            $("#icon").addClass("wi wi-cloudy");
          break;

          case "09n":
            $("#icon").addClass("wi wi-rain");
          break;

          case "10n":
            $("#icon").addClass("wi wi-night-alt-rain");
          break;

          case "11n":
            $("#icon").addClass("wi wi-thunderstorm");
          break;

          case "13n":
            $("#icon").addClass("wi wi-night-alt-snow");
          break;

          case "50n":
            $("#icon").addClass("wi wi-night-fog");
          break;
        }

        console.log(city);
        console.log(weatherType);
        console.log(fTemp);
        console.log(lon);
        console.log(lat);
        console.log(api);
        // Displays weather data in browser
        $("#city").html(city);
        $("#weatherType").html(weatherTypeCase(weatherType));
        //$("#icon").html("<img src='"+iconUrl+"'>");
        $("#temp").html(fTemp + "&deg;F");
      }
      weatherData();
    });
  });

  

  // var userCityInput;
  // var userStateInput;
  // var cityInput = $("#cityInput");
  // var stateInput = $("#stateInput");

  // Displays user inputted city weather data (not working)
  // $("#cityInputButton").click(function()
  // {
    
  //   userCityInput = cityInput.val();
  //   userStateInput = stateInput.val();

  //   // City API from Open Weather API
  //   var userCity = "http://api.openweathermap.org/data/2.5/weather?q="+userCityInput+","+userStateInput+"&appid=12305dcb1bc441c342264e813a38d17d"
  
  //   $.getJSON(userCity, function(data)
  //   {
  //     // City based JSON call from Open Weather API
  //     weatherData();
  //   });
  // });

});