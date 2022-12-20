/* api.openweathermap.org/data/2.5/forecast?q=london&appid=847ffadac8f9704104c4582fe8936ffd */


function getInfo() {
  const newName = document.getElementById("cityInput"); 
  const cityName = document.getElementById("cityName");
  cityName.innerHTML = "Results for: " + newName.value
}

fetch("api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=847ffadac8f9704104c4582fe8936ffd")
  .then(response => response.json)
  .then(data => {
    for(i = 0; i < 5; i++) {
      document.getElementById("day" + (i + 1) + "Min:").innerHTML ="Min:" + Number(data.list[i].main.temp_min - 288.53).toFixed(1)+"°"
    }
  })

