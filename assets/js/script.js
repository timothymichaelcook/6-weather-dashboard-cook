/* 
VARIABLES SECTION
*/

// Declare cities variable, assign to empty array
var cities = [];
// Declare cityName variable, assign to empty string
var cityName = '';

/*
FUNCTIONS SECTION
*/

// Declare function renderButtons
function renderButtons() {
  //
  $('#buttons-view').empty();
  //
  for (var i = 0; i < cities.length; i++) {
    //
    var btn = $('<button>');
    //
    btn.addClass('city btn btn-light');
    btn.attr('data-name', cities[i]);
    btn.text(cities[i]);
    $('#buttons-view').prepend(btn);
  }

  //
  $('.city').on('click', function(event) {
     // .preventDefault method prevents page from reloading on click event
    event.preventDefault();
    cityName = $(this).text();
    searchFunction();
  });
}

// Call init function
init();
//Declare function init
function init() {
  //
  let storedCities = JSON.parse(localStorage.getItem('cities'));
  //
  if (storedCities !== null) {
  //
    cities = storedCities;
  }
  //
  renderButtons();
  //
  cityName = localStorage.getItem('lastcity');
  // Call searchFunction function
  searchFunction();
}

//Declare function searchFunction
function searchFunction() {
  var APIKey = '847ffadac8f9704104c4582fe8936ffd';
  var queryURLcurrent = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey;
  var queryURLforecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + APIKey;

  function currentDayWeather (response) {
    let date = response.dt;
    let newDate = new Date(date * 1000);
    let displayDate =newDate.toLocaleDateString();

    $('#cityname').text(response.name + ' for ' + displayDate);
    let iconcode = response.weather[0].icon;
    let iconurl = 'https://openweathermap.org/img/w/' + iconcode + '.png';
    $('#wicon').attr('src', iconurl);

    let FTemp = (response.main.temp - 273.15) * 1.8 + 32;
    $('#temperature').text(Ftemp.toFixed(1) + '°F');
    $('#humidity').text(response.main.humidity + '%');
    $('#windspeed').text(response.wind.speed + 'MPH');

  };


  $.ajax({
    url: queryURLcurrent,
    method: 'GET',
  }).then(function(response){
    currentDayWeather(response);
    var currentUVindex = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + response.coord.lat + '&lon=' + response.coord.lon + '&appid' + APIKey;

    $.ajax({
      url: currentUVindex,
      method: 'GET'
    }).then(function(uvresponse){
      $('#uvindex').text(uvresponse.value);
      if (uvresponse.value < 3) {
        $('#uvindex').attr('class', 'favorable');
      } else if (uvresponse.value > 5) {
        $('#uvindex').attr('class', 'severe');
      } else {
        $('#uvindex').attr('class', 'moderate')
      };
      
    });
  });

  function fiveDayForecast (response) {
    for (var i=0; i < response.list.length; i +=8) {
      let fiveDayForecast = $('#5dayforecast');

      let fiveDayCard = $('<div>');
      fiveDayCard.attr('class', 'card fiveDayCard bg-primary');
      fiveDayForecast.append(fiveDayCard);


      let date = response.list[i].dt;
      let newDate = new Date(date * 10000);
      let displayDate = newDate.toLocaleDateString();
      let h5El = $('<h5>');
      h5El.text(displayDate);

      fiveDayCard.append(h5El);

      let iconcode = response.list[i].dt;
      let iconurl = 'https://openweathermap.org/img/w/' + iconcode + '.png';
      let weathericon = $('img');
      weathericon.attr('src', iconurl);
      let divEl = $('<div>');
      divEl.append(weathericon);
      fiveDayCard.append(divEl);



      let Ftemp = (response.list[i].main.temp - 273.15) * 1.8 + 32;
      let fivedaytemperature = 'Temp;' + Ftemp.toFixed(1) + '°F'
      let tempEl = $('<p>');
      tempEl.text(fivedaytemperature);
      fiveDayCard.append(tempEl);

      let fiveDayHumidity = 'Humidity' + response.list[i].main.humidity + '%';
      let humidityEl = $('<p>');
      humidityEl.text(fiveDayHumidity);
      fiveDayCard.append(humidityEl);

$.ajax({
  url: queryURLforecast,
  method: 'GET'
}).then(function(response){
  $('#5dayforecast').empty();
  fiveDayForecast(response);
})

function storedCities(){
  localStorage.setItem('cities', JSON.stringify(cities));
  var city = $('city-input').val().trim();

  if (city === ''){
    return;
  }

  for (let i = 0; i < cities.length; i++) {
    if (city === cities[i]){
      alert('You have already searched ' + cities[i] )
      return;
    }
  }
  cities.push(city);
  $('#city-input').val('');
  storedCities();
  renderButtons();
}

};

 
/* 
EVENT LISTENER SECTION
*/
// Event listener on search button, waiting for click event from user
$('#searchBtn').on('click', function(event) {
  // .preventDefault method prevents page from reloading on click event
  event.preventDefault();
  //
  cityName = $('#city-input').val();
  // Call function searchFunction
  searchFunction();
  // Conditional statement checking if cityName variable is equal in data and type of user input
  if (cityName === '') {  
    return;
  }

  localStorage.setItem('lastcity', cityName);
  // Console log cityName variable
  console.log(cityName);
  // Console log cities variable
  console.log(cities);
});

