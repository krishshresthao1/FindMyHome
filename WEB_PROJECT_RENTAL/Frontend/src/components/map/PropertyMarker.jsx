import { Marker, Popup } from "react-leaflet";

import PropertyPopup from "./PropertyPopup";
import { getPropertyIcon } from "./PropertyIcons";

import { propertyIcons, defaultPropertyIcon } from "./MapIcons";

const PropertyMarker = ({ property }) => {
  // Ignore properties without coordinates
  if (
    property.latitude === null ||
    property.longitude === null ||
    property.latitude === undefined ||
    property.longitude === undefined
  ) {
    return null;
  }

  return (
    <Marker
      position={[Number(property.latitude), Number(property.longitude)]}
      icon={propertyIcons[property.property_type] || defaultPropertyIcon}
    >
      <Popup minWidth={260} maxWidth={280}>
        <PropertyPopup property={property} />
      </Popup>
    </Marker>
  );
};

export default PropertyMarker;
