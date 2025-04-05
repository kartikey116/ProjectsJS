const apikey = "93ef3a8d39473047e2e4f3d3d0a1e2c1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#city");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather_icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        
        if (response.status === 404) {
            alert("City not found!");
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".Wind").innerHTML = data.wind.speed + " km/hr";


        const weatherCondition = data.weather[0].main.toLowerCase();
        switch(weatherCondition) {
            case "clouds":
                weatherIcon.src = "clouds.png";
                break;
            case "clear":
                weatherIcon.src = "clear.png";
                break;
            case "rain":
                weatherIcon.src = "rain.png";
                break;
            case "drizzle":
                weatherIcon.src = "drizzle.png";
                break;
            case "mist":
                weatherIcon.src = "mist.png";
                break;
            case "snow":
                weatherIcon.src = "snow.png";
                break;
            default:
                weatherIcon.src = "clear.png";
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching weather data");
    }
}


searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});


searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        } else {
            alert("Please enter a city name");
        }
    }
});


checkWeather("New York");