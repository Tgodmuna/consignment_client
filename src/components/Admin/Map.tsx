import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Icon from "../utilities/Icon";
import axios from "axios";
import { useState } from "react";
import { LocationProp } from "./AdminDashboard";

type mapPropType = {
  marker?: [number, number];
  coordinates?: {
    lat: number;
    lon: number;
  };
  className?: string;
  userId?: number;
  parcelId?: string;
};

const Map = ({ parcelId, className, userId }: mapPropType) => {
  //location
  const [Location, setLocation] = useState<LocationProp | null>(null);

  //marker coordinate varible
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    51.505, -0.09,
  ]);

  //send coordinates to server
  const sendCoordinnatesToSever = (lat: number, lon: number) => {
    const data = { coordinates: { lat: lat, lon: lon }, parcelId, userId };
    axios
    .put(`https://consignmentchika2.onrender.com/updateCoordinates`, JSON.stringify(data), { headers: { "Content-Type": "application/json" } },)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //hook for getting location coordinates and location details.
  const GetCoordinates = () => {
    const mapInstance = useMap();
    mapInstance.on("click", (e) => {
      sendCoordinnatesToSever(e.latlng.lat, e.latlng.lng);
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      GetLocationName({ lat: e.latlng.lat, lon: e.latlng.lng });
    });
    return null;
  };

  //get the location name using the retreivied coordinates
  const GetLocationName = (coordinates: { lat: number; lon: number }) => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.lat}&lon=${coordinates.lon}&format=json`,
      )
      .then((res) => {
        console.log(res.data);
        setLocation(res.data);
        //save to
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div
      className={` ${className} w-full flex flex-col   rounded-md shadow-md mb-4`}>
      <MapContainer
        scrollWheelZoom={true}
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "100%" }}>
        <GetCoordinates />
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Marker position={markerPosition} icon={Icon}>
          <Popup className='capitalize text-neutral-600' autoClose={true}>
            hello , this where your Parcel is
          </Popup>
        </Marker>
      </MapContainer>

      {/* locationDetails */}
      <div className='w-[100%] m-auto  h-auto justify-between flex flex-col bg-gray-200 rounded-md shadow-md p-4  gap-[]'>
        <h2 className='text-lg font-bold mb-2'>Location Details</h2>
        <div className='mb-2 flex gap-3'>
          <p className='font-semibold'>Display Name:</p>
          <p>{Location?.display_name}</p>
        </div>
        <div className='mb-2 flex gap-3'>
          <p className='font-semibold'>Latitude:</p>
          <p>{Location?.lat}</p>
        </div>
        <div className='mb-2 flex gap-3'>
          <p className='font-semibold'>Longitude:</p>
          <p>{Location?.lon}</p>
        </div>
        <div className='mb-2 flex gap-3'>
          <p className='font-semibold'>Name:</p>
          <p>{Location?.name}</p>
        </div>
        <div className='mb-2 flex gap-3'>
          <p className='font-semibold'>OSM Type:</p>
          <p>{Location?.osm_type}</p>
        </div>
        <div className='mb-2 flex gap-3'>
          <p className='font-semibold'>TYPE:</p>
          <p>{Location?.type}</p>
        </div>
      </div>
    </div>
  );
};

export default Map;
