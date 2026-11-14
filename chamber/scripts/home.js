// OpenWeatherMap API Key
const API_KEY = "d7910e6b480bed22c16d75e9af270699";
// Mobile Navigation
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});


// Footer Dates
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

currentYear.textContent = new Date().getFullYear();

lastModified.textContent = document.lastModified;


// Business Spotlights
const spotlightsContainer = document.querySelector("#spotlights-container");

async function displaySpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load business information.");
        }

        const data = await response.json();

        // Select Gold and Silver members only.
        const eligibleMembers = data.filter(member =>
            Number(member.membershipLevel) === 2 ||
            Number(member.membershipLevel) === 3
        );

        // Randomly select two or three businesses.
        const shuffledMembers = eligibleMembers.sort(
            () => Math.random() - 0.5
        );

        const numberToDisplay = Math.min(
            shuffledMembers.length,
            Math.floor(Math.random() * 2) + 2
        );

        const selectedMembers = shuffledMembers.slice(
            0,
            numberToDisplay
        );

        spotlightsContainer.innerHTML = "";

        selectedMembers.forEach(member => {
            const membership = Number(member.membershipLevel) === 3
                ? "Gold Member"
                : "Silver Member";

            const name = member.name || member.companyName;

            const card = document.createElement("article");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <h3>${name}</h3>

                <img
                    src="${member.image}"
                    alt="${name} logo"
                    loading="lazy"
                >

                <p><strong>Phone:</strong> ${member.phone}</p>

                <p><strong>Address:</strong> ${member.address}</p>

                <p><strong>Membership:</strong> ${membership}</p>

                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Website
                </a>
            `;

            spotlightsContainer.appendChild(card);
        });

    } catch (error) {
        spotlightsContainer.textContent =
            "Business spotlights are temporarily unavailable.";
    }
}

displaySpotlights();
// Lagos Weather
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=6.5244&lon=3.3792&units=metric&appid=${API_KEY}`;

const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=6.5244&lon=3.3792&units=metric&appid=${API_KEY}`;


// Display Current Weather
async function getCurrentWeather() {
    const temperatureElement = document.querySelector("#current-temperature");
    const descriptionElement = document.querySelector("#weather-description");

    try {
        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("Unable to retrieve current weather.");
        }

        const weatherData = await response.json();

        temperatureElement.textContent =
            `${Math.round(weatherData.main.temp)} °C`;

        descriptionElement.textContent =
            weatherData.weather[0].description;

    } catch (error) {
        temperatureElement.textContent = "Weather unavailable";
        descriptionElement.textContent = "Please try again later.";
    }
}


// Display Three-Day Forecast
async function getWeatherForecast() {
    const forecastContainer =
        document.querySelector("#forecast-container");

    try {
        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error("Unable to retrieve forecast.");
        }

        const forecastData = await response.json();

        const timezoneOffset = forecastData.city.timezone;

        const dailyForecasts = {};

        forecastData.list.forEach(item => {
            const localDate = new Date(
                (item.dt + timezoneOffset) * 1000
            );

            const dateKey = localDate.toISOString().split("T")[0];

            if (!dailyForecasts[dateKey]) {
                dailyForecasts[dateKey] = {
                    temperatures: [],
                    descriptions: [],
                    icons: [],
                    times: []
                };
            }

            dailyForecasts[dateKey].temperatures.push(item.main.temp);
            dailyForecasts[dateKey].descriptions.push(
                item.weather[0].description
            );
            dailyForecasts[dateKey].icons.push(item.weather[0].icon);
            dailyForecasts[dateKey].times.push(
                localDate.getUTCHours()
            );
        });

        const today = new Date(
            (Math.floor(Date.now() / 1000) + timezoneOffset) * 1000
        ).toISOString().split("T")[0];

        const forecastDates = Object.keys(dailyForecasts)
            .filter(date => date >= today)
            .slice(0, 3);

        forecastContainer.innerHTML = "";

        forecastDates.forEach(date => {
            const day = dailyForecasts[date];

            const averageIndex = day.times.findIndex(
                time => time >= 12
            );

            const descriptionIndex = averageIndex >= 0
                ? averageIndex
                : 0;

            const dateObject = new Date(`${date}T12:00:00Z`);

            const dayName = dateObject.toLocaleDateString(
                "en-NG",
                {
                    weekday: "long",
                    timeZone: "UTC"
                }
            );

            const maximum = Math.round(
                Math.max(...day.temperatures)
            );

            const minimum = Math.round(
                Math.min(...day.temperatures)
            );

            const card = document.createElement("article");
            card.classList.add("forecast-card");

            card.innerHTML = `
                <h4>${dayName}</h4>

                <p>${day.descriptions[descriptionIndex]}</p>

                <p>
                    High: ${maximum} °C
                    <br>
                    Low: ${minimum} °C
                </p>
            `;

            forecastContainer.appendChild(card);
        });

        if (forecastDates.length === 0) {
            forecastContainer.textContent =
                "Forecast information is unavailable.";
        }

    } catch (error) {
        forecastContainer.textContent =
            "Unable to load the weather forecast.";
    }
}


// Run Weather Functions
getCurrentWeather();
getWeatherForecast();