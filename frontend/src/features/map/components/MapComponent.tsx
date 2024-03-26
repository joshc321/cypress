'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconImage from '@/assets/marker-icon.png';
import shadowImage from '@/assets/marker-shadow.png';


interface Location {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  locations: Location[];
}

var myIcon = L.icon({
    iconUrl: iconImage.src,
    shadowUrl: shadowImage.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
    popupAnchor: [1, -34]
});

export const MapComponent: React.FC<MapProps> = ({ locations }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    // const map = L.map('map', {
    //   center: [0, 0],
    //   zoom: 2,
    //   zoomControl: false,
    // });
    const map = L.map('map').setView([33.661911, -117.831383], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    locations.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude], {icon: myIcon}).addTo(map);
      marker.bindPopup(`<h3>${location.name}</h3><p>${location.description}</p>`);
    });


    mapRef.current = map;
  }, [locations]);

  // invert-[0.9] hue-rotate-[170deg] brightness-150 contrast-[1.2] saturate-[.3]

  return <div id="map" className='w-screen h-screen z-0' />;
};

