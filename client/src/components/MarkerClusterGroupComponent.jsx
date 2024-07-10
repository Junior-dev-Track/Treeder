import React, { useEffect, useContext } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';
import Cookies from 'js-cookie';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

import MapContext from './MapContext.jsx';

const MarkerClusterGroupComponent = ({ treeData }) => {
    const map = useContext(MapContext);
    const skinTreeUrl = 'http://localhost:3000/public/skins/';
    const defaultTreeIcon = 'http://localhost:3000/public/skins/tree-own.png';

    useEffect(() => {
      if (!treeData) {
        return;
      }

      const markerClusterGroup = L.markerClusterGroup({
        removeOutsideVisibleBounds: true,
        disableClusteringAtZoom: 16,
      });

      treeData.forEach(tree => {
        let iconUrl = tree.SkinTrees ? `${skinTreeUrl}${tree.SkinTrees}` : defaultTreeIcon;
        let customIcon = L.icon({
          iconUrl: iconUrl,
          iconSize: [25, 53],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        const marker = L.marker([tree.Lat, tree.Lon], { icon: customIcon });
        marker.bindPopup(`<b>${tree.Name}</b><br>${tree.Species}`);
        markerClusterGroup.addLayer(marker);
      });

      map.addLayer(markerClusterGroup);

      // Clean up on unmount
      return () => {
        map.removeLayer(markerClusterGroup);
      };
    }, [map, treeData]);

    return null;
  };

export default MarkerClusterGroupComponent;