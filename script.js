document.getElementById('searchButton').addEventListener('click', function() {
    const apiKey = 'f9b40037adb18b9aec9832c9b88f7b19'; 
    const city = document.getElementById('cityInput').value;
    
    if (city) {
        fetchWeatherData(city, apiKey);
    }
});

async function fetchWeatherData(city, apiKey) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        console.error(error);
        alert('Unable to fetch weather data. Please check the city name or try again later.');
    }
}

function updateWeatherInfo(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const tempLow = data.main.temp_min;
    const tempHigh = data.main.temp_max;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    const rainChance = data.rain ? data.rain['1h'] : 0; 

    document.getElementById('cityName').innerText = cityName;
    document.getElementById('temperature').innerHTML = `${Math.round(temperature)}<span>°F</span>`;
    document.getElementById('weatherDescription').innerText = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    document.getElementById('temperatureRange').innerText = `Low: ${Math.round(tempLow)}°F | High: ${Math.round(tempHigh)}°F`;
    document.getElementById('windSpeed').innerText = `${Math.round(windSpeed)} mph`;
    document.getElementById('humidityLevel').innerText = `${Math.round(humidity)}%`;
    document.getElementById('rainChance').innerText = `${Math.round(rainChance * 100)}%`; 
}
