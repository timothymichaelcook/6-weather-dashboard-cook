// DECLARING FUNCTION GETWEATHER
function getWeather() {
  // DECLARING VARIBALE CITYINPUT, SETTING IT TO DOCUMENT OBJECT WITH ID CITYINPUT
  var cityInput = document.getElementById("cityInput");
  // DECLARING VARIBALE CITYRESULT, SETTING IT TO DOCUMENT OBJECT WITH ID CITYRESULT
  var cityResult = document.getElementById("cityResult");
  // ASSIGNING VARIBALE CITYINPUT VALUE TO CITYRESULT INNERHTML
  cityResult.innerHTML = "Search Results: '" + cityInput.value+ "'";




// FETCH CALL TO API WITH QUERY CITYINPUT VALUE
fetch('https://api.openweathermap.org/data/2.5/forecast?q='+cityInput.value+'&appid=32ba0bfed592484379e51106cef3f204')
//CONVERT API RESPONSE TO JSON FORMAT
.then(response => response.json())
//RETURNS DATA
.then(data => {

  // FOR LOOP RUNS 5 TIMES
  for(i = 0; i<5; i++){
      //GETS DATA FROM TEMP_MIN NODE, CONVERTS TO F AND CONCATS STRING WITH DEGREE SYMBOL AND MIN:, ASSIGNS TO VARIABLE DAY#MIN, SETS TO DOCUMENT OBJECT ID, LOOPS 5X
      document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(1.8*(data.list[i].main.temp_min - 273)+32).toFixed(1)+ "°";
  }
  // FOR LOOP RUNS 5 TIMES
  for(i = 0; i<5; i++){
      //GETS DATA FROM TEMP_MAX NODE, CONVERTS TO F AND CONCATS STRING WITH DEGREE SYMBOL AND MIN:, ASSIGNS TO VARIABLE DAY#MAX, SETS TO DOCUMENT OBJECT ID, LOOPS 5X
      document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(1.8*(data.list[i].main.temp_max - 273)+32).toFixed(2) + "°";
  }
  //------------------------------------------------------------

  // FOR LOOP RUNS 5 TIMES
   for(i = 0; i<5; i++){
      //GETS DATA FROM ICON NODE, CONCATS URL AND .PNG TO DATA, ASSIGNS TO IMG#, SETS TO DOCUMENT OBJECT ID, LOOPS 5X
      document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon +".png";
  }


})
//ERROR CATCH IF API CALL DOESN'T WORK
.catch(err => alert("Please Try Again!"))
}


// DECLARE FUNCTION DEFAULTSCREEN
function DefaultScreen(){
  // ASSIGNING MIAMI AS DEFAULT VALUE OF ELEMENT WITH ID CITYINPUT
  document.getElementById("cityInput").defaultValue = "Miami";
  // CALL GETWEATHER FUNCTION
  getWeather();
}


// GETTING AND UPDATE TEXT 
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

localStorage.setItem("d", d);



// DECLARE FUNCTION CHECKDAY WITH PARAMENTER OF DAY
function CheckDay(day){
  // CONDITIONAL STATEMENT 
  if(day + d.getDay() > 6){
    // IF DAY IS GREATER THAN 6, MINUS BY 7, NOT SURE IF THIS WILL EVER HAPPEN SINCE THE INDEX IS FROM 0-6
      return day + d.getDay() - 7;
  }
  // CONDITIONAL STATEMENT
  else{
      //RETURNS CURRENT DAY AS DAY
      return day + d.getDay();
      
      
  }
  
}
localStorage.setItem(weekDay);
  // FOR LOOP RUNS 5 TIMES
  for(i = 0; i<5; i++){
    // WEEKDAY ARRAY ITEM IS ASSIGNED TO THE ELEMENT ID OF DAY APPENDED WTIH THE DAY #, PRODUCING AN ARRAY OF 5 DAYS IN ORDER
      document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
  }
