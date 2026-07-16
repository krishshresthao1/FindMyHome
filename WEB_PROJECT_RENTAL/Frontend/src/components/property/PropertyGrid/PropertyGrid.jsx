import PropertyCard from "../PropertyCard/PropertyCard";
import { useProperty } from "../../../context/PropertyContext";

const PropertyGrid = () => {
  const { filteredProperties } = useProperty();

  return (
    <>
      {/* Header */}

      <div className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-5">
        <div>
          <h2 className="text-2xl font-bold">
            {filteredProperties.length} Properties Found
          </h2>

          <p className="mt-1 text-slate-500">
            Showing verified rental listings.
          </p>
        </div>

        <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none">
          <option>Newest</option>

          <option>Price: Low to High</option>

          <option>Price: High to Low</option>
        </select>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-2 gap-8">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </>
  );
};

export default PropertyGrid;
