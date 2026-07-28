import { ShoppingCart, School, Hospital, Bus, Pill } from "lucide-react";

const NearbyPlaces = ({ property }) => {
  const places = [
    {
      title: "Grocery Store",
      icon: ShoppingCart,
      available: property.grocery_store,
    },
    {
      title: "School",
      icon: School,
      available: property.school,
    },
    {
      title: "Hospital",
      icon: Hospital,
      available: property.hospital,
    },
    {
      title: "Bus Stop",
      icon: Bus,
      available: property.bus_stop,
    },
    {
      title: "Pharmacy",
      icon: Pill,
      available: property.pharmacy,
    },
  ];

  // Only keep nearby places
  const nearbyPlaces = places.filter((place) => place.available);

  return (
    <section className="mt-12 rounded-3xl bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-8 text-2xl font-bold text-slate-900 md:text-3xl">
        Nearby Places
      </h2>

      {nearbyPlaces.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-slate-500">
            No nearby places have been specified for this property.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5">
          {nearbyPlaces.map(({ title, icon: Icon }) => (
            <div
              key={title}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:w-[180px]"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Icon size={24} />
              </div>

              <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>

              <p className="mt-1 text-sm text-green-600 font-medium">Nearby</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NearbyPlaces;
