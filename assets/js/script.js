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
  var queryURLcurrent = '' + cityName + '&appid=' + APIKey;
  var queryURLforecast = '' + cityName + '&appid=' + APIKey;

  function currentDayWeather (response) {
    let date = response.dt;
    let newDate = new Date(date * 1000);
    let displayDate =newDate.toLocaleDateString();

    

  }

}
/* 
EVENT LISTENER SECTION
*/
// Event listener on search button, waiting for click event from user
$('#searchBtn').on('click', function(event) {
  // .preventDefault method prevents page from reloading on click event
  event.preventDefault();
  //
  cityName = $('#city-input').value();
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

