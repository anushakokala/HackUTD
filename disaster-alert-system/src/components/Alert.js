import React, { useState } from "react";
import { Link } from "react-router-dom";

const Alert = () => {
  // State to manage visibility of each alert box
  const [isFirstAlertVisible, setIsFirstAlertVisible] = useState(true);
  const [isSecondAlertVisible, setIsSecondAlertVisible] = useState(true);

  // Handlers to dismiss each alert
  const dismissFirstAlert = () => setIsFirstAlertVisible(false);
  const dismissSecondAlert = () => setIsSecondAlertVisible(false);

  return (
    <div className="alert-container">
      {/* Header section */}
      

      {/* Alert content */}
      <div className="content">
        <div className="welcome-box">Welcome!</div>

        {/* First alert box */}
        {isFirstAlertVisible && (
          <div className="alert-box">
            <div className="alert-header">
              Tornado Approaching!
              <button className="close-button" onClick={dismissFirstAlert}>
                ×
              </button>
            </div>
            <p className="alert-text">
              A tornado is in close proximity within your location. Please take
              shelter immediately.
            </p>
            <button className="dismiss-button" onClick={dismissFirstAlert}>
              Dismiss
            </button>
          </div>
        )}

        {/* Second alert box */}
        {isSecondAlertVisible && (
          <div className="alert-box">
            <div className="alert-header">
              Take Shelter Now!
              <button className="close-button" onClick={dismissSecondAlert}>
                ×
              </button>
            </div>
            <button className="dismiss-button" onClick={dismissSecondAlert}>
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Footer section (fixed navigation bar with text links) */}
      <div className="footer">
        <Link to="/Geolocation" className="footer-link">
          Current Location
        </Link>
        <Link to="/EvacuationRouteGMap" className="footer-link">
          Evacuation Routes
        </Link>
        <Link to="/Chatbot" className="footer-link">
          Chatbot
        </Link>
        <Link to="/FamilyLocator" className="footer-link">
          Family Locator
        </Link>
      </div>
    </div>
  );
};

export default Alert;
