let temperature = document.querySelector(".temp"); 
let summary = document.querySelector(".summary"); 
let loc = document.querySelector(".location"); 
let icon = document.querySelector(".icon"); 
let lon; 
let lat; 
const kelvin = 273; 

window.addEventListener("load", () => { 
if (navigator.geolocation) { 
navigator.geolocation.getCurrentPosition((position) => { 
console.log(position); 
lon = position.coords.longitude; 
lat = position.coords.latitude; 

// API ID 
const api = "6d055e39ee237af35ca066f35474e9df"; 

// API URL 
const base = 
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + 
`lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`; 
-
// Calling the API 
fetch(base) 
.then((response) => { 
return response.json(); 
}) 
.then((data) => { 
console.log(data); 
temperature.textContent = 
    Math.floor(data.main.temp - kelvin) + "°C"; 
summary.textContent = data.weather[0].description; 
loc.textContent = data.name + "," + data.sys.country; 
let icon1 = data.weather[0].icon; 
icon.innerHTML = 
    `<img src="" style= 'height:10rem'/>`; 
}); 
}); 
} 
}); 

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
const cityName = cityInput.value;
const api = "6d055e39ee237af35ca066f35474e9df";
const base = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}`;

fetch(base)
.then((response) => {
    return response.json();
})
.then((data) => {
    if (data.cod === "404") {
        // City not found, display an error message
        temperature.textContent = "";
        summary.textContent = "City Is Not Valid";
        loc.textContent = "";
        icon.innerHTML = "";
    } else {
        console.log(data);
        temperature.textContent =
            Math.floor(data.main.temp - kelvin) + "°C";
        summary.textContent = data.weather[0].description;
        loc.textContent = data.name + "," + data.sys.country;
        let icon1 = data.weather[0].icon;
        icon.innerHTML =
            `<img src="" style='height:10rem'/>`;
    }
})
.catch((error) => {
    // Handle network errors here
    console.error("Network error:", error);
});
});