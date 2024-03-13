import React, { useCallback, useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LeftSideBar = () => {
  // State to store tracking data
  const [trackingData, setTrackingData] = useState<null | {
    timestamp: string;
    latitude: number;
    longitude: number;
    status: string;
  }>(null);

  // Reference to the map container element
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // Reference to the Leaflet map instance
  const map = useRef<L.Map | null>(null);

  const fetchTrackingData = useCallback(() => {
    // Simulate fetching tracking data from the backend
    const mockTrackingData = {
      timestamp: "2024-03-01T12:00:00Z",
      latitude: 40.7128,
      longitude: -74.006,
      status: "In transit",
    };
    
    // Set the tracking data in state and update the map
    setTrackingData(mockTrackingData);
    updateMapWithTrackingData(mockTrackingData);
  }, []);

  useEffect(() => {
    // Initialize the map when the component mounts
    if (mapContainerRef.current && !map.current) {
      map.current = L.map(mapContainerRef.current).setView(
        [40.7128, -74.006],
        10,
      );

      // Add a tile layer from OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map.current);

      // Fetch tracking data when the component mounts
      fetchTrackingData();
    }
  }, [fetchTrackingData]);

  // Function to update the map with tracking data
  const updateMapWithTrackingData = (trackingData: {
    timestamp?: string;
    latitude: any;
    longitude: any;
    status?: string;
  }) => {
    if (!map.current) return;
    // Extract latitude and longitude from tracking data
    const { latitude, longitude } = trackingData;
    // Add a marker to the map representing the current location
    L.marker([latitude, longitude]).addTo(map.current);
    // Set the view of the map to the current location
    map.current.setView([latitude, longitude], 10);
  };

  return (
    <aside className='md:h-full bg-slate-100 w-full   md:w-[45%] overflow-scroll rounded-md flex gap-[3rem] flex-col border-2 border-cyan-900 p-3'>
      <h1 className='text-xl text-neutral-500 capitalize text-center'>
        Real Time Parcel Tracker
      </h1>

      <div className='bg-slate-50 w-full flex flex-col p-1 rounded-md'>
        <p className='font-semibold text-neutral-300 text-xs'>
          Parcel Status:{" "}
          <span className='font-light'>
            {trackingData ? trackingData.status : "Not available"}
          </span>
        </p>
        <p className='font-semibold text-xs text-neutral-300'>
          Tracking-num:{" "}
          <span className='font-light'>
            {trackingData ? "ABC123" : "Not available"}
          </span>
        </p>
      </div>

      <div className='bg-slate-50 w-full flex flex-col p-1 rounded-md overflow-scroll '>
        {/* Map container */}
        <div
          className='overflow-scroll'
          ref={mapContainerRef}
          style={{ width: "100%", height: "500px" }}></div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
