"use client";
import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Circle,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 40.7128,
  lng: -74.006,
};

const CommunityMap = ({
  resources,
  localEvents,
  notifications,
}: {
  resources?: Array<{
    id: string;
    lat: number;
    lng: number;
    type: string;
    name: string;
    address: string;
    description: string;
    services?: string[];
  }>;
  localEvents?: Array<{
    id: string;
    lat: number;
    lng: number;
    title: string;
    description: string;
    date: string;
  }>;
  notifications?: Array<{
    id: string;
    lat: number;
    lng: number;
    type: string;
    message: string;
    timestamp: string;
  }>;
}) => {
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [localityRadius, setLocalityRadius] = useState(1000); // 1 km radius

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_APIKEY || "",
    libraries: ["places"],
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
          map.panTo(userPos);
        },
        () => {
          console.log("Error getting location");
        }
      );
    }
  }, []);

  const renderInfoWindow = (
    type: "resource" | "event" | "notification",

    item: any
  ) => {
    switch (type) {
      case "resource":
        return (
          <div className="p-2">
            <h3 className="font-bold">{item.name}</h3>
            <p>{item.address}</p>
            <p>{item.description}</p>
            {item.services && <p>Services: {item.services.join(", ")}</p>}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Get Directions
            </a>
          </div>
        );
      case "event":
        return (
          <div className="p-2">
            <h3 className="font-bold">{item.title}</h3>
            <p>{item.description}</p>
            <p>Date: {item.date}</p>
          </div>
        );
      case "notification":
        return (
          <div className="p-2">
            <h3 className="font-bold">{item.type} Notification</h3>
            <p>{item.message}</p>
            <p>Timestamp: {new Date(item.timestamp).toLocaleString()}</p>
          </div>
        );
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={userLocation || center}
        onLoad={onMapLoad}
      >
        {userLocation && (
          <>
            <Marker
              position={userLocation}
              icon={{
                url: "/public/userlocmarker.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
            <Circle
              center={userLocation}
              radius={localityRadius}
              options={{
                fillColor: "rgba(100,149,237,0.2)",
                strokeColor: "rgba(100,149,237,0.5)",
              }}
            />
          </>
        )}

        {resources?.map((resource) => (
          <Marker
            key={resource.id}
            position={{ lat: resource.lat, lng: resource.lng }}
            onClick={() => setSelectedResource(resource)}
            icon={{
              url: `/markers/${resource.type}.png`,
              scaledSize: new window.google.maps.Size(32, 32),
            }}
          />
        ))}

        {localEvents?.map((event) => (
          <Marker
            key={event.id}
            position={{ lat: event.lat, lng: event.lng }}
            onClick={() => setSelectedEvent(event)}
            icon={{
              url: "/markers/event.png",
              scaledSize: new window.google.maps.Size(32, 32),
            }}
          />
        ))}

        {notifications?.map((notification) => (
          <Marker
            key={notification.id}
            position={{ lat: notification.lat, lng: notification.lng }}
            onClick={() => setSelectedNotification(notification)}
            icon={{
              url: "/markers/notification.png",
              scaledSize: new window.google.maps.Size(32, 32),
            }}
          />
        ))}

        {selectedResource && (
          <InfoWindow
            position={{ lat: selectedResource.lat, lng: selectedResource.lng }}
            onCloseClick={() => setSelectedResource(null)}
          >
            {renderInfoWindow("resource", selectedResource)}
          </InfoWindow>
        )}

        {selectedEvent && (
          <InfoWindow
            position={{ lat: selectedEvent.lat, lng: selectedEvent.lng }}
            onCloseClick={() => setSelectedEvent(null)}
          >
            {renderInfoWindow("event", selectedEvent)}
          </InfoWindow>
        )}

        {selectedNotification && (
          <InfoWindow
            position={{
              lat: selectedNotification.lat,
              lng: selectedNotification.lng,
            }}
            onCloseClick={() => setSelectedNotification(null)}
          >
            {renderInfoWindow("notification", selectedNotification)}
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Locality Radius Control */}
      <div className="absolute top-4 right-4 bg-white p-2 rounded shadow">
        <label className="block text-sm font-medium text-gray-700">
          Locality Radius (meters)
        </label>
        <input
          type="range"
          min="500"
          max="5000"
          step="500"
          value={localityRadius}
          onChange={(e) => setLocalityRadius(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-500">{localityRadius} m</p>
      </div>
    </div>
  );
};

export default CommunityMap;
