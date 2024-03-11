/* eslint-disable jsx-a11y/anchor-is-valid */
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import Map from "./Map";

const AdminDashboard = () => {
  //check if the Pathname is a valid admin Route
  let LOCATION = useLocation();
  const isAdmin =
    LOCATION.pathname === "/Admin/dashboard" ||
    LOCATION.pathname === "/Admin/orders" ||
    LOCATION.pathname === "/Admin/users";

  const renderOutRet = () => {
    if (isAdmin) {
      return <Outlet />;
    }
    return null;
  };

  const mainJsx = (
    <>
      {/* Main Content Area */}
      <main className='flex-1 h- overflow-scroll p-6 '>
        <h2 className='text-2xl font-bold mb-4'>Map</h2>

        {/* Map Component */}
        <Map className="h-[100vw]" />
        {renderOutRet()}
      </main>
    </>
  );

  return (
    <div className='flex h-screen w-[100%]'>
      {/* Sidebar */}
      <SideBar />
      {isAdmin ? renderOutRet() : mainJsx}
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
};

export type LocationProp = {
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
