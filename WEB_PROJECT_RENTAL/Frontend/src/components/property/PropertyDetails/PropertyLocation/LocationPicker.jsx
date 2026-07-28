import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";

const LocationMarker = ({ setLocation, setCoordinates }) => {
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
  console.log(data.address);
  console.log("Reverse geocode:", data);

  let location =
    data.address.county ||
    data.address.city ||
    data.address.town ||
    data.address.municipality ||
    "Unknown";

  location = location.replace(" Metropolitan City", "");

  setLocation(location);

} catch (error) {
  console.error(error);
  setLocation("Unknown");
}
    },
  });

  return position ? <Marker position={position} /> : null;
};

const LocationPicker = ({ setLocation, setCoordinates }) => {
  return (
    <div className="relative z-0">
      <MapContainer
        center={[27.7172, 85.324]}
        zoom={13}
        style={{
          height: "400px",
          width: "100%",
        }}
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LocationMarker
          setLocation={setLocation}
          setCoordinates={setCoordinates}
        />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
