import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div className="footer">
      <Link to="/alert" className="footer-link">Alerts</Link>
      <Link to="/geolocation" className="footer-link">Geolocation</Link>
      <Link to="/weather-alerts" className="footer-link">Weather Alerts</Link>
      <Link to="/evacuation-route" className="footer-link">Evacuation Route</Link>
      <Link to="/family-locator" className="footer-link">Family Locator</Link>
      <Link to="/chatbot" className="footer-link">Chatbot</Link>
    </div>
  );
};

export default Footer;
