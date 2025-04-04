
import './Weather.css';
import React, { useState, useEffect } from 'react';
import { ClearIcon, CloudIcon, RainIcon, SnowIcon, MistIcon } from './WeatherIcons';
import SearchIcon from '@mui/icons-material/Search';


function Weather({ userId }) {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const API_KEY = '1137b67fbe2a4f8466bad32213b37b6f'; 

    // Load saved city for user
    useEffect(() => {
        const savedCity = localStorage.getItem(`weather_city_${userId}`);
        if (savedCity) {
            setCity(savedCity);
            fetchWeather(savedCity);
        }
    }, [userId]);

    const fetchWeather = async (cityName) => {
        if (!cityName) {
            setError('Please enter a city name');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`
            );

            if (!response.ok) {
                throw new Error('Invalid Location');
            }

            const data = await response.json();
            setWeather(data);
            setError('');

            localStorage.setItem(`weather_city_${userId}`, cityName);
        } catch (err) {
            setError(err.message);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather(city);
    };

    const getWeatherIcon = (weatherMain) => {
        switch (weatherMain) {
            case "Clear":
                return <ClearIcon />;
            case "Rain":
                return <RainIcon />;
            case "Snow":
                return <SnowIcon />;
            case "Clouds":
                return <CloudIcon />;
            case "Mist":
            case "Haze":
                return <MistIcon />;
            default:
                return <CloudIcon />;
        }
    };

    return (
        <div className="weather-container">
            <h2>Weather</h2>
            <form onSubmit={handleSubmit} className="search-box">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <button type="submit">{<SearchIcon />}</button>
            </form>

            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <div className="weather-box">
                        {getWeatherIcon(weather.weather[0].main)}
                        <div className="temp">{Math.round(weather.main.temp)}°F</div>
                        <div className="desc">{weather.weather[0].description}</div>
                    </div>
                    <div className="weather-details">
                        <div className="humidity">
                            <span>{weather.main.humidity}%</span>
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            <span>{weather.wind.speed} mph</span>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;