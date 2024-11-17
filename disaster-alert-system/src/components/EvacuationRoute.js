import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const EvacuationRoute = () => {
  const mapRef = useRef(null); 
  const routingControlRef = useRef(null);
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [loading, setLoading] = useState(true);  // Track loading state

  const position = [32.9854637, -96.7515475]; 
  const destination = [32.99157635827321, -96.74560924377094]; 

  useEffect(() => {
    // Set up the Leaflet map
    const map = L.map('map').setView(position, 13);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.marker(position).addTo(map).bindPopup('Current Location').openPopup();
    L.marker(destination).addTo(map).bindPopup('Destination Point - UTD Police Department');

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(position), L.latLng(destination)],
      routeWhileDragging: true,
    }).addTo(map);
    routingControlRef.current = routingControl;

    // Fetch optimized route from the SambaNova API
    fetchOptimizedRoute();

    return () => {
      if (routingControlRef.current) {
        routingControlRef.current.getPlan().setWaypoints([]);
        map.removeControl(routingControlRef.current);
      }
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
      }
    };
  }, [position, destination]);

  // Function to fetch the optimized route from the SambaNova API
  const fetchOptimizedRoute = async () => {
    const waypoints = [
      [32.9855, -96.7488], // Origin (UTD Location)
      [32.9916, -96.7456], // Destination (UTD Police Department)
      // Add more waypoints here if needed
    ];

    const dataToSend = {
      waypoints: waypoints,
      origin: waypoints[0],
      destination: waypoints[1],
      parameters: {
        avoid_disaster_zone: true,
        time_sensitive: true
      }
    };

    try {
      const response = await fetch('https://api.sambanova.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 8202d9b3-560f-4201-84e1-ff0d2cf0861e', // API Key
        },
        body: JSON.stringify({
          model: 'Meta-Llama-3.1-405B-Instruct',
          messages: [
            { role: 'system', content: 'Provide the optimized route in coordinates format: [[lat1, lon1], [lat2, lon2], ...].' },
            { role: 'user', content: JSON.stringify(dataToSend) }
          ],
          stream: false
        })
      });

      const data = await response.json();
      console.log('Full AI Response:', data); // Output the full response from the AI

      if (data && data.choices && data.choices[0].message.content) {
        // Extracting coordinates in the specified format
        const optimizedRoute = data.choices[0].message.content.match(/\[\d+\.\d+,\s*-?\d+\.\d+\]/g); // Match coordinates pairs

        if (optimizedRoute) {
          setOptimizedRoute(optimizedRoute.join(', ')); // Join the coordinates as a string
        } else {
          console.error('Error: No coordinates found in the response');
        }
      } else {
        console.error('Error: No valid route data received');
      }

    } catch (error) {
      console.error('Error fetching optimized route:', error);
    }

    setLoading(false); // Set loading to false once the request is complete
};



  return (
    <div>
      <div id="map" style={{ height: '400px', width: '800px' }} />
      <div style={{ marginTop: '20px', fontSize: '16px' }}>
        <strong>Optimized Path According to SambaNova:</strong>
        {loading ? (
          <p>Loading optimized route...</p>
        ) : (
          <pre>{optimizedRoute || 'No optimized route data available.'}</pre>
        )}
      </div>
    </div>
  );
};

export default EvacuationRoute;
