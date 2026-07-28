import {
  MapPin,
  Bus,
  School,
  Hospital,
  ShoppingCart,
  Fuel,
  Landmark,
  Pill,
} from "lucide-react";
import PropertyMap from "../../PropertyMap";

const PropertyLocation = ({ property }) => {
  const nearbyPlaces = [
    {
      show: property.bus_stop,
      icon: <Bus size={22} />,
      title: "Bus Stop",
      distance: "Nearby",
    },

    {
      show: property.grocery_store,
      icon: <ShoppingCart size={22} />,
      title: "Grocery Store",
      distance: "Nearby",
    },

    {
      show: property.school,
      icon: <School size={22} />,
      title: "School",
      distance: "Nearby",
    },

    {
      show: property.hospital,
      icon: <Hospital size={22} />,
      title: "Hospital",
      distance: "Nearby",
    },

    {
      show: property.pharmacy,
      icon: <Pill size={22} />,
      title: "Pharmacy",
      distance: "Nearby",
    },

    {
      show: property.atm,
      icon: <Landmark size={22} />,
      title: "ATM",
      distance: "Nearby",
    },

    {
      show: property.road_connectivity,
      icon: <Fuel size={22} />,
      title: "Road Connectivity",
      distance: "Available",
    },
  ];

  return (
    <section className="mt-12">
      {/* Map */}

      <div className="mt-10 overflow-hidden rounded-3xl">
        <PropertyMap property={property} />
      </div>
    </section>
  );
};

export default PropertyLocation;
