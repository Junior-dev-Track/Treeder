import React, { useContext, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import treeImage from '../assets/img/tree.png'; 

import MarkerClusterGroupComponent from './MarkerClusterGroupComponent.jsx';
import MapContext from './MapContext';


const StadiaMap = ({ treeData }) => {

  const treeIcon = L.icon({
    iconUrl: treeImage,
    iconSize: [25, 41], 
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const maxBounds = [
    [50.56, 5.48], // Coordonnées du coin supérieur gauche
    [50.72, 5.72]  // Coordonnées du coin inférieur droit
  ];

  return (
    <MapContainer 
      center={[50.63373, 5.56749]} 
      zoom={13} 
      style={{ height: "80vh", width: "100%" }}
      minZoom={13}
      maxZoom={16}
      zoomControl={false}
      maxBounds={maxBounds}
      >

      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
        //attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />

      <MapContext.Provider value={maxBounds}>
        <MarkerClusterGroupComponent treeData={treeData} treeIcon={treeIcon} />
      </MapContext.Provider>

    </MapContainer>
  );
};

export default StadiaMap;