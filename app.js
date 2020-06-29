$(document).ready(function () {

// pull search history from local storage and display into the #cityList ul

// Require moment to pull date info
// const moment = require('moment');

// const todaysDate = moment().format('LL');
// $("#date").text(todaysDate);


// on click function for button to search city
  $('#searchBtn').on("click", function (event) {
    event.preventDefault();
    console.log("button CLicked");

    const searchValue = $("#searchValue").val();
    
    searchCity(searchValue);
    // Append the city searched to the city list/History
    // $('#cityList').append.(searchValue);

  });
  
  //function to take the search value and pull the data from openweather api for current city.
  //and to get the lon and lat for the onCall below
  function searchCity(searchValue) {
    $.ajax({
      type: "POST",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=f9ad587c342647080ebc824ff8e4442d&units=imperial`,
      dataType: "json",
    }).then(function (response) {
      console.log(response);
      $("#cityName").text(response.name);
      $("#temp").text(response.main.temp);
      $("#speed").text(response.wind.speed);
      $("#humidity").text(response.main.humidity);
     
      
      //call to get the 5 days in the onecall api to openweather which gives the rest of the data needed.
        $.ajax({
          type: "POST",
          url: `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=f9ad587c342647080ebc824ff8e4442d&units=imperial`,
          dataType: "json",
        }).then(function (response) {
          console.log(response);
          $("#uvDex").text(response.current.uvi);
          // setting data for day 1 
          $("#dOneDate").text(response.current.uvi);
          $("#dOneIcon").text(response.current.uvi);
          $("#dOneTemp").text(response.daily[1].temp.day);
          $("#dOneHum").text(response.daily[1].humidity);
          // setting data for day 2 
          $("#dTwoDate").text(response.current.uvi);
          $("#dTwoIcon").text(response.current.uvi);
          $("#dTwoTemp").text(response.daily[2].temp.day);
          $("#udTwoHum").text(response.daily[2].humidity);
          // setting data for day 3 
          $("#dThreeDate").text(response.current.uvi);
          $("#dThreeIcon").text(response.current.uvi);
          $("#dThreeTemp").text(response.daily[3].temp.day);
          $("#dThreeHum").text(response.daily[3].humidity);
          // setting data for day 4 
          $("#dFourDate").text(response.current.uvi);
          $("#dFourIcon").text(response.current.uvi);
          $("#dFourTemp").text(response.daily[4].temp.day);
          $("#udFourHum").text(response.daily[4].humidity);
          // setting data for day 5
          $("#dFiveDate").text(response.current.uvi);
          $("#dFiveIcon").text(response.current.uvi);
          $("#dFiveTemp").text(response.daily[5].temp.day);
          $("#dFiveHum").text(response.daily[5].humidity);

         
          // store the array  user stringify to save it to the local storage 

        })

    })}

})