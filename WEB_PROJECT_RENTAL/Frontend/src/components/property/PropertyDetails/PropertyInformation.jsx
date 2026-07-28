import { Sofa, DoorOpen, Route } from "lucide-react";

const PropertyInformation = ({ property }) => {
  const features = [
    {
      title: "Furnished",
      value: property.furnished ? "Yes" : "No",
      icon: Sofa,
    },
    {
      title: "Balcony",
      value: property.balcony ? "Available" : "Not Available",
      icon: DoorOpen,
    },
    {
      title: "Road Connectivity",
      value: property.road_connectivity
        ? "Good Road Access"
        : "Not Specified",
      icon: Route,
    },
  ];

  return (
    <section className="mt-12 rounded-3xl bg-white p-6 shadow-sm md:p-8">
      <h2 className="mb-8 text-2xl font-bold text-slate-900 md:text-3xl">
        Property Information
      </h2>

      <div className="flex flex-wrap gap-5">
        {features.map(({ title, value, icon: Icon }) => (
          <div
            key={title}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:w-[180px]"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Icon size={28} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>

            <p className="mt-2 text-sm font-medium text-slate-500">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyInformation;