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
