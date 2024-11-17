import React, { useEffect, useRef } from 'react';
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

  const position = [32.9854637, -96.7515475]; 
  const destination = [32.99157635827321, -96.74560924377094]; 

  useEffect(() => {

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

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
};

export default EvacuationRoute;
