import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherAlerts = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const WEATHER_API_KEY = "91393038bb1447b6cf5c917555f4737a"; // API key

  // Get user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLocation({ latitude: 37.7749, longitude: -122.4194 }); // San Francisco as fallback
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=hourly,minutely&appid=${WEATHER_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data && data.current) {
            setWeatherData(data);
          } else {
            setError("Weather data is unavailable.");
          }
        })
        .catch((err) => {
          setError("Unable to fetch weather data.");
          console.error(err);
        });
    }
  }, [location]);

  return (
    <div>
      <h2>Weather Information</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {location && (
        <>
          <p>
            <strong>Your Location:</strong> Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>

        </>
      )}

      {weatherData ? (
        <>
          <h3>Current Weather</h3>
          {weatherData.current ? (
            <p>
              <strong>Temperature:</strong> {weatherData.current.temp}°C <br />
              <strong>Weather:</strong> {weatherData.current.weather[0]?.description} <br />
              <strong>Humidity:</strong> {weatherData.current.humidity}% <br />
              <strong>Wind Speed:</strong> {weatherData.current.wind_speed} m/s
            </p>
          ) : (
            <p>Loading current weather data...</p>
          )}
          {weatherData.alerts && weatherData.alerts.length > 0 ? (
            <>
              <h3>Weather Alerts</h3>
              <ListGroup>
                {weatherData.alerts.map((alert, index) => (
                  <ListGroup.Item key={index}>
                    <strong>{alert.event}</strong>: {alert.description}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          ) : (
            <p>No weather alerts at the moment.</p>
          )}
        </>
      ) : (
        !error && <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherAlerts;
