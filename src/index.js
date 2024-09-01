function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;
  let humidityElement = document.querySelector("#humidity-data");
  let humidity = `${Math.round(response.data.temperature.humidity)} %`;
  humidityElement.innerHTML = humidity;
  let windElement = document.querySelector("#wind-data");
  let wind = `${Math.round(response.data.wind.speed)} km/h`;
  windElement.innerHTML = wind;
  let descElement = document.querySelector("#weather-desc");
  let weatherDesc = response.data.condition.description;
  descElement.innerHTML = weatherDesc;
  //let dateInfo = response.data.time;
}
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city;
  let apiKey = "a86o1049tacf8330d5330da1fb0a51fa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
//function formatDate(date) {
  //let minutes = date.getMinutes();
  //let hours = date.getHours();
  //let day = date.getDay();
  //if (minutes < 10) {
    //minutes = `0${minutes}`;
  //}
  //if (hours < 10) {
    //hours = `0${hours}`;
  //}
  //let days = [
    //"Sunday",
    //"Monday",
    //"Tuesday",
    //"Wednesday",
    //"Thursday",
    //"Friday",
    //"Saturday",
//];
  //let formattedDay = days[day];
  //return `${formattedDay} ${hours}:${minutes}`;
//}

//let dateElement = new Date();
//dateELement.innerHTML = formatDate(dateInfo);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);


