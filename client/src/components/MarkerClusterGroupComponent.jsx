import React, { useEffect, useContext } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

import MapContext from './MapContext.jsx';


const MarkerClusterGroupComponent = ({ treeData, treeIcon, boughtTreeIcon }) => {
    const map = useContext(MapContext);
  
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
        marker.bindPopup(`<b>${tree.name}</b><br>${tree.description}`);
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

export default MarkerClusterGroupComponent;