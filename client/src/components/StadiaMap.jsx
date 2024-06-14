import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import treeImage from '../assets/img/tree.png'; // Importez l'image ici



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
      //minZoom={13}
      //maxZoom={16}
      zoomControl={false}
      >

      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
        //attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />


      {treeData && treeData.map((tree, index) => (
        <Marker key={index} position={[tree.Lat, tree.Lon]} icon={treeIcon} >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
};

export default StadiaMap;