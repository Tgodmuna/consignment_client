/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Icon from "../utilities/Icon";
import axios from "axios";

const AdminDashboard = () => {
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    51.505, -0.09,
  ]);
  //coordinates
  const [coordinates, setcoordinates] = useState<
    | {
        lat: number;
        lon: number;
      }
    | undefined
  >(undefined);

  //location
  const [Location, setLocation] = useState<LocationProp | null>(null);

  const GetCoordinates = () => {
    const mapInstance = useMap();
    mapInstance.on("click", (e) => {
      console.log(e.latlng);
      setcoordinates((prev) => {
        return { ...prev, lat: e.latlng.lat, lon: e.latlng.lng };
      });
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
    //   sendCoordinnatesToSever({ lat: e.latlng.lat, lon: e.latlng.lng });
      GetLocationName({ lat: e.latlng.lat, lon: e.latlng.lng });
    });
    return null;
  };

  //send coordinates
  const sendCoordinnatesToSever = (coordinates: {
    lat: number;
    lon: number;
  }) => {
    axios
      .post("kjjkhjkh", { coordinates })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
    <div className='flex h-screen'>
      {/* Sidebar */}
      <aside className='bg-gray-800 text-white w-64'>
        {/* Sidebar Content */}
        <div className='p-4'>
          <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
          {/* Sidebar Menu */}
          <ul className='space-y-2 flex flex-col gap-[3rem]'>
            <li>
              <a href='#' className='block py-2 px-4 hover:bg-gray-700 rounded'>
                Dashboard
              </a>
            </li>
            <li>
              <a href='#' className='block py-2 px-4 hover:bg-gray-700 rounded'>
                Orders
              </a>
            </li>
            <li>
              <a href='#' className='block py-2 px-4 hover:bg-gray-700 rounded'>
                Shipments
              </a>
            </li>

            <li className='w-[10rem] capitalize'>
              <a
                href='#'
                className='block py-2 px-4 hover:bg-gray-700 rounded w-fit'>
                push notification and an email to client dashboard
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className='flex-1 overflow-scroll bg-gray-100 p-6'>
        <h2 className='text-2xl font-bold mb-4'>Map</h2>

        {/* Map Component */}
        <div className='w-full h-[90%] bg-white rounded-md shadow-md mb-4'>
          <MapContainer
            scrollWheelZoom={true}
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "100%" }}>
            <GetCoordinates />
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Marker position={markerPosition} icon={Icon} >
              <Popup className='capitalize text-neutral-600' autoClose={true}>
                hello , this where your Parcel is
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* locationDetails */}
        <div className='w-[70%] m-auto  h-[50%] justify-between flex flex-col bg-gray-200 rounded-md shadow-md p-4 flex-wrap gap-[]'>
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
      </main>
    </div>
  );
};

export default AdminDashboard;

type Address = {
  road: string;
  neighbourhood: string;
  suburb: string;
  city_district: string;
  ISO3166_2_lvl8: string;
  // Add any other properties as needed
};

type LocationProp = {
  address: Address;
  addresstype: string;
  boundingbox?: [string, string, string, string];
  class: string;
  display_name: string;
  importance?: number;
  lat: string;
  licence: string;
  lon?: string;
  name: string;
  osm_id?: number;
  osm_type?: string;
  place_id?: number;
  place_rank?: number;
  type: string;
};
