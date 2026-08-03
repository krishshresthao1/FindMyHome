import { useEffect } from "react";
import { useMap } from "react-leaflet";

const FlyToLocation = ({ position, zoom = 15 }) => {
  const map = useMap();

  useEffect(() => {
    if (!position) return;

    map.flyTo(position, zoom, {
      animate: true,
      duration: 1.5,
    });
  }, [position, zoom, map]);

  return null;
};

export default FlyToLocation;
