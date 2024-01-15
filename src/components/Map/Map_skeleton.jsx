import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useEffect, useRef } from 'react';

function MapSkeleton({ coord = [56, 10], zoom = '13', info = '', setLat = null, setLon = null }) {
  // reference/krog til map'et.
  const mapRef = useRef();

  // Reference til markøren - så den kan flyttes rundt.
  const markerRef = useRef(null);

  return (
    <MapContainer id='map_container' center={coord} zoom={zoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
      <TileLayer url={`https://tile.openstreetmap.org/{z}/{x}/{y}.png`} attribution={'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'} maxZoom={19} />

      <Marker position={coord} draggable={true} animate={true} ref={markerRef}>
        <Popup>{coord}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapSkeleton;
