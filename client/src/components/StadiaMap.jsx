import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import treeImage from '../assets/img/tree.png'; 

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';


const MarkerClusterGroupComponent = ({ treeData, treeIcon }) => {
  const map = useMap();

  useEffect(() => {
    if (!treeData) {
      return;
    }

    const markerClusterGroup = L.markerClusterGroup({
      removeOutsideVisibleBounds: true,
      disableClusteringAtZoom: 16,
    });

    treeData.forEach(tree => {
      const marker = L.marker([tree.Lat, tree.Lon], { icon: treeIcon });
      marker.bindPopup(`<b>${tree.name}</b><br>${tree.description}`);
      markerClusterGroup.addLayer(marker);
    });

    map.addLayer(markerClusterGroup);

    // Clean up on unmount
    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, treeData, treeIcon]);

  return null;
};


const StadiaMap = ({ treeData }) => {

  const treeIcon = L.icon({
    iconUrl: treeImage,
    iconSize: [25, 41], 
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <MapContainer 
      center={[50.63373, 5.56749]} 
      zoom={13} 
      style={{ height: "80vh", width: "100%" }}
      minZoom={13}
      maxZoom={16}
      zoomControl={false}
      maxBounds={[
        [50.56, 5.48], // Coordonnées du coin supérieur gauche
        [50.72, 5.72]  // Coordonnées du coin inférieur droit
      ]}
      >

      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
        //attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />

      <MarkerClusterGroupComponent treeData={treeData} treeIcon={treeIcon} />

    </MapContainer>
  );
};

export default StadiaMap;