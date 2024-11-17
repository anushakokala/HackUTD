import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Geolocation from './components/Geolocation';
import WeatherAlerts from './components/WeatherAlerts';
import EvacuationRoute from './components/EvacuationRoute';
import FamilyLocator from './components/FamilyLocator';
import Chatbot from './components/Chatbot';
import Alert from './components/Alert';
import Login from './components/login';
import Footer from './components/Footer'; // Import Footer

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login

  const handleLogin = () => {
    setIsLoggedIn(true); // Simulate successful login
  };

  return (
    <Router>
      <div className="app-container">
        {!isLoggedIn ? (
          // Show Login if not logged in
          <Login onLogin={handleLogin} />
        ) : (
          <Container>
            <h1>Disaster Alert</h1>
            <div className="main-content">
              {/* Define routes for each page */}
              <Routes>
                <Route path="/" element={<Navigate to="/alert" />} /> {/* Default redirect */}
                <Route path="/alert" element={<Alert />} />
                <Route path="/geolocation" element={<Geolocation />} />
                <Route path="/weather-alerts" element={<WeatherAlerts />} />
                <Route path="/evacuation-route" element={<EvacuationRoute />} />
                <Route path="/family-locator" element={<FamilyLocator />} />
                <Route path="/chatbot" element={<Chatbot />} />
              </Routes>
            </div>
            {/* Add Footer component */}
            <Footer />
          </Container>
        )}
      </div>
    </Router>
  );
}

export default App;
