// 🔥 IMP: Ithe tujhi OpenWeatherMap chi API Key tak
const apiKey = "7d25eb6cb0c58bac6ae08f1ff888bbc4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-btn");
const locationBtn = document.querySelector(".location-btn");
const weatherIcon = document.querySelector(".weather-icon");

// Function to check weather by City Name
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        // Update Text
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update Images based on Weather Condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3076/3076129.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Function to get User's Current Location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async(position) => {
                const { latitude, longitude } = position.coords;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

                const response = await fetch(url);
                const data = await response.json();
                checkWeather(data.name); // Call main function with detected city name
            },
            (error) => {
                alert("Location access denied! Please enable location.");
            });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

locationBtn.addEventListener("click", () => {
    getUserLocation();
});

// Enter key support
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});