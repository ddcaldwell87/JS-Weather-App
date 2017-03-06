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
        var iconUrl = "http://openweathermap.org/img/w/"+icon+".png";

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

        // Daytime icons
        switch (icon)
        {
            case "01d":
            break;
            case "02d":
            break;
            case "03d":
            break;
            case "04d":
            break;
            case "05d":
            break;
            case "06d":
            break;
            case "07d":
            break;
            case "08d":
            break;
            case "09d":
            break;
            case "10d":
            break;
            case "11d":
            break;
            case "13d":
            break;
            case "50d"
            break;
        }

        // Nighttime icons
        switch (icon)
        {
            case "01n":
            break;
            case "02n":
            break;
            case "03n":
            break;
            case "04n":
            break;
            case "05n":
            break;
            case "06n":
            break;
            case "07n":
            break;
            case "08n":
            break;
            case "09n":
            break;
            case "10n":
            break;
            case "11n":
            break;
            case "13n":
            break;
            case "50n"
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
        $("#icon").html("<img src='"+iconUrl+"'>");
        $("#temp").html(fTemp + "&deg;F");
      }
      weatherData();
    });
  });

  

  // var userCityInput;
  // var userStateInput;
  // var cityInput = $("#cityInput");
  // var stateInput = $("#stateInput");

  // Displays user inputed city weather data (not working)
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