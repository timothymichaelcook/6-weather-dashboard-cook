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


// Call init function
init();
//Declare function
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

/* 
EVENT LISTENER SECTION
*/
// Event listener on search button, waiting for click event from user
$('#searchBtn').on('click', function(event) {
  // .preventDefault method prevents page from reloading
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

