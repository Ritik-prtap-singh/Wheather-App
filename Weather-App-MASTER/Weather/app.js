// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});







// This is a JavaScript code for a weather app that gets the user's current location using the geolocation API and fetches weather data from the OpenWeatherMap API based on the user's location. The weather data is then displayed on the app's UI.

// The code starts by selecting HTML elements on the app's UI using the querySelector method. The elements include the weather icon, temperature value, temperature description, location, and notification. The weather object is then initialized with a temperature object that has a default temperature unit of Celsius.

// The KELVIN constant is set to 273 to convert temperature values from Kelvin to Celsius. The key constant is set to the API key for the OpenWeatherMap API.

// The code checks if the user's browser supports geolocation by calling the getCurrentPosition method of the navigator.geolocation object. If geolocation is supported, the setPosition function is called with the user's latitude and longitude coordinates. If geolocation is not supported, an error message is displayed on the app's UI.

// The setPosition function sets the latitude and longitude variables and calls the getWeather function with the latitude and longitude values.

// The showError function is called if there is an issue with the geolocation service. The function displays an error message on the app's UI.

// The getWeather function fetches weather data from the OpenWeatherMap API using the fetch method. The API URL is constructed using the user's latitude and longitude coordinates and the API key. The returned data is then converted to JSON and the relevant weather information is extracted from the data and stored in the weather object. The displayWeather function is then called to display the weather information on the app's UI.

// The displayWeather function sets the HTML content of the weather icon, temperature value, temperature description, and location elements to the values stored in the weather object.

// The celsiusToFahrenheit function converts temperature values from Celsius to Fahrenheit.

// The addEventListener method is used to add a click event listener to the temperature element. When the element is clicked, the celsiusToFahrenheit function is called to convert the temperature value from Celsius to Fahrenheit and the temperature unit is updated to Fahrenheit. If the temperature unit is already Fahrenheit, the temperature value is converted back to Celsius and the temperature unit is updated to Celsius.