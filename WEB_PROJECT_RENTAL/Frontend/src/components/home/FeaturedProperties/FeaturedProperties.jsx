import PropertyCard from "../../property/PropertyCard/PropertyCard";
import { useProperty } from "../../../context/PropertyContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturedProperties = () => {
  const { filteredProperties } = useProperty();
  const navigate = useNavigate();

  // Show only first 6 properties
  const featuredProperties = filteredProperties.slice(0, 6);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold text-slate-900">
              Featured Properties
            </h2>

            <p className="mt-3 text-slate-600">
              Hand-picked verified rentals across Kathmandu Valley.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>

        {/* Explore More CTA */}
        <div className="mt-14 rounded-3xl bg-slate-50 p-10 text-center">
          <h3 className="text-2xl font-bold text-slate-900">
            Still searching for your perfect home?
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            These are just a few featured listings. Explore all available
            properties and find a place that matches your location, budget, and
            lifestyle.
          </p>

          <button
            onClick={() => navigate("/search")}
            className="
      mt-6
      inline-flex
      items-center
      gap-2
      rounded-xl
      bg-blue-600
      px-10
      py-4
      font-semibold
      text-white
      shadow-md
      transition
      hover:bg-blue-700
      hover:shadow-lg
    "
          >
            Explore More Properties
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
