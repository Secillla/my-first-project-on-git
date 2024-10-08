function displayTemperature(response) {
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;
  let humidityElement = document.querySelector("#humidity-data");
  let humidity = `${Math.round(response.data.temperature.humidity)}%`;
  humidityElement.innerHTML = humidity;
  let windElement = document.querySelector("#wind-data");
  let wind = `${Math.round(response.data.wind.speed)} km/h`;
  windElement.innerHTML = wind;
  let descElement = document.querySelector("#weather-desc");
  let weatherDesc = response.data.condition.description;
  descElement.innerHTML = weatherDesc;
  let date = new Date(response.data.time * 1000);
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#temp-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;
  getForecast(response.data.city);
}
function search(event) {
  let apiKey = "a86o1049tacf8330d5330da1fb0a51fa";
  let searchInput = document.querySelector("#search-input");
  city = searchInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(unformattedTime) {
  let date = new Date(unformattedDate * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKeytwo = "a86o1049tacf8330d5330da1fb0a51fa";
  let searchInput = document.querySelector("#search-input");
  city = searchInput.value;
  let apiURLtwo = `https://api.shecodes.io/weather/v1/forecast?query=Tokyo&key=a86o1049tacf8330d5330da1fb0a51fa&units=metric`;
  axios.get(apiURLtwo).then(displayForecast);
}
function displayForecast(response) {
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
<div class="weather-forecast-day">
  <div class="day-name">${formatDay(day.time)}</div>
  <div><img src="${day.condition.icon_url}" class="day-icon"/></div>
  <div class="day-temp"> <div class="day-temp-high"><strong>${Math.round(
    day.temperature.maximum
  )}</strong></div>
    <div class="day-temp-low">" " + ${Math.round(day.temperature.minimum)}</div>
  </div>
</div>
`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

function getSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getSearchSubmit);
//search("Paris");
