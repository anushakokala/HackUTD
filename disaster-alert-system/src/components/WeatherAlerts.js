import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const WeatherAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError("Unable to retrieve your location. Please enable location services.");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;

      fetch(`https://api.weather.gov/alerts?point=${latitude},${longitude}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.features && data.features.length > 0) {
            setAlerts(data.features);
          } else {
            setAlerts([]);
            setError("No weather alerts available at this location.");
          }
        })
        .catch((err) => {
          setError("Unable to fetch weather alerts.");
          console.error(err);
        });

      // Fetch temperature
      fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.properties && data.properties.forecastHourly) {
            const forecastUrl = data.properties.forecastHourly;
            return fetch(forecastUrl);
          } else {
            throw new Error("Temperature data is unavailable.");
          }
        })
        .then((response) => response.json())
        .then((forecastData) => {
          if (forecastData.properties && forecastData.properties.periods) {
            setTemperature(forecastData.properties.periods[0].temperature);
          } else {
            throw new Error("Unable to parse temperature data.");
          }
        })
        .catch((err) => {
          setError("Unable to fetch temperature data.");
          console.error(err);
        });
    }
  }, [location]);

  return (
    <div>
      <h2>Weather Information</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {location && (
        <p>
          <strong>Your Location:</strong> Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}

      {temperature !== null && (
        <p>
          <strong>Current Temperature:</strong> {temperature}°F
        </p>
      )}

      {alerts.length > 0 ? (
        <>
          <h3>Active Emergncy Alerts</h3>
          <ListGroup>
            {alerts.map((alert, index) => (
              <ListGroup.Item key={index}>
                <strong>{alert.properties.event}</strong>
                <p>{alert.properties.headline}</p>
                <p>{alert.properties.description}</p>
                <p>
                  <strong>Effective:</strong> {new Date(alert.properties.effective).toLocaleString()} <br />
                  <strong>Expires:</strong> {new Date(alert.properties.expires).toLocaleString()}
                </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        !error && <p>No active weather alerts at this time.</p>
      )}
    </div>
  );
};

export default WeatherAlerts;
