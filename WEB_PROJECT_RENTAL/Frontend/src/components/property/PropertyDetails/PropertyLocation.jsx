import {
  MapPin,
  Bus,
  School,
  Hospital,
  ShoppingCart,
  Fuel,
  Landmark,
} from "lucide-react";

const PropertyLocation = ({ property }) => {
  const nearbyPlaces = [
    {
      icon: <Bus size={22} />,
      title: "Bus Stop",
      distance: property.accessibility.busStop,
    },
    {
      icon: <ShoppingCart size={22} />,
      title: "Grocery",
      distance: property.nearby.grocery,
    },
    {
      icon: <School size={22} />,
      title: "School",
      distance: property.nearby.school,
    },
    {
      icon: <Hospital size={22} />,
      title: "Hospital",
      distance: property.nearby.hospital,
    },
    {
      icon: <Fuel size={22} />,
      title: "Petrol Pump",
      distance: property.nearby.petrolPump,
    },
    {
      icon: <Landmark size={22} />,
      title: "ATM",
      distance: property.nearby.atm,
    },
  ];

  return (
    <section className="mt-12">
      <h2 className="mb-8 text-3xl font-bold">Location & Nearby</h2>

      <div className="grid grid-cols-12 gap-8">
        {/* Left */}

        <div className="col-span-7">
          <div className="flex items-center gap-3">
            <MapPin className="text-blue-600" />

            <h3 className="text-2xl font-semibold">
              {property.location}, Kathmandu
            </h3>
          </div>

          <p className="mt-4 leading-7 text-slate-600">
            Located in a peaceful residential area with convenient access to
            schools, hospitals, public transport and daily essentials.
          </p>

          <div className="mt-8 rounded-2xl bg-blue-50 p-6">
            <h4 className="text-lg font-bold">Accessibility</h4>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span>Main Road</span>

                <span className="font-semibold">
                  🚶 {property.accessibility.roadDistance}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Vehicle Access</span>

                <span className="font-semibold">
                  {property.accessibility.roadDistance ===
                  "Vehicle reaches gate"
                    ? "Car reaches gate"
                    : "Walkable"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="col-span-5 rounded-3xl bg-white p-8 shadow">
          <h3 className="mb-6 text-xl font-bold">Nearby Places</h3>

          <div className="space-y-5">
            {nearbyPlaces.map((place) => (
              <div
                key={place.title}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-slate-100 p-2">
                    {place.icon}
                  </div>

                  {place.title}
                </div>

                <span className="font-semibold">{place.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map */}

      <div className="mt-10 flex h-[420px] items-center justify-center rounded-3xl bg-slate-200 text-2xl font-bold text-slate-500">
        Google Maps Integration (Coming Soon)
      </div>
    </section>
  );
};

export default PropertyLocation;
