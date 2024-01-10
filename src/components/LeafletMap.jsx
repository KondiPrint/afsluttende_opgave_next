import L from 'leaflet';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
/* import icon from 'leaflet/dist/images/marker-icon.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [64, 64], //[ 24, 36 ],
  iconAnchor: [12, 36],
});
L.Marker.prototype.options.icon = DefaultIcon; */

const LeafletMap = ({ coord }) => {
  // reference/krog til map'et.
  const mapRef = useRef();

  // Reference til markøren - så den kan flyttes.
  //? const markerRef = useRef();

  // Indlæs map/kort når component er klar.
  useEffect(() => {
    // Lav kortet - skal kun køre 1 gang (når komponent bliver loadet).
    if (!mapRef.current) {
      mapRef.current = L.map('map_container').setView(coord, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);

      // Laver markøren.
      //?markerRef.current = L.marker(coord).addTo(mapRef.current);
    } else {
      // Flyt view på kortet, så fokus er på de nye koordinater.
      mapRef.current.setView(coord, 13);

      // Flytter markøren.
      //? markerRef.current.setLatLng(coord);
    }
  }, [coord]); // Lytter efter ændringer i koordinaterne.

  return (
    <div id='map_container' style={{ width: '500px', height: '500px' }} className='m-auto mt-6 rounded-md'>
      The map is loading ...
    </div>
  );
};
export default LeafletMap;
