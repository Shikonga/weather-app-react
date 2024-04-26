import React, { useState } from "react";
import axios from "axios";

export default function Header() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
 
  

  function handleSearch(event) {
    event.preventDefault();
    fetchWeatherData(city);
  }

  function showCity(event) {
    setCity(event.target.value);
  }

  

  let fetchWeatherData = (cityName) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=bf54175800a55e59e6c4d6461deeef12&units=metric`;
    axios.get(url).then(function (response) {
      setWeatherData(response.data);
    });
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name.."
          value={city}
          onChange={showCity}
        className="search-city-input"/>
        <button type="submit" className="button-search">Search</button>
      </form>

      {weatherData && (
        <div className="weather-app-data">
          <div>
            <h1 className="weather-app-city" id="showCity">
              {city} 🏙️
            </h1>
            <p className="weather-app-details">
              <span id="current-date-time">📅{new Date().toDateString()} 
              <br />
              🕛{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>{" "}
              <br />
              {weatherData.weather[0].description}
              <br />
              Humidity:{" "}
              <strong className="humidity">{weatherData.main.humidity}%</strong>,
              Wind:{" "}
              <strong className="wind">{weatherData.wind.speed} km/h</strong>
            </p>
          </div>
          <div className="temperature-input">
            <div className="weather-icon" id="weather-icon"></div>
            <div className="temp-value" id="current-temperature"></div>
            <div className="temp-unit">
             <sup>{Math.round(weatherData.main.temp)}°C</sup> 
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
