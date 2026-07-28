import {
  Sun,
  Car,
  CookingPot,
  Home,
  Bath,
  School,
  Hospital,
  ShoppingCart,
  Dumbbell,
  Bus,
  Pill,
  Landmark,
  Utensils,
} from "lucide-react";

const PropertyAmenities = ({ property }) => {
  const amenities = [
    {
      show: property.furnished,
      icon: <Home size={22} />,
      title: "Furnished",
    },

    {
      show: property.balcony,
      icon: <Sun size={22} />,
      title: "Balcony Available",
    },

    {
      show: property.road_connectivity,
      icon: <Car size={22} />,
      title: "Good Road Connectivity",
    },

    {
      show: property.parking > 0,
      icon: <Car size={22} />,
      title: `${property.parking} Parking`,
    },

    {
      show: property.kitchens > 0,
      icon: <CookingPot size={22} />,
      title: `${property.kitchens} Kitchen`,
    },

    {
      show: property.bathrooms > 0,
      icon: <Bath size={22} />,
      title: `${property.bathrooms} Bathrooms`,
    },

    {
      show: property.school,
      icon: <School size={22} />,
      title: "School Nearby",
    },

    {
      show: property.hospital,
      icon: <Hospital size={22} />,
      title: "Hospital Nearby",
    },

    {
      show: property.grocery_store,
      icon: <ShoppingCart size={22} />,
      title: "Grocery Store Nearby",
    },

    {
      show: property.gym,
      icon: <Dumbbell size={22} />,
      title: "Gym Available",
    },

    {
      show: property.bus_stop,
      icon: <Bus size={22} />,
      title: "Bus Stop Nearby",
    },

    {
      show: property.pharmacy,
      icon: <Pill size={22} />,
      title: "Pharmacy Nearby",
    },

    {
      show: property.atm,
      icon: <Landmark size={22} />,
      title: "ATM Nearby",
    },

    {
      show: property.restaurant,
      icon: <Utensils size={22} />,
      title: "Restaurant Nearby",
    },
  ];

  const availableAmenities = amenities.filter((item) => item.show);

  return (
    <section className="mt-12">
      <h2 className="mb-8 text-3xl font-bold">Amenities & Utilities</h2>

      {availableAmenities.length === 0 ? (
        <p className="text-slate-500">No amenities listed for this property.</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {availableAmenities.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                {item.icon}
              </div>

              <p className="font-semibold">{item.title}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PropertyAmenities;
