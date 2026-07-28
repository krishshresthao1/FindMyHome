

import PropertyCard from "../../property/PropertyCard/PropertyCard";
import { useProperty } from "../../../context/PropertyContext";


const FeaturedProperties = () => {
  const { filteredProperties } = useProperty();

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold">Featured Properties</h2>

            <p className="mt-3 text-slate-600">
              Hand-picked verified rentals across Kathmandu Valley.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
