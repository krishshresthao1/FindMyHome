import {
  Wifi,
  Droplets,
  Sun,
  Bike,
  Car,
  CookingPot,
  Home,
  Bath,
} from "lucide-react";

const PropertyAmenities = ({ property }) => {
  const amenities = [
    {
      show: property.amenities.wifi,
      icon: <Wifi size={22} />,
      title: "WiFi Available",
    },
    {
      show: property.amenities.solar,
      icon: <Sun size={22} />,
      title: "Solar Hot Water",
    },
    {
      show: property.amenities.governmentWater,
      icon: <Droplets size={22} />,
      title: "Government Water Supply",
    },
    {
      show: property.rooms.toiletStyle === "Western",
      icon: <Bath size={22} />,
      title: "Western Toilet",
    },
    {
      show: property.amenities.separateKitchen,
      icon: <CookingPot size={22} />,
      title: "Separate Kitchen",
    },
    {
      show: property.amenities.bikeParking,
      icon: <Bike size={22} />,
      title: "Bike Parking",
    },
    {
      show: property.amenities.carParking,
      icon: <Car size={22} />,
      title: "Car Parking",
    },
    {
      show: true,
      icon: <Home size={22} />,
      title: `${property.rooms.floor} Floor`,
    },
  ];

  return (
    <section className="mt-12">
      <h2 className="mb-8 text-3xl font-bold">Amenities & Utilities</h2>

      <div className="grid grid-cols-4 gap-6">
        {amenities
          .filter((item) => item.show)
          .map((item) => (
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
    </section>
  );
};

export default PropertyAmenities;
