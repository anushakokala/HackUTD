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
    <div style={styles.container}>
      <h2 style={styles.header}>Weather Information</h2>

      {error && <p style={styles.error}>{error}</p>}

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
          <h3 style={styles.alertsTitle}>Active Emergency Alerts</h3>
          <ListGroup>
            {alerts.map((alert, index) => (
              <ListGroup.Item key={index} style={styles.listItem}>
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

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#ffff', // Light pink background
    border: '1px solid #f2c6d7', // Light pink border
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#d81b60', // Deep pink color
    borderBottom: '2px solid #d81b60',
    paddingBottom: '10px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  error: {
    color: '#e91e63', // Strong pink for errors
    textAlign: 'center',
    marginBottom: '20px',
  },
  alertsTitle: {
    color: '#d81b60', // Deep pink for the alerts section
    marginBottom: '15px',
    textAlign: 'center',
  },
  listItem: {
    backgroundColor: '#ffff', // Light pink background for each alert
    border: '1px solid #fffff', // Subtle darker pink border
    borderRadius: '8px',
    marginBottom: '10px',
  },
};

export default WeatherAlerts;
