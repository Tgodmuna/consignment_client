import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Icon from "./Icon";

interface MapWithMarkerProps {
  coordinates: { lat: number; lon: number } | undefined;
}

const MapWithMarker: React.FC<MapWithMarkerProps> = ({ coordinates }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <MapContainer
        dragging={false}
        style={{ width: "100%", height: "100%" }}
        center={coordinates ? [coordinates.lat, coordinates.lon] : [0, 0]}
        zoom={coordinates ? 13 : 1}
        scrollWheelZoom={true}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {coordinates && (
          <Marker
            eventHandlers={{
              mouseover: () => setIsPopupOpen(true),
              mouseout: () => setIsPopupOpen(false),
            }}
            title='hover or click to see parcel location'
            position={[coordinates.lat, coordinates.lon]}
            icon={Icon}
            alt='current parcel location'>
            {isPopupOpen && (
              <Popup
                className='capitalize text-neutral-600'
                autoClose={true}
                content={"current location of the parcel"}
              />
            )}
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapWithMarker;
