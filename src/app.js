//GET CURRENT DATE AND TIME https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript

function getDate() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();

  if (month.toString().length == 1) {
    month = "0" + month;
  }
  if (day.toString().length == 1) {
    day = "0" + day;
  }

  var currentDate = year + "/" + month + "/" + day;
  return currentDate;
}

function getTime() {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }
  if (minute.toString().length == 1) {
    minute = "0" + minute;
  }

  var currentTime = hour + ":" + minute;
  return currentTime;
}

setInterval(function () {
  currentDate = getDate();
  document.getElementById("current-date").innerHTML = currentDate;
}, 1000);

setInterval(function () {
  currentTime = getTime();
  document.getElementById("current-time").innerHTML = currentTime;
}, 1000);

// GET SEARCHED CITY

function changeCityNameToSearchedOne(searchedCity) {
  let changeCity = document.querySelector("#city");
  let upperSearchedCity = searchedCity.toUpperCase();
  changeCity.innerHTML = upperSearchedCity;
}

function showCityTemperature(response) {
  cityTemperature = response.data.main.temp;
  let selectTemp = document.querySelector("#current-temperature-value");
  selectTemp.innerHTML = Math.round(cityTemperature);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${getDate(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(response) {
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;

  let apiKey = `b40b135798f82a05aed08769f9275f50`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCityHumidity(response) {
  let setHumidity = document.querySelector("#humidity");
  let cityPrecipitation = response.data.main.humidity;
  setHumidity.innerHTML = `HUMIDITY: ${cityPrecipitation}%`;
}

function showCityWind(response) {
  let setWind = document.querySelector("#wind");
  let cityWind = Math.round(response.data.wind.speed);
  setWind.innerHTML = `WIND: ${cityWind} km/h`;
}

function showCityWeatherDescription(response) {
  let setDesc = document.querySelector("#day-description");
  let updatedDesc = response.data.weather[0].description;
  let updatedDescCaps = updatedDesc.toLocaleUpperCase();
  setDesc.innerHTML = updatedDescCaps;
}

function setIcon(response) {
  let icon = document.querySelector("#img-current-weather");
  let iconCode = response.data.weather[0].icon;
  let iconLink = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  console.log(iconCode, iconLink);
  icon.setAttribute("src", iconLink);
}

function getSearchedCityName(event) {
  event.preventDefault();

  let apiKey = `b40b135798f82a05aed08769f9275f50`;
  let searchedCity = document.querySelector("#searchbar");
  let unit = "metric";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=${unit}`;

  changeCityNameToSearchedOne(searchedCity.value);
  axios.get(apiLink).then(showCityTemperature);
  axios.get(apiLink).then(showCityHumidity);
  axios.get(apiLink).then(showCityWind);
  axios.get(apiLink).then(showCityWeatherDescription);
  axios.get(apiLink).then(setIcon);

  axios.get(apiLink).then(getForecast);
}

function convertToFarinhate(event) {
  event.preventDefault();
  let selectTemp = document.querySelector("#current-temperature-value");
  celsiusButton.classList.remove("active");
  farengateButton.classList.add("active");

  let fahrenheit = (cityTemperature * 9) / 5 + 32;
  selectTemp.innerHTML = Math.round(fahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();
  let selectTemp = document.querySelector("#current-temperature-value");
  selectTemp.innerHTML = Math.round(cityTemperature);
  farengateButton.classList.remove("active");
  celsiusButton.classList.add("active");
}

let cityTemperature = null;
let searchButton = document.querySelector("#site-search-button");
searchButton.addEventListener("click", getSearchedCityName);

let farengateButton = document.querySelector("#farengate-link");
farengateButton.addEventListener("click", convertToFarinhate);

let celsiusButton = document.querySelector("#celsius-link");
celsiusButton.addEventListener("click", convertToCelsius);
