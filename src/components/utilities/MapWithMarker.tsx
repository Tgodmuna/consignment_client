import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Icon from "./Icon";

interface MapWithMarkerProps {
  coordinates:
    | {
        lat: number;
        lon: number;
      }
    | undefined;
}

const MapWithMarker: React.FC<MapWithMarkerProps> = ({ coordinates }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const mapElement = mapRef.current;

    if (coordinates) {
      const map = L.map(mapRef.current).setView(
        [coordinates.lat, coordinates.lon],
        13,
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      // Add Marker to the map
      markerRef.current = L.marker([coordinates.lat, coordinates.lon]).addTo(
        map,
      );
      markerRef.current
        .bindPopup("<b>This is where your goods are!</b>")
        .openPopup();
      markerRef.current.setIcon(Icon);
    }

    return () => {
      if (mapElement) {
        mapElement.remove();
      }
    };
  }, [coordinates]);

  return <div style={{ height: "400px" }} ref={mapRef}></div>;
};

export default MapWithMarker;
