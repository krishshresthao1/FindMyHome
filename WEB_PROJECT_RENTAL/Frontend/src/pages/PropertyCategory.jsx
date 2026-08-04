import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { getProperties } from "../services/api";
import PropertyCard from "../components/property/PropertyCard/PropertyCard";

const PropertyCategory = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getProperties({
          property_type: type,
        });

        setProperties(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperties();
  }, [type]);

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="relative mb-10 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold !text-white shadow-md transition hover:-translate-x-1 hover:bg-blue-700"
          >
            <ArrowLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <h1 className="text-4xl font-bold text-slate-900">
              Explore <span className="text-blue-600">{type}</span> Properties
            </h1>

            <p className="mt-2 text-slate-600">
              {properties.length} {type.toLowerCase()}
              {properties.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>

        {/* Properties */}
        {properties.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-700">
              No properties found
            </h2>

            <p className="mt-2 text-slate-500">
              Currently there are no {type.toLowerCase()} properties available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCategory;
