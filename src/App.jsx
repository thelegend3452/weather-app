import './App.css'
import { useState } from "react"
import axios from "axios"

function App() {
    const [city, setCity] = useState("")
    const [weather, setWeather] = useState(null)
    const [forecast, setForecast] = useState(null)

    const API_KEY = "74804ec2b7a39fd1507c40f8312f7441"

    const weatherapi = async (cityName) => {
        try {
            const weatherfetch = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
            );

            const forecastfetch = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}/daily&appid=${API_KEY}&units=metric`
            );

            setWeather(weatherfetch.data);
            setForecast(forecastfetch.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };


    const handleSearch = (e) => {
        if (e.key === "Enter") {
            weatherapi(city)
        }
    }

    return (
        <div className="wrapper">
            <input
                className="searchbar"
                placeholder="City..."
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleSearch}
            />

            {weather && (
                <div className="header">
                    <h1 className="city">{weather.name}</h1>
                    <p className="temperature">{Math.round(weather.main.temp)} °C</p>
                    <p>{weather.weather[0].description.toUpperCase()}</p>
                </div>
            )}

            {weather && (
                <div className="weather">
                    <div>
                        <p className="humidity-header"> Humidity</p>
                        <p className="humidity-text">{weather.main.humidity}%</p>
                    </div>
                    <div>
                        <p className="wind-speed-header">Wind-Speed</p>
                        <p className="wind-speed-text">{weather.wind.speed} km/h</p>
                    </div>
                </div>
            )}

            {forecast && (
                <div className="forecast">
                    <h2 className="forecast-header">Forecast</h2>
                    <div className="forecast-days">
                        {forecast.list.slice(0, 5).map((item, index) => (
                            <div key={index} className="forecast-day">
                                <p>{new Date(item.dt_txt).toLocaleDateString("en-US", {weekday: "long"})}</p>

                                <p>{Math.round(item.main.temp)} °C</p>
                                <p>{item.weather[0].main}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
