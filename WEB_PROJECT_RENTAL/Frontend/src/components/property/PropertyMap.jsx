import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { Navigation, Car, Bike, Footprints, MapPinned } from "lucide-react";

import { useLayout } from "../../context/LayoutContext";

const userIcon = L.divIcon({
  html: `
    <style>
      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 0.8;
        }
        70% {
          transform: scale(2.5);
          opacity: 0;
        }
        100% {
          transform: scale(2.5);
          opacity: 0;
        }
      }

      .user-marker {
        position: relative;
        width: 20px;
        height: 20px;
      }

      .user-marker .pulse {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: rgba(37, 99, 235, 0.35);
        animation: pulse 1.8s infinite;
      }

      .user-marker .dot {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: #2563eb;
        border: 3px solid white;
        box-shadow: 0 2px 10px rgba(0,0,0,.35);
      }

      .user-label {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -36px;
        background: #2563eb;
        color: white;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0,0,0,.25);
      }
    </style>

    <div class="user-marker">
      <div class="user-label">You</div>
      <div class="pulse"></div>
      <div class="dot"></div>
    </div>
  `,
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const FollowUser = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom(), {
        animate: true,
        duration: 0.8,
      });
    }
  }, [position, map]);

  return null;
};

const ResizeMap = ({ fullscreen }) => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [fullscreen, map]);

  return null;
};

