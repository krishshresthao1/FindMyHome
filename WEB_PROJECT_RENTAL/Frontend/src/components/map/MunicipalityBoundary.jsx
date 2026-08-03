import { GeoJSON } from "react-leaflet";

const MunicipalityBoundary = ({ municipality }) => {
  if (!municipality) return null;

  return (
    <GeoJSON
      key={municipality.properties.GaPa_NaPa}
      data={municipality}
      style={{
        color: "#2563eb",
        weight: 3,
        fillColor: "#3b82f6",
        fillOpacity: 0.15,
      }}
    />
  );
};

export default MunicipalityBoundary;
