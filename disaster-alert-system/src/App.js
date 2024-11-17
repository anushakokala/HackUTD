import './App.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import Geolocation from './components/Geolocation';
import WeatherAlerts from './components/WeatherAlerts';
import EvacuationRoute from './components/EvacuationRoute';
import FamilyLocator from './components/FamilyLocator';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Container>
      <h1>Disaster Alert</h1>
      <Geolocation />
      <WeatherAlerts />
      <EvacuationRoute />
      <FamilyLocator />
      <Chatbot />
    </Container>
  );
}

export default App;
