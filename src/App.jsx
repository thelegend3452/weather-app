import './App.css'
import { useState} from "react"
import axios from "axios"


import cloudyimg from './assets/images/brokenclouds.png'
import clearimg from './assets/images/sun.png'
import rainimg from './assets/images/rain.png'
import snowimg from './assets/images/snow.png'
import scattered from './assets/images/scattered.png'
import lightrain from './assets/images/lightrain.png'
import searchicon from './assets/images/earth.png'

function App() {
    const [city, setCity] = useState('Oslo')
    const [weather, setWeather] = useState(null)
    const [forecast, setForecast] = useState(null)
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState(true)

    const API_KEY = "74804ec2b7a39fd1507c40f8312f7441"


        const weatherapi = async (cityName) => {
            setLoading(true)
            try {
                const weatherfetch = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
                );

                const forecastfetch = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
                );

                setWeather(weatherfetch.data);
                setForecast(forecastfetch.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            } finally {
                 setLoading(false)
            }

        };


    const handleSearch = (e) => {
        if (e.key === "Enter") {
            weatherapi(city)
        }
    }


    const handleblur = () => {
        setIsActive(false)
    }
    const handlefocus = () => {
        setIsActive(true)
    }
    const changeweather = {
        'Rain': rainimg,
        'clear sky' : clearimg,
        'Snow': snowimg,
        'scattered clouds' : scattered,
        'light rain': lightrain,
    }

    const changeforecast = {
        'Clouds' : cloudyimg,
        'Rain': rainimg,
        'Clear' : clearimg,
        'Snow': snowimg,
    }

    return (
        <div className="wrapper">
            <div className={`search-container ${isActive ? 'active' : ''}`}>
                <input
                    className="searchbar"
                    placeholder="City..."
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleSearch}
                    onFocus={handlefocus}
                    onBlur={handleblur}
                />
                <div className="magnifying-glass">
                    <img src={searchicon} alt="search icon" />
                </div>
            </div>


            {weather && (
                <div className="header">
                    <h1 className="city">{weather.name}</h1>
                    <p className="temperature">{Math.round(weather.main.temp)} °C</p>
                    <img className="imageweather" src ={changeweather[weather.weather[0].description] || './assets/images/default.png'} alt={weather.weather[0].description} />
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
                        <p className="wind-speed-text">{(weather.wind.speed / 3.6).toFixed(2)} m/s</p>
                    </div>
                </div>
            )}

            {forecast && (
                <div className="forecast">
                    <p className="today">{new Date().toLocaleDateString('en-US', {weekday: 'long'})}</p>
                    <h2 className="forecast-header">Hourly</h2>
                    <div className="forecast-days">
                        {forecast.list.slice(0, 5).map((item, index) => (
                            <div key={index} className="forecast-hour">
                                <p>
                                    {new Date(item.dt_txt).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    })}
                                </p>
                                <p>{Math.round(item.main.temp)} °C</p>
                            </div>
                        ))}
                    </div>
                    <div className="forecast">
                        <h2 className="forecast-header">Forecast</h2>
                        <div className="forecast-days">
                            {forecast.list.filter(item => item.dt_txt.includes("12:00:00")).map((item, index) => (
                                <div key={index} className="forecast-day">
                                    <p>{new Date(item.dt_txt).toLocaleDateString("en-US", {weekday: "long"})}</p>
                                    <p>{Math.round(item.main.temp)} °C</p>
                                    <img src={changeforecast[item.weather[0].main] || './assets/images/default.png'}
                                         alt={item.weather[0].main}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
