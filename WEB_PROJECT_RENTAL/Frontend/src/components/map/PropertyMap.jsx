import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import { getProperties } from "../../services/api";
import { toast } from "react-toastify";

import "leaflet/dist/leaflet.css";

import PropertyMarker from "./PropertyMarker";

import FlyToLocation from "./FlyToLocation";

import FlyToMunicipality from "./FlyToMunicipality";

import MunicipalityBoundary from "./MunicipalityBoundary";

import { userLocationIcon } from "./MapIcons";


const FitBounds = ({ properties }) => {
  const map = useMap();

  useEffect(() => {
    if (!properties.length) return;

    const bounds = L.latLngBounds(
      properties.map((property) => [property.latitude, property.longitude]),
    );

    map.fitBounds(bounds, {
      padding: [80, 80],
      animate: true,
      duration: 1,
    });
  }, [properties, map]);

  return null;
};

const PropertyMap = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  const [selectedType, setSelectedType] = useState("");

  const [search, setSearch] = useState("");

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

  const [selectedMunicipality, setSelectedMunicipality] = useState(null);

  const handleTypeChange = async (type) => {
    setSelectedType(type);

    try {
      const res = await getProperties({
        property_type: type,
      });

      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=np&limit=5&q=${encodeURIComponent(
          `${search}, Nepal`,
        )}`,
      );

      const data = await response.json();

      if (!data.length) {
        toast.error("Location not found");
        return;
      }

      setMapCenter([Number(data[0].lat), Number(data[0].lon)]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLocateMe = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = [position.coords.latitude, position.coords.longitude];

        setMapCenter(location);
        setUserLocation(location);
      },
      () => {
        toast.error("Unable to access your location");
      },
    );
  };

  const handleResetSearch = () => {
    setSearch("");
    setSelectedMunicipality(null);
    setMapCenter(null);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
      <SearchBar
        search={search}
        setSearch={setSearch}
        onLocateMe={handleLocateMe}
        onMunicipalitySelect={setSelectedMunicipality}
        onReset={handleResetSearch}
      />
      <FilterBar selectedType={selectedType} onTypeChange={handleTypeChange} />
      <MapContainer
        center={[27.7172, 85.324]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-[80vh] w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToLocation position={mapCenter} />

        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon} />
        )}

        <FlyToMunicipality municipality={selectedMunicipality} />

        <MunicipalityBoundary municipality={selectedMunicipality} />

        <FitBounds properties={properties} />

        {properties.map((property) => (
          <PropertyMarker key={property._id} property={property} />
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
