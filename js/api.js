$(document).ready(function()
{

    function getIP()
    {
        // API that retrieves ip address
        $.getJSON("https://api.ipify.org?format=json&callback=getIP", function(json)
        {
            
            ip = (json.ip);
            console.log(ip);
            ipLookup = "https://freegeoip.net/json/"+ip; // API that gives ip location info
            console.log(ipLookup);

            // calls API to be used in next json call
            $.getJSON(ipLookup, function(data)
            {
                lat = data.latitude;
                lon = data.longitude;
                console.log(lat);
                console.log(lon);
                cityState = data.city + ", " + data.region_code;          

                // API with weather data using lat and lon
                var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=12305dcb1bc441c342264e813a38d17d";

                $.getJSON(api, function(data)
                {
                    // Coordinate based JSON call from Open Weather API

                    function weatherData()
                    {
                        var weatherType = data.weather[0].description;
                        var kTemp = data.main.temp;
                        var windSpeed = data.wind.speed;
                        var icon = data.weather[0].icon;

                        // for default icons
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
                        $("#city").html(cityState);
                        $("#weatherType").html(weatherTypeCase(weatherType));

                        // default icons
                        //$("#icon").html("<img src='"+iconUrl+"'>");
                        $("#temp").html(fTemp + "&deg;F");
                    }
                    weatherData();  
               }) // end of third json call
            }) // end of second json call
        }) // end of first json call
    } // end of getIP function
    getIP();
}) // end of jquery