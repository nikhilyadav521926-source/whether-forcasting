
const API_KEY = "YOUR_API_KEY";

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const message = document.getElementById("message");

    if (!city) {
        message.textContent = "Please enter a city name.";
        return;
    }

    if (API_KEY === "YOUR_API_KEY") {
        message.textContent =
            "Please add your OpenWeatherMap API key in script.js.";
        return;
    }

    message.textContent = "Loading weather...";

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "City not found.");
        }

        document.getElementById("cityName").textContent =
            data.name + ", " + data.sys.country;

        document.getElementById("temp").textContent =
            Math.round(data.main.temp) + " °C";

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            data.main.humidity + "%";

        document.getElementById("wind").textContent =
            data.wind.speed + " m/s";

        document.getElementById("icon").textContent =
            getWeatherEmoji(data.weather[0].main);

        message.textContent = "";

    } catch (error) {
        message.textContent = error.message;
    }
}

function getWeatherEmoji(condition) {
    const icons = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️",
        Fog: "🌫️",
        Haze: "🌫️"
    };

    return icons[condition] || "🌤️";
}

document.getElementById("city").addEventListener("keydown", event => {
    if (event.key === "Enter") {
        getWeather();
    }
});
