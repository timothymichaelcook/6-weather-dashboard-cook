/* 
VARIABLES SECTION
*/

// Declare cities variable, assign to empty array
var cities = [];   
// Declare cityName variable, assign to empty string
var cityName = "";

// Declare function renderButtons as function declaration
function renderButtons() {
    
    // Clear button-view HTML Id 
    $("#buttons-view").empty();

    // For loop (iteration), creates new button element for searched cities
    for (var i=0; i<cities.length; i++) {
        // Declare btn variable, assign to button tags in HTML
        var btn = $("<button>");
        btn.addClass("city btn btn-light");
        btn.attr("data-name", cities[i]);
        btn.text(cities[i]);
        $("#buttons-view").prepend(btn);
    }

    $(".city").on("click", function(event) {
        // Prevents browser window from reloading when button is clicked
        event.preventDefault();
        // Declare cityName variable, assign to user input
        cityName = $(this).text();
        // Call searchFunction function
        searchFunction(); 
            
    });

}

// Call init function
initializeApp();

// Declare initializeApp function
function initializeApp() {
    // Retrieve stored cities from localStorage, parse JSON string
    let storedCities = JSON.parse(localStorage.getItem("cities"));
    // Update cities array if cities value is not null
    if (storedCities !== null) {
        cities = storedCities;
      }
    
    // Render cities to the DOM
    renderButtons();
    cityName = localStorage.getItem("lastcity");
    
    // Call searchFunction function
    searchFunction();

}

// Declare search function, no parameters needed
function searchFunction() {

    // Declare URL variables, generate apikey at openweathermap.org
    var APIKey ="b4be0b7d750fe772ec24b0cccb796b0d";
    var queryURLcurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
    
    //Declare currentDayWeather function, passing response as a parameter
    function currentDayWeather (response) {

        //  Declare date, newDate and displayDate variables
        let date = response.dt 
        let newDate = new Date(date * 1000);
        let displayDate = newDate.toLocaleDateString();
       
        // Display city name, date and weather icon via jQuery
        let iconcode = response.weather[0].icon;
        let iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
        $("#cityname").text(response.name + "(" + displayDate + ")");
        $('#wicon').attr('src', iconurl);

        // Display temperature, humidity, windspeed via jQuery
        let Ftemp = (response.main.temp - 273.15) * 1.80 + 32; 
        $("#temperature").text(Ftemp.toFixed(1) + "°F");
        $("#humidity").text(response.main.humidity + "%");
        $("#windspeed").text(response.wind.speed + "MPH");

    };

    // API call for current day weather
    $.ajax({
        url: queryURLcurrent,
        method: "GET"
    }).then(function(response){

        currentDayWeather(response);
       
        // Display UV index
        var currentUVindex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" +APIKey;


        // API call for current UVindex inside current day weather
        $.ajax({
            url: currentUVindex,
            method: "GET"
        }).then(function(uvresponse){

            $("#uvindex").text(uvresponse.value);
            if (uvresponse.value < 3 ) {
                $("#uvindex").attr("class", "favorable");
            } else if ( uvresponse.value > 5) {
                $("#uvindex").attr("class", "severe");
            } else {
                $("#uvindex").attr("class", "moderate");
            };
        });
    });
    
    // Declare fiveDayForecast function, pass response as parameter
    function fiveDayForecast (response) {  

        // Iteration
        for (var i=0; i < response.list.length ; i+=8) {
    
            let fiveDayForecast = $("#5dayforecast");
    
            // Create card inside the loop
            let fiveDayCard = $("<div>");
            fiveDayCard.attr("class", "card fiveDayCard bg-primary");

            fiveDayForecast.append(fiveDayCard);
            
            //  Convert time from unixtime standard GMT to MM/DD/YYYY
            let date = response.list[i].dt;
            let newDate = new Date(date * 1000);
            let displayDate = newDate.toLocaleDateString();
            let h5El = $("<h5>");
            h5El.text(displayDate);
            // divEl.append(h5El);
            fiveDayCard.append(h5El);

             // Declare weather icon variables
             let iconcode = response.list[i].weather[0].icon;
             let iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
             let weathericon = $("<img>");
             weathericon.attr('src', iconurl);
             let divEl = $("<div>");
             divEl.append(weathericon);
             fiveDayCard.append(divEl);
             
    
            // Declare temperature variable
            let Ftemp = (response.list[i].main.temp - 273.15) * 1.80 + 32; 
            let fivedaytemperature = "Temp:" + Ftemp.toFixed(1) + "°F";
            let tempEl = $("<p>");
            tempEl.text(fivedaytemperature);
            fiveDayCard.append(tempEl);

            // Declare humidity variable
            let fiveDayHumidity = "Humidity:" + response.list[i].main.humidity + "%";
            let humidityEl = $("<p>");
            humidityEl.text(fiveDayHumidity);
            fiveDayCard.append(humidityEl);           
        } 
    };

    // API call for 5 day forecast
    $.ajax({
        url: queryURLforecast,
        method: "GET"
    }).then(function(response){
       
        // Call fiveDayForecast function passing response as argument
        $("#5dayforecast").empty();
        fiveDayForecast(response);     
    })
    
    // Declare storedCities function
    function storedCities () {
        // Stringify and set "cities" key in localStorage to cities array
        localStorage.setItem("cities", JSON.stringify(cities));
    }
    
    var city = $("#city-input").val().trim();
     
    // Return function (end) if user input is blank
    if (city === "" ) {
        return;        
    }
        
    // Iteration seeing if city has been searched by user
    for (let i = 0; i < cities.length; i++) {
        if (city === cities[i]) {
            alert ("You have already searched" + cities[i] )
            return;
        } 
    }

    // Add new city button to cities array, clear the input
    cities.push(city);
    $("#city-input").val("");   
    storedCities();
    renderButtons(); 
        

}


// Event listener using jQuery on id searchBtn when clicked, runs anonymous function with event passed as argument
$("#searchBtn").on("click", function(event) {
    // Prevents page from reloading when button is clicked
    event.preventDefault();
    // grab the text from the city search input
    cityName = $("#city-input").val();
    searchFunction(); 
    // Return function (end) if cityName variable is blank
    if (cityName === "") {
        return;
    }
    
    // Set lastcity element in local storage to cityName variable
    localStorage.setItem("lastcity", cityName);
    // Console log cityName variable
    console.log(cityName);
    // Console log cityName variable
    console.log(cities);
            
});










// five day forecast
// B. for loop for the city buttons 
    // local storage get item parse
    // local storage
    // array for the city

// activity 6-9