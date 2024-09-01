function formatDate(date) {
  let newDateInfo = document.querySelector("#current-date");
  let minutes = newDateInfo.getMinutes();
  let hours = newDateInfo.getHours();
  let day = newDateInfo.getDay();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
}
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
  let formattedDay = days[day];
   let formattedDate = `${formattedDay} ${hours}:${minutes}`;
  newDateInfo.innerHTML = formattedDate;
}
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
  let dateElement = document.querySelector("#current-date");
  let dateInfo = response.data.time;
  dateElement.innerHTML = dateInfo;
  let iconElement = document.querySelector("#temp-icon");
let iconSource = response.data.condition.icon_url;
let tempIcon = document.getElementById("temp-icon");
tempIcon.setAttribute("src", "iconSource");
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
  axios.get(apiUrl).then(formatDate);
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

