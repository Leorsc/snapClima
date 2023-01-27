const citySearchInput = document.querySelector('#city-search-input');
const citySearchButton = document.querySelector('#city-search-button');

const currentDate = document.querySelector('#current-date');
const currentName = document.querySelector('#city-name');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDescription = document.querySelector('#weather-description');
const currentTemperature = document.querySelector('#current-temperature');
const windSpeed = document.querySelector('#wind-speed');
const feelsLikeTemperature = document.querySelector('#feels-like-temperature');
const currentHumidity = document.querySelector('#current-humidity');
const sunriseTime = document.querySelector('#sunrise-time');
const sunsetTime = document.querySelector('#sunset-time');

const api_key = "cda60b258f012f1a559e766973f0296a";

citySearchButton.addEventListener('click', () => {
    let cityName = citySearchInput.value;
    getCityWeather(cityName);
})

navigator.geolocation.getCurrentPosition(
    (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        getCurrentLocationWeather(lat, lon)
    },
    (error) => {
        if (error.code === 1) {
            alert("Geolocalização negada pelo usuário, busque manualmente por uma cidade através da barra de pesquisa.");
        } else {
            console.log(error);
        }
    }
)

function getCityWeather(cityName) {
    weatherIcon.src = `./assets/loading-icon.svg`

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((resp) => resp.json())
        .then((data) => displayWeather(data))
}

function getCurrentLocationWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((resp) => resp.json())
        .then((data) => displayWeather(data))
}


function displayWeather(data) {
    let { dt,
        name,
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset } } = data

    currentDate.textContent = formatdate(dt);
    currentName.textContent = name;
    weatherIcon.src = `./assets/${icon}.svg`

    weatherDescription.textContent = description;
    currentTemperature.textContent = `${Math.round(temp)}°C`;
    windSpeed.textContent = `${Math.round(speed * 3.6)}km`;
    feelsLikeTemperature.textContent = `${Math.round(feels_like)}°C`;
    currentHumidity.textContent = `${humidity}%`;
    sunriseTime.textContent = formatTime(sunrise);
    sunsetTime.textContent = formatTime(sunset);
}

function formatdate(epochTime) {
    let date = new Date(epochTime * 1000);
    let formattedDate = date.toLocaleDateString('pt-BR', { month: 'long', day: 'numeric' })

    return `Hoje, ${formattedDate}`
}

function formatTime(epochTime) {
    let date = new Date(epochTime * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return `${hours}:${minutes}`;
}