import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";

import MunicipalitySearch from "./MunicipalitySearch";

import FlyToMunicipality from "../../../map/FlyToMunicipality";

import MunicipalityBoundary from "../../../map/MunicipalityBoundary";

import FlyToLocation from "../../../map/FlyToLocation";

import { userLocationIcon } from "../../../map/MapIcons";

const LocationMarker = ({
  setLocation,
  setCoordinates,
  selectedMunicipality,
}) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    async click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      setPosition([lat, lng]);
      setCoordinates(lat, lng);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
          {
            headers: {
              "User-Agent": "FindMyHome-App",
            },
          },
        );

        const data = await response.json();

        if (selectedMunicipality) {
          setLocation(selectedMunicipality.properties.GaPa_NaPa);
        } else {
          let location =
            data.address.county ||
            data.address.city ||
            data.address.town ||
            data.address.municipality ||
            "Unknown";

          location = location.replace(" Metropolitan City", "");

          setLocation(location);
        }
      } catch (error) {
        console.error(error);
        setLocation("Unknown");
      }
    },
  });

  return position ? <Marker position={position} /> : null;
};

const LocationPicker = ({ setLocation, setCoordinates }) => {
  const [search, setSearch] = useState("");

  const [selectedMunicipality, setSelectedMunicipality] = useState(null);

  const [mapCenter, setMapCenter] = useState(null);

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = [position.coords.latitude, position.coords.longitude];

        setUserLocation(location);
      },
      () => {
        console.log("Location permission denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  }, []);

  const handleLocateMe = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = [position.coords.latitude, position.coords.longitude];

        setMapCenter(location);
        setUserLocation(location);
      },
      () => {
        console.log("Unable to get location");
      },
    );
  };

  const handleReset = () => {
    setSearch("");
    setSelectedMunicipality(null);
    setMapCenter(null);
  };

  return (
    <div className="relative z-0">
      <MunicipalitySearch
        search={search}
        setSearch={setSearch}
        onMunicipalitySelect={setSelectedMunicipality}
        onLocateMe={handleLocateMe}
        onReset={handleReset}
      />
      <MapContainer
        center={[27.7172, 85.324]}
        zoom={13}
        style={{
          height: "400px",
          width: "100%",
        }}
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon} />
        )}

        <FlyToLocation position={mapCenter} />

        <FlyToMunicipality municipality={selectedMunicipality} />

        <MunicipalityBoundary municipality={selectedMunicipality} />

        <LocationMarker
          setLocation={setLocation}
          setCoordinates={setCoordinates}
          selectedMunicipality={selectedMunicipality}
        />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
