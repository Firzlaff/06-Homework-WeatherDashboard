$(document).ready(function () {

// pull search history from local storage and display into the #cityList ul

// variable for Moment for the date information
const todaysDate = moment().format('LL');
$("#date").text(todaysDate);


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
          // setting data for day 1 of 5 date, icon, temp, humidity 
          $("#dOneDate").text(moment.unix(response.daily[0].dt).format("M/D/YY"));
          //$("#dOneIcon").text(response.current.uvi);
          $("#dOneTemp").text(response.daily[1].temp.day);
          $("#dOneHum").text(response.daily[1].humidity);
          // setting data for day 2 of 5 date, icon, temp, humidity 
          $("#dTwoDate").text(moment.unix(response.daily[1].dt).format("M/D/YY"));
         // $("#dTwoIcon").text(response.current.uvi);
          $("#dTwoTemp").text(response.daily[2].temp.day);
          $("#dTwoHum").text(response.daily[2].humidity);
          // setting data for day 3 of 5 date, icon, temp, humidity 
          $("#dThreeDate").text(moment.unix(response.daily[2].dt).format("M/D/YY"));
          //$("#dThreeIcon").text(response.current.uvi);
          $("#dThreeTemp").text(response.daily[3].temp.day);
          $("#dThreeHum").text(response.daily[3].humidity);
          // setting data for day 4 of 5 date, icon, temp, humidity 
          $("#dFourDate").text(moment.unix(response.daily[3].dt).format("M/D/YY"));
          //$("#dFourIcon").text(response.current.uvi);
          $("#dFourTemp").text(response.daily[4].temp.day);
          $("#dFourHum").text(response.daily[4].humidity);
          // setting data for day 5 of 5 date, icon, temp, humidity 
          $("#dFiveDate").text(moment.unix(response.daily[4].dt).format("M/D/YY"));
          //$("#dFiveIcon").text(response.current.uvi);
          $("#dFiveTemp").text(response.daily[5].temp.day);
          $("#dFiveHum").text(response.daily[5].humidity);

         
          // store the array  user stringify to save it to the local storage 

        })

    })}

})