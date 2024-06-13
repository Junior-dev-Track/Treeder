import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

const StadiaMap = () => {
  return (
    <MapContainer 
      center={[50.63373, 5.56749]} 
      zoom={13} 
      style={{ height: "80vh", width: "100%" }}
      minZoom={13}
      zoomControl={false}
      >

      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
        //attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default StadiaMap;