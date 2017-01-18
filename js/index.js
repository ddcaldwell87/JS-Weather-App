$(document).ready(function(){
  
  var lon;
  var lat;
 

  if (navigator.geolocation) 
  {
    navigator.geolocation.getCurrentPosition(function(position) {
      // Gets browsers location
      
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      
  // API from Open Weather API
  var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=12305dcb1bc441c342264e813a38d17d";
  
  $.getJSON(api, function(data)
  {
    // JSON call from Open Weather API
        
    var weatherType = data.weather[0].description;
    var kTemp = data.main.temp;
    var city = data.name;
    var windSpeed = data.wind.speed;
    
    // Kelvin to farhrenheit conversion
    var fTemp = Math.ceil((kTemp) * (9 / 5) - 459.67);
    // Kelvin to celsius conversion
    var cTemp = Math.ceil(kTemp - 273);
     var temp = $("#temp");

    document.getElementById("fSwap").onclick = function(temp)
    {
      $("#temp").html(fTemp + "&deg;F");
    };

    document.getElementById("cSwap").onclick = function(temp)
    {
      $("#temp").html(cTemp + "&deg;C");
    };

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
    $("#city").html(city);
    $("#weatherType").html(weatherTypeCase(weatherType));
    $("#temp").html(fTemp + "&deg;F");
  });
  });
  }
});