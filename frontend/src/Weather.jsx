import { useState } from 'react';
import { ClearIcon, CloudIcon, RainIcon, SnowIcon, MistIcon } from './components/WeatherIcons';

function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const API_KEY = '1137b67fbe2a4f8466bad32213b37b6f';

    const handleSearch = async () => {
        if (city === '') return;
        
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            const data = await response.json();
            
            if (data.cod === "404") {
                setError("City not found");
                setWeather(null);
                return;
            }

            setError(null);
            setWeather(data);
        } catch (err) {
            setError("Error fetching weather data");
            setWeather(null);
        }
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
            <div className="search-box">
                <input 
                    type="text" 
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {error && (
                <div className="not-found fade-in">
                    <p>{error}</p>
                </div>
            )}

            {weather && (
                <>
                    <div className="weather-box">
                        {getWeatherIcon(weather.weather[0].main)}
                        <div className="temp">{Math.round(weather.main.temp - 273.15)}°C</div>
                        <div className="desc">{weather.weather[0].description}</div>
                    </div>

                    <div className="weather-details">
                        <div className="humidity">
                            <span>{weather.main.humidity}%</span>
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            <span>{weather.wind.speed} km/h</span>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Weather;