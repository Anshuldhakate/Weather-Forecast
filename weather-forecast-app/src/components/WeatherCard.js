
import React from "react";
import './WeatherCard.css'

const WeatherCard = ({ city, temperature, description, icon }) => {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        style={{ width: "80px", height: "80px" }}
      />
      <p>{description.charAt(0).toUpperCase() + description.slice(1)}</p>
      <p>{temperature}°C</p>
    </div>
  );
};

export default WeatherCard;
