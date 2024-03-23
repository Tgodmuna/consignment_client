import React, { useCallback, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Icon from "./Icon";
import axios from "axios";

interface MapWithMarkerProps {
  coordinates: { lat: number; lon: number } | undefined;
}

const MapWithMarker: React.FC<MapWithMarkerProps> = ({ coordinates }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [LocationName, setLocationName] = useState<string | undefined>("");
  const [isLocationNameLoading, setisLocationNameLoading] = useState(false);
  const [locationNameError, setlocationNameError] = useState("");
  const [isErr, setisErr] = useState(false);

  //get the location name using the  coordinates passed as prop
  const GetLocationName = useCallback(
    (coordinates: { lat: number; lon: number }) => {
      setisLocationNameLoading(true);
      setisErr(false);
      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.lat}&lon=${coordinates.lon}&format=json`,
        )
        .then((res) => {
          setLocationName(res.data.display_name);
          setisLocationNameLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setisLocationNameLoading(false);
          setlocationNameError(err.message);
          setisErr(true);
        });
    },
    [],
  );

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
              click: () => {
                GetLocationName(coordinates);
              },
            }}
            title='hover or click to see parcel location'
            position={[coordinates.lat, coordinates.lon]}
            icon={Icon}
            alt='current parcel location'>
            {isPopupOpen && (
              <Popup className='capitalize text-neutral-600' autoClose={true}>
                {isLocationNameLoading ? (
                  <span className='animate-pulse text-yellow-900 text-xs capitalize'>
                    getting location name
                  </span>
                ) : isErr ? (
                  <span className='text-red-700 uppercase text-xs'>
                    {locationNameError}
                  </span>
                ) : (
                  <span className='text-green-600 flex flex-col'>
                    <span className='font-bold text-center'>
                      current parcel location:
                    </span>{" "}
                    <br /> {LocationName}
                  </span>
                )}
              </Popup>
            )}
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapWithMarker;
