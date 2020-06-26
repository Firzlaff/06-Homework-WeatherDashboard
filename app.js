$(document).ready(function () {

// pull search history from local storage and display into the 
  // const todaysDate = moment().format('LL');
  // $("#date").append(todaysDate);


// on click function for button to search city
  $('#searchBtn').on("click", function (event) {
    event.preventDefault();
    console.log("button CLicked");

    const searchValue = $("#searchValue").val();
    
    searchCity(searchValue);
    
  });
  
  //function to take the search value and pull the data from openweather api for current city.
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
     
      
      //call to get the 5 days in the onecall api to openweather 
        $.ajax({
          type: "POST",
          url: `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=f9ad587c342647080ebc824ff8e4442d&units=imperial`,
          dataType: "json",
        }).then(function (response) {
          console.log(response);
          $("#uvDex").text(response.current.uvi);

          //add the city name to the search history array 
          // store the array  user stringify to save it to the local storage 


        })
      


    })}


    
    //WHEN I search for a city
    //THEN I am presented with current and future conditions for that city and that city is added to the search history
    //WHEN I view current weather conditions for that city

//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index 

//WHEN I view the UV index

//THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

//WHEN I view future weather conditions for that city

//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

//WHEN I click on a city in the search history

//THEN I am again presented with current and future conditions for that city

//WHEN I open the weather dashboard

//THEN I am presented with the last searched city forecast

// AJAX call for open weather 

})