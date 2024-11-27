// src/components/WeatherApp.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import './WeatherApp.css';

// List of locations
const locations = [
  { name: "Ho Chi Minh", city: "Ho Chi Minh" },
  { name: "Singapore", city: "Singapore" },
  { name: "Kuala Lumpur", city: "Kuala Lumpur" },
  { name: "Tokyo", city: "Tokyo" },
  { name: "Athens", city: "Athens" }
];

const WeatherApp = () => {
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('city') || 'Ho Chi Minh');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [days, setDays] = useState(3);

  // Fetch weather data based on selected city
  const fetchWeatherData = async () => {
    const apiKey = "56fb61859a1f69561e8473551918f518";
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&cnt=${days}&appid=${apiKey}&units=metric`;

    try {
     
      const weatherResponse = await axios.get(currentWeatherUrl);
      setWeatherData(weatherResponse.data);

     
      const forecastResponse = await axios.get(forecastUrl);
      setForecastData(forecastResponse.data.list);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    localStorage.setItem("city", selectedCity); 
  }, [selectedCity, days]);

  return (
    <div className="weather-app">
      <h1>Weather Forecast</h1>
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        {locations.map((location, index) => (
          <option key={index} value={location.city}>
            {location.name}
          </option>
        ))}
      </select>

      <div className="days-config">
        <label htmlFor="days">Forecast Days:</label>
        <input
          type="number"
          id="days"
          value={days}
          onChange={(e) => setDays(Math.max(1, e.target.value))}
        />
      </div>

      {weatherData && (
        <WeatherCard
            city={weatherData.name}
            temperature={weatherData.main.temp}
            description={weatherData.weather[0].description}
            icon={weatherData.weather[0].icon}
        />
        )}

            <div className="forecast">
            {forecastData.map((forecast, index) => (
                <WeatherCard
                key={index}
                city={selectedCity}
                temperature={forecast.main.temp}
                description={forecast.weather[0].description}
                icon={forecast.weather[0].icon}
                />
            ))}
            </div>
    </div>
  );
};

export default WeatherApp;