const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} mins`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} ${hours === 1 ? "hr" : "hrs"}`;
  }

  return `${hours} ${hours === 1 ? "hr" : "hrs"} ${remainingMinutes} mins`;
};
const PropertyMap = ({ property }) => {
  console.log("🔥 PROPERTY MAP LOADED");
  console.log("Property:", property);
  console.log("ORS TOKEN:", import.meta.env.VITE_ORS_API_KEY);
  const [userLocation, setUserLocation] = useState(null);
  const [route, setRoute] = useState([]);

  const watchId = useRef(null);

  const mapWrapperRef = useRef(null);

  const [routeColor, setRouteColor] = useState("blue");

  const [isNavigating, setIsNavigating] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const { setShowNavbar, setShowFooter } = useLayout();

    const [routeInfo, setRouteInfo] = useState({
      distance: "",
      duration: "",
      mode: "",
    });

  useEffect(() => {
    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFullscreen]);

  useEffect(() => {
    return () => {
      setShowNavbar(true);
      setShowFooter(true);
    };
  }, []);

 const getRoute = (profile) => {

    mapWrapperRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

   // Prevent creating multiple watchers
   if (watchId.current !== null) {
     navigator.geolocation.clearWatch(watchId.current);
   }

   watchId.current = navigator.geolocation.watchPosition(
     async (position) => {
       const userLat = position.coords.latitude;
       const userLng = position.coords.longitude;

       setUserLocation([userLat, userLng]);

       try {
         const response = await fetch(
           `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
           {
             method: "POST",
             headers: {
               Authorization: import.meta.env.VITE_ORS_API_KEY,
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
               coordinates: [
                 [userLng, userLat],
                 [property.longitude, property.latitude],
               ],
             }),
           },
         );

         const data = await response.json();

         if (!data.features || data.features.length === 0) {
           toast.error("Unable to find route.");
           return;
         }

         const summary = data.features[0].properties.summary;

         const distance = (summary.distance / 1000).toFixed(1);
         const duration = Math.ceil(summary.duration / 60);

         setRouteInfo({
           distance,
           duration,
           mode: profile,
         });

         setTimeout(() => {
           setIsNavigating(true);
           setIsFullscreen(true);

           setShowNavbar(false);
           setShowFooter(false);
         }, 600);

         if (profile === "driving-car") {
           setRouteColor("#2563eb"); // blue
         } else if (profile === "cycling-regular") {
           setRouteColor("#16a34a"); // green
         } else {
           setRouteColor("#f97316"); // orange
         }

         if (!data.features || data.features.length === 0) {
           toast.error("Unable to find a route.");
           return;
         }

         const formattedRoute = data.features[0].geometry.coordinates.map(
           ([lng, lat]) => [lat, lng],
         );

         setRoute(formattedRoute);
       } catch (error) {
         console.error(error);
       }
     },

     (error) => {
       console.log(error);

       switch (error.code) {
         case error.PERMISSION_DENIED:
           toast.error("Location permission denied.");
           break;

         case error.POSITION_UNAVAILABLE:
           toast.error("Unable to determine your location.");
           break;

         case error.TIMEOUT:
           toast.error("Location request timed out.");
           break;

         default:
           toast.error("Failed to get your location.");
       }
     },

     {
       enableHighAccuracy: false,
       maximumAge: 30000,
       timeout: 15000,
     },
   );

   toast.success("Live navigation started!");
 };

  return (
    <div>
      {!isNavigating && (
        <div className="mb-8 rounded-3xl border border-stone-200 bg-gradient-to-br from-stone-50 to-white p-6 shadow-sm">
          <div className="mb-5 flex items-start gap-4">
            <div className="rounded-2xl bg-blue-100 p-3">
              <Navigation className="h-7 w-7 text-blue-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-stone-800">
                Live Navigation
              </h3>

              <p className="mt-1 max-w-xl text-sm text-stone-500">
                View this property on the map, use your live location, and get
                turn-by-turn directions instantly.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => getRoute("driving-car")}
              className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-blue-700"
            >
              <Car size={22} />
              Drive
            </button>

            <button
              onClick={() => getRoute("cycling-regular")}
              className="flex items-center justify-center gap-3 rounded-2xl bg-green-600 px-5 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-green-700"
            >
              <Bike size={22} />
              Bike
            </button>

            <button
              onClick={() => getRoute("foot-walking")}
              className="flex items-center justify-center gap-3 rounded-2xl bg-orange-500 px-5 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-orange-600"
            >
              <Footprints size={22} />
              Walk
            </button>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-stone-500">
            <MapPinned size={16} />
            Live location is used only while navigation is active.
          </div>
        </div>
      )}
      <div ref={mapWrapperRef} className="mt-8">
        {isFullscreen ? (
          <div className="fixed inset-0 z-0 bg-black">
            <MapContainer
              center={[property.latitude, property.longitude]}
              zoom={15}
              className="absolute inset-0 h-full w-full"
            >
              <ResizeMap fullscreen={isFullscreen} />
              {userLocation && <FollowUser position={userLocation} />}

              <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker position={[property.latitude, property.longitude]}>
                <Popup>{property.title}</Popup>
              </Marker>

              {userLocation && (
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>You</Popup>
                </Marker>
              )}

              {route.length > 0 && (
                <Polyline positions={route} color={routeColor} weight={6} />
              )}
            </MapContainer>
          </div>
        ) : (
          <MapContainer
            center={[property.latitude, property.longitude]}
            zoom={15}
            className="h-[70vh] rounded-3xl"
          >
            <ResizeMap fullscreen={isFullscreen} />
            {userLocation && <FollowUser position={userLocation} />}

            <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={[property.latitude, property.longitude]}>
              <Popup>{property.title}</Popup>
            </Marker>

            {userLocation && (
              <Marker position={userLocation}>
                <Popup>Your Location</Popup>
              </Marker>
            )}

            {route.length > 0 && (
              <Polyline positions={route} color={routeColor} weight={6} />
            )}
          </MapContainer>
        )}
      </div>
      {isNavigating && routeInfo && (
        <>
          {/* Bottom info */}
          <div className="fixed left-1/2 bottom-8 z-[10000] w-[90%] max-w-5xl -translate-x-1/2 rounded-3xl border border-white/30 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between px-8 py-6">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                  {routeInfo.mode === "driving-car" && (
                    <>
                      <Car size={24} className="text-blue-600" />
                      Driving
                    </>
                  )}

                  {routeInfo.mode === "cycling-regular" && (
                    <>
                      <Bike size={24} className="text-green-600" />
                      Cycling
                    </>
                  )}

                  {routeInfo.mode === "foot-walking" && (
                    <>
                      <Footprints size={24} className="text-orange-500" />
                      Walking
                    </>
                  )}
                </h2>

                <p className="mt-1 text-gray-500">Live Navigation</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">Distance</p>

                <p className="text-2xl font-bold">{routeInfo.distance} km</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">ETA</p>

                <p className="text-2xl font-bold">
                  {formatDuration(routeInfo.duration)}
                </p>
              </div>

              <button
                onClick={() => {
                  setIsNavigating(false);
                  setIsFullscreen(false);

                  setShowNavbar(true);
                  setShowFooter(true);

                  setRoute([]);
                  setUserLocation(null);

                  if (watchId.current !== null) {
                    navigator.geolocation.clearWatch(watchId.current);
                  }

                  toast.info("Navigation stopped");
                }}
                className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white"
              >
                Stop
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyMap;
