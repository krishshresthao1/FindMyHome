import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const FlyToMunicipality = ({ municipality }) => {
  const map = useMap();

  useEffect(() => {
    if (!municipality) return;

    const layer = L.geoJSON(municipality);

    map.fitBounds(layer.getBounds(), {
      padding: [40, 40],
      animate: true,
      duration: 1,
    });
  }, [municipality, map]);

  return null;
};

export default FlyToMunicipality;
