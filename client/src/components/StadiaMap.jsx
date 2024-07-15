import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
const treeImage = 'http://localhost:3000/public/skins/tree.png';
const treeOwnImage = "http://localhost:3000/public/skins/";
import Cookies from 'js-cookie';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import '../style/components/_popup.scss';

import heightIcon from '../assets/img/height.svg';
import leafIcon from '../assets/img/nb-leafs.png';
import diaIcon from '../assets/img/diameter.svg';
import lockIcon from '../assets/img/nb-locks.png';


const avatarUrl = 'http://localhost:3000/public/avatars/';
const skinTreeUrl = 'http://localhost:3000/public/skins/';


const MarkerClusterGroupComponent = ({ treeData, treeIcon, boughtTreeIcon }) => {
  const map = useMap();

  const getIconSize = (skinName) => {
    if (skinName === null) {
      return [25, 53];
    }
    if (skinName.includes('tree-own.png')) {
      return [25, 53];
    } else if (skinName.includes('tree-1-own.png')) {
      return [33, 58];
    } else if (skinName.includes('tree-2-own.png')) {
      return [36, 59];
    } else if (skinName.includes('tree-3-own.png')) {
      return [27, 59];
    } else if (skinName.includes('tree-5-own.png')) {
      return [73, 58];
    }
    return [25, 53];
  };


  function buyTree(data) {
    const payload = {
      Tree: {
        IdTrees: data.treeId,
        Price: data.price,
        Name: data.treeName,
        Owner: data.owner
      },
      User: {
        IdUsers: data.idusers,
        Pseudo: data.pseudo,
        Leafs: data.leafs
      }
    };
  
    fetch('/buytree', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Achat réussi:', data);
    })
    .catch(error => {
      console.error('Erreur lors de l\'achat:', error);
    });
  }
  

  function lockTree(treeId) {
    const payload = {
      Tree: {
        IdTrees: treeId,
        LockPrice: lock,
        Lock: 0
      },
      User: {
        IdUsers: idusers,
        Pseudo: pseudo,
        Leafs: leafs
      }
    };
  
    fetch('/locktree', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Verrouillage réussi:', data);
    })
    .catch(error => {
      console.error('Erreur lors du verrouillage:', error);
    });
  }

  window.buyTree = buyTree;
  window.lockTree = lockTree;


  useEffect(() => {
    if (!treeData) {
      return;
    }

    const markerClusterGroup = L.markerClusterGroup({
      removeOutsideVisibleBounds: true,
      disableClusteringAtZoom: 16,
    });

    treeData.forEach(tree => {
      let iconUrl = tree.SkinTrees ? `${skinTreeUrl}${tree.SkinTrees}` : treeImage;
      let customIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: getIconSize(tree.SkinTrees),
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      const marker = L.marker([tree.Lat, tree.Lon], { icon: customIcon });


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

          const avatarName = data.skinPlayer ? data.skinPlayer.split('/').pop().split('.')[0] : 'defaultAvatar'; // 'rat' pour 'rat.png'
          const avatarClass = `${avatarName}-popup`; // 'rat-popup' pour 'rat.png'


          let popupContent = `<div class="popup-content">
            <div class="popup-title">
              <h2>${tree.Name ? tree.Name : 'Groot'}</h2>`;

          popupContent += `<div class="popup-treespecies">${tree.Species}</div></div>
            <div class="popup-infos"> 
              <div>
                <img class="height-icon" src="${heightIcon}" alt="Height" />${Math.floor(tree.TotHight)}m
              </div>
              <div>
                <img class="diameter-icon" src="${diaIcon}" alt="Diameter" />${Math.floor(tree.DiaLeafs)}m
              </div>
              <div>
                <img class="leafpopup-icon" src="${leafIcon}" alt="Leaves" />
                <div class="bold">
                  ${data.value} Leaves
                </div>
              </div>
            </div>

            <div class="popup-flex">
            `;

          if (tree.Owner) {
            popupContent += `
              <div class="owner-popup">
                <div class="avatar-popup">
                  <img class="${avatarClass}" src="${avatarUrl + data.skinPlayer}" alt="Skinplayer" />
                </div>
                <div class="bold">${tree.Pseudo ? tree.Pseudo : ''}</div>
              </div>
          `;
            
            if (tree.Owner === Number(idusers)){
              //TODO : data pr l'achat : {
              //     "Tree":{
              //             "IdTrees": 16,
              //             "Price": 200,
              //             "Name" : "Fossinel",
              //             "Owner": null
              //             },
              //     "User":{
              //             "IdUsers": 4,
              //             "Pseudo": "Admin",
              //             "Leafs": 140568
              //     }
              // }
              // data pr le lock : {
              //     "Tree":{
              //             "IdTrees": 184,
              //             "LockPrice": 10000,
              //             "Lock": 0
              //             },
              //     "User":{
              //             "IdUsers": 1,
              //             "Pseudo": "Kriidfel",
              //             "Leafs": 147348
              //     }
              // }

              // Si l'utilisateur actuel est le propriétaire de l'arbre
              popupContent += `<button class="popup-btn" onclick="lockTree(${data})">
                <img class="lockpopup-icon" src="${lockIcon}" alt="Lock icon" />
                → <img class="leaf--btn-icon" src="${leafIcon}" alt="Leaves" /> 
                ${data.lock} 
              </button> </div>`;
              if (tree.isLocked) {
                popupContent += `<img class="lockpopup-icon" src="${lockIcon}" alt="Locked" /> </div>`;
              }
            } else {
              // Si l'arbre a un autre propriétaire
              popupContent += `<button class="popup-btn" onclick="buyTree(${data})">
                <img class="leaf--btn-icon" src="${leafIcon}" alt="Leaves" />${data.price}
              </button> </div>`;
            }
          } else {
            // Si l'arbre n'a pas de propriétaire
            popupContent += `<div class="popup-btn-class"><button class="popup-btn" onclick="buyTree(${data})">
              <img class="leaf--btn-icon" src="${leafIcon}" alt="Leaves" />${data.price}
            </button> </div> </div> </div>`;
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



  function buyTree(treeId) {
    // Exemple de payload pour l'achat
    const payload = {
      Tree: {
        IdTrees: treeId,
        // Autres données nécessaires pour l'achat
      },
      User: {
        // Données de l'utilisateur
      }
    };

    fetch('/buytree', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Achat réussi:', data);
      // Traiter la réponse
    })
    .catch(error => {
      console.error('Erreur lors de l\'achat:', error);
    });
  }

  function lockTree(treeId) {
    // Exemple de payload pour le verrouillage
    const payload = {
      Tree: {
        IdTrees: treeId,
        // Autres données nécessaires pour le verrouillage
      },
      User: {
        // Données de l'utilisateur
      }
    };

    fetch('/locktree', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Verrouillage réussi:', data);
      // Traiter la réponse
    })
    .catch(error => {
      console.error('Erreur lors du verrouillage:', error);
    });
  }
})};


const StadiaMap = ({ treeData }) => {



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

      <MarkerClusterGroupComponent treeData={treeData}/>

    </MapContainer>
  );
};

export default StadiaMap;