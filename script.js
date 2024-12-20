// General function for the entire website
function getWeather() {
    const apiKey = "b617d73150fbfc54c01718326a980fae";
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city!");
        return;
    }

    const currentWeatherUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
    const forecastUrl = `http://api.weatherstack.com/forecast?access_key=${apiKey}&query=${city}`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error.info);
            }
            console.log("Current weather data:", data);
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching current weather data:", error);
            alert("Error fetching current weather data. Please try again!");
        });

    // Fetch forecast
    fetch(forecastUrl)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error.info);
            }
            console.log("Forecast data:", data);
            displayDailyForecast(data.forecast); // Pass the forecast object to the displayDailyForecast function
        })
}

// Displaying the current weather
function displayWeather(data) {
    console.log("Data received:", data);
    const tempDivInfo = document.getElementById("temp-div");
    const weatherInfoDiv = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("weather-icon");

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    

    // Extract Weatherstack current weather data
    const cityName = data.location.name;
    const temperature = data.current.temperature; // Already in Celsius
    const description = data.current.weather_descriptions[0];
    const iconUrl = data.current.weather_icons[0];

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHtml = `<p>${cityName}</p><p>${description}</p>`;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
}

// Displaying the daily forecast (for WeatherStack API free plan)
function displayDailyForecast(forecastData) {
    const forecastDiv = document.getElementById('hourly-forecast');
    

    // Loop through the forecast object (daily data)
    for (const date in forecastData) {
        const dayData = forecastData[date];
        const maxTemp = dayData.maxtemp;
        const minTemp = dayData.mintemp;
        const sunrise = dayData.astro.sunrise;
        const sunset = dayData.astro.sunset;

        const forecastHTML = `
            <div class="daily-forecast">
                <h4>${date}</h4>
                <p>Max Temp: ${maxTemp}°C</p>
                <p>Min Temp: ${minTemp}°C</p>
                <p>Sunrise: ${sunrise}</p>
                <p>Sunset: ${sunset}</p>
            </div>
`;

        
    }
}

// Function to show weather icon
function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}
