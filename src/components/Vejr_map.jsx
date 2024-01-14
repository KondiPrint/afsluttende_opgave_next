import L from 'leaflet';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

export default function Vejr_Map({ coord = [56, 10], zoom = '13', info = '', setLat, setLon }) {
  // reference/krog til map'et.
  const mapRef = useRef();

  // Reference til markøren - så den kan flyttes rundt.
  const markerRef = useRef();

  // Indlæs map/kort når component er klar.
  useEffect(() => {
    // Lav kortet - skal kun køre 1 gang (når komponent bliver loadet).
    if (!mapRef.current) {
      mapRef.current = L.map('map_container').setView(coord, zoom);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);

      // Laver markøren.
      markerRef.current = L.marker(coord).addTo(mapRef.current);
      if (info !== '') {
        markerRef.current.bindPopup(info);
      }
    } else {
      // Flyt view på kortet, så fokus er på de nye koordinater.
      mapRef.current.setView(coord, zoom);

      // Flytter markøren.
      markerRef.current.setLatLng(coord);

      if (info !== '') {
        markerRef.current.bindPopup(info);
      }

      if (setLat || setLon) {
        mapRef.current.on('click', (e) => {
          setLat(e.latlng.lat);
          setLon(e.latlng.lng);
        });
      }
    }
  }, [coord]); // Lytter efter ændringer i koordinaterne.

  return (
    <div id='map_container' className='m-auto mt-6 rounded-md shadow-xl w-full h-[364px] md:h-[728px] capitalize'>
      Kortet loader ...
    </div>
  );
}
