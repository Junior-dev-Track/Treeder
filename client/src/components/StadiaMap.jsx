import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import treeImage from '../assets/img/tree.png'; 
import treeOwnImage from '../assets/img/tree-own.png';
import Cookies from 'js-cookie';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

import heightIcon from '../assets/img/height.svg';
import leafIcon from '../assets/img/nb-leafs.png';
import diaIcon from '../assets/img/diameter.svg';
import lockIcon from '../assets/img/nb-locks.png';


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


      marker.on('click', () => {
      const idusers = Cookies.get('idUser');

      marker.bindPopup("Chargement des informations...").openPopup();
    
      fetch(`/treevalues?IdTree=${tree.IdTrees}&IdUsers=${idusers}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          let popupContent = `<div class="popup-content"><h2>${tree.Name ? tree.Name : 'Groot'}</h2>`;

          popupContent += `<div class="popup-treespecies">${tree.Species}</div>
            <div class="popup-infos"> <div><img src="${heightIcon}" alt="Height" style="width: 11px; height: 14px;" />${Math.floor(tree.TotHight)}m</div>
            <div><img src="${diaIcon}" alt="Diameter" style="width: 14px; height: 16px;" />${Math.floor(tree.DiaLeafs)}m</div>
            <div><img src="${leafIcon}" alt="Leafs" style="width: 14px; height: 18px;" />${data.value} Leafs</div> </div>
            ${tree.Pseudo ? tree.Pseudo : ''}`;

          if (tree.Owner) {
            console.log(tree.Owner);
            console.log(idusers);
            if (tree.Owner === Number(idusers)){
              // Si l'utilisateur actuel est le propriétaire de l'arbre
              console.log(data.lock);
              popupContent += `<button class="popup-btn" onclick="lockTree(${tree.id})">Lock</button> </div>`;
              if (tree.isLocked) {
                popupContent += `<img src="${lockIcon}" alt="Locked" style="width: 16px; height: 24px;" /> </div>`;
              }
            } else {
              // Si l'arbre a un autre propriétaire
              popupContent += `<button class="popup-btn" onclick="buyTree(${tree.id})"><img src="${leafIcon}" alt="Leafs" style="width: 20px; height: 25px;" />${data.price} Leafs</button> </div>`;
            }
          } else {
            // Si l'arbre n'a pas de propriétaire
            popupContent += `<div class="popup-btn-class"><button class="popup-btn" onclick="buyTree(${tree.id})"><img src="${leafIcon}" alt="Leafs" style="width: 20px; height: 25px;" />${data.price} Leafs</button> </div> </div>`;
            //TODO : Achat envoie ds le fetch -> le tree le owner l'achteur et le prix
          }

          marker.getPopup().setContent(popupContent);
        });
    });

    markerClusterGroup.addLayer(marker);
    map.addLayer(markerClusterGroup);

    // Clean up on unmount
    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, treeData, treeIcon, boughtTreeIcon]);

})};


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
      style={{ height: "100vh", width: "100%" }}
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