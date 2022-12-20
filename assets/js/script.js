api.openweathermap.org/data/2.5/forecast?q=london&appid=847ffadac8f9704104c4582fe8936ffd


function getInfo() {
  const newName = document.getElementById("cityInput"); 
  const cityName = document.getElementById("cityName");
  cityName.innerHTML = "Results for: " + newName.value
}

fetch("api.openweathermap.org/data/2.5/forecast?q=london&appid=847ffadac8f9704104c4582fe8936ffd")

