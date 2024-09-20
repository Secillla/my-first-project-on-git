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
  getForecast(response.data.city);
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
function formatDay(unformattedTime) {
  let date = new Date(unformattedDate * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "a86o1049tacf8330d5330da1fb0a51fa";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayForecast);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
<div class="weather-forecast-day">
  <div class="day-name">${formatDay(day.time)}</div>
  <div ><img src="${day.condition.icon_url}" class="day-icon" /></div>
  <div class="day-temp">
    <div class="day-temp-high">
      <strong>${Math.round(day.temperature.maximum)}</strong>
    </div>
    <div class="day-temp-low">${Math.round(day.temperature.minimum)}</div>
  </div>
</div>
`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

search("Paris");
