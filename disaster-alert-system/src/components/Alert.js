import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Alert = () => {
  return (
    <div className="alert-container">
      {/* Header section */}
      <div className="header">
        <span className="icons">
          {/* You can keep the icons if needed */}
        </span>
      </div>

      {/* Alert content */}
      <div className="content">
        <div className="welcome-box">Welcome!</div>

        {/* First alert box */}
        <div className="alert-box">
          <div className="alert-header">
            Tornado Approaching!
            <button className="close-button">×</button>  {/* Close button */}
          </div>
          <p className="alert-text">
            A tornado is in close proximity within your location. Please take
            shelter immediately.
          </p>
          <button className="dismiss-button">Dismiss</button>  {/* Dismiss button */}
        </div>

        {/* Second alert box */}
        <div className="alert-box">
          <div className="alert-header">
            Take Shelter Now!
            <button className="close-button">×</button>  {/* Close button */}
          </div>
          <button className="dismiss-button">Dismiss</button>  {/* Dismiss button */}
        </div>
      </div>

      {/* Footer section (fixed navigation bar with text links) */}
      <div className="footer">
        <Link to="/Geolocation" className="footer-link">Current Location</Link>
        <Link to="/EvacuationRouteGMap" className="footer-link">Evacuation Routes</Link>
        <Link to="/Chatbot" className="footer-link">Chatbot</Link>
        <Link to="/FamilyLocator" className="footer-link">Family Locator</Link>
        
      </div>
    </div>
  );
};

export default Alert;
