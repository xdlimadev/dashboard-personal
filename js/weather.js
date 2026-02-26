async function getDataWeather() {
    const city = localStorage.getItem("city");

    if (!city) {
        showCityModal();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/weather/get_weather.php?city=${encodeURIComponent(city)}`);
        const data = await response.json();

        if (response.ok) {
            updateWeatherUI(data);
        } else {
            console.error("Error al obtener datos del clima:", data.message);
            showCityModal();
        }
    } catch (error) {
        console.error("Error:", error);
        showCityModal();
    }
}

function requestLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                const response = await fetch(`${API_URL}/weather/get_weather.php?lat=${lat}&lon=${lon}`);
                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem("city", data.name);
                    hideCityModal();
                    getDataWeather();
                } else {
                    console.error("Error al obtener datos del clima");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }, (error) => {
            console.error("Error de geolocalización:", error);
            showToast("No se pudo obtener tu ubicación", "error");
        });
    }
}

function showCityModal() {
    const modal = document.getElementById("city-modal");
    if (modal) modal.style.display = "flex";
}

function hideCityModal() {
    const modal = document.getElementById("city-modal");
    if (modal) modal.style.display = "none";
}

function setupCityModal() {
    const saveCityBtn = document.getElementById("save-city-btn");
    const retryLocationBtn = document.getElementById("retry-location-btn");
    const cityInput = document.getElementById("city-input");
    const changeCityBtn = document.getElementById("change-city-btn");

    saveCityBtn.addEventListener("click", async () => {
        const cityName = cityInput.value.trim();

        if (!cityName) {
            showToast("Por favor, escribe una ciudad", "error");
            return;
        }

        localStorage.setItem("city", cityName);
        hideCityModal();
        cityInput.value = "";
        getDataWeather();
    });

    retryLocationBtn.addEventListener("click", () => {
        requestLocationWeather();
    });

    changeCityBtn.addEventListener("click", () => {
        showCityModal();
    });

    cityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            saveCityBtn.click();
        }
    });
}

function getWeatherIcon(weatherMain) {
    const icons = {
        'Clear': 'fa-sun',
        'Clouds': 'fa-cloud',
        'Rain': 'fa-cloud-rain',
        'Drizzle': 'fa-cloud-rain',
        'Thunderstorm': 'fa-bolt',
        'Snow': 'fa-snowflake',
        'Mist': 'fa-smog',
        'Smoke': 'fa-smog',
        'Haze': 'fa-smog',
        'Dust': 'fa-smog',
        'Fog': 'fa-smog',
        'Sand': 'fa-smog',
        'Ash': 'fa-smog',
        'Squall': 'fa-wind',
        'Tornado': 'fa-tornado'
    };
    return `fa-solid ${icons[weatherMain] || 'fa-cloud'}`;
}

function updateWeatherUI(data) {
    if (!data || !data.main) {
        console.error("Datos del clima no disponibles.");
        return;
    }

    const cityNameElem = document.getElementById("city-name");
    const weatherIcon = document.getElementById("weather-icon");
    const weatherTemp = document.getElementById("weather-temp");
    const weatherMinMax = document.getElementById("weather-min-max");
    const weatherHumidity = document.getElementById("weather-humidity");
    const weatherWind = document.getElementById("weather-wind");

    if (cityNameElem) cityNameElem.textContent = data.name.toUpperCase();
    if (weatherIcon) weatherIcon.innerHTML = `<i class="${getWeatherIcon(data.weather[0].main)}"></i>`;
    if (weatherTemp) weatherTemp.textContent = Math.round(data.main.temp) + "°C";
    if (weatherMinMax) weatherMinMax.textContent = + Math.round(data.main.temp_min) + "°C -" + Math.round(data.main.temp_max) + "°C";
    if (weatherHumidity) weatherHumidity.innerHTML = `<i class="fa-solid fa-droplet"></i> ${data.main.humidity}%`;
    if (weatherWind) weatherWind.innerHTML = `<i class="fa-solid fa-wind"></i> ${Math.round(data.wind.speed * 3.6)} km/h`;
}