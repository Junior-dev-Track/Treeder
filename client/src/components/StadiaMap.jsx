import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import treeImage from '../assets/img/tree.png'; 
import treeOwnImage from '../assets/img/tree-own.png';


import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';


const MarkerClusterGroupComponent = ({ treeData, treeIcon, boughtTreeIcon }) => {
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
      const icon = tree.Owner ? boughtTreeIcon : treeIcon; 
      const marker = L.marker([tree.Lat, tree.Lon], { icon: icon });
      let popupContent = `<h2>${tree.Name}</h2>`;

      const leafCount = Math.round(tree.TotHight * tree.DiaLeafs);
      const treeHight = Math.round(tree.TotHight);

      popupContent += `<br>${tree.Species}<br>${treeHight}<br>${tree.DiaLeafs}<br>${leafCount} Leafs<br>${tree.Owner ? tree.Owner : ''}`;

      if (tree.owner) {
        if (tree.owner === currentUser) {
          // Si l'utilisateur actuel est le propriétaire de l'arbre
          popupContent += `<button onclick="lockTree(${tree.id})">Lock</button>`;
          if (tree.isLocked) {
            popupContent += `<img src="lock-icon.png" alt="Locked" />`;
          }
        } else {
          // Si l'arbre a un autre propriétaire
          popupContent += `<button onclick="buyTree(${tree.id})">${leafCount} Leafs</button>`;
        }
      } else {
        // Si l'arbre n'a pas de propriétaire
        popupContent += `<button onclick="buyTree(${tree.id})">${leafCount} Leafs</button>`;
      }

      marker.bindPopup(popupContent);
      markerClusterGroup.addLayer(marker);
    });

    map.addLayer(markerClusterGroup);

    // Clean up on unmount
    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, treeData, treeIcon, boughtTreeIcon]);

  return null;
};


const StadiaMap = ({ treeData }) => {

  const treeIcon = L.icon({
    iconUrl: treeImage,
    iconSize: [25, 53], 
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const boughtTreeIcon = L.icon({
    iconUrl: treeOwnImage,
    iconSize: [25, 53], 
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

      <MarkerClusterGroupComponent treeData={treeData} treeIcon={treeIcon} boughtTreeIcon={boughtTreeIcon} />

    </MapContainer>
  );
};

export default StadiaMap;