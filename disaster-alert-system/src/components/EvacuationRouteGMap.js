import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

function EvacuationRoute() {
  const [directions, setDirections] = useState(null);
  const origin = { lat: 37.7749, lng: -122.4194 };
  const destination = { lat: 34.0522, lng: -118.2437 };

  const directionsCallback = (response) => {
    if (response !== null && response.status === 'OK') {
      setDirections(response);
    }
  };

  return (
    <div>
      <h2>Evacuation Route</h2>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap mapContainerStyle={containerStyle} center={origin} zoom={7}>
          <DirectionsService
            options={{
              origin: origin,
              destination: destination,
              travelMode: 'DRIVING',
            }}
            callback={directionsCallback}
          />
          {directions && <DirectionsRenderer options={{ directions }} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default EvacuationRoute;
