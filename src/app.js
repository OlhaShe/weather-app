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

function showCityHumidity(response) {
  let setHumidity = document.querySelector("#humidity");
  let cityPrecipitation = response.data.main.humidity;
  setHumidity.innerHTML = `HUMIDITY: ${cityPrecipitation}%`;
  //  console.log();
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
  //  axios.get(apiLink).then(convertToFarinhate);
  axios.get(apiLink).then(setIcon);
}

function convertToFarinhate(event) {
  event.preventDefault();
  let selectTemp = document.querySelector("#current-temperature-value");
  let fahrenheit = (cityTemperature * 9) / 5 + 32;
  selectTemp.innerHTML = Math.round(fahrenheit);
}

function convertToCelsius(event) {
  event.preventDefault();
  let selectTemp = document.querySelector("#current-temperature-value");
  selectTemp.innerHTML = Math.round(cityTemperature);
}

let cityTemperature = null;
let searchButton = document.querySelector("#site-search-button");
searchButton.addEventListener("click", getSearchedCityName);

//Convert to Farinhate

// function convertToF(celsius) {
//   console.log(celsius);
//   // make the given fahrenheit variable equal the given celsius value
//   // multiply the given celsius value by 9/5 then add 32
//   let fahrenheit = (celsius * 9) / 5 + 32;
//   // return the variable fahrenheit as the answer
//   console.log(fahrenheit);
//   let setTemperature = document.querySelector("#current-temperature-value");
//   setTemperature.innerHTML = fahrenheit;
// }

let farengateButton = document.querySelector("#farengate-link");
farengateButton.addEventListener("click", convertToFarinhate);

let celsiusButton = document.querySelector("#celsius-link");
celsiusButton.addEventListener("click", convertToCelsius);

//"farengate-link
//celsius-link
