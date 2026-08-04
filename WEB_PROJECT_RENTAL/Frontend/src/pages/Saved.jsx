import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";

import { getFavourites } from "../services/api";
import PropertyCard from "../components/property/PropertyCard/PropertyCard";

const Saved = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await getFavourites(token);

        setSavedProperties(res.data);
      } catch (error) {
        console.error("Failed to fetch favourites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg font-medium text-slate-600">
          Loading saved properties...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="rounded-2xl bg-blue-100 p-3">
            <Bookmark className="h-8 w-8 text-blue-600" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Saved Properties
            </h1>

            <p className="mt-2 text-slate-600">
              All the properties you've bookmarked.
            </p>
          </div>
        </div>

        {savedProperties.length === 0 ? (
          <div className="rounded-3xl bg-white p-16 text-center shadow-sm">
            <Bookmark className="mx-auto mb-5 h-14 w-14 text-slate-300" />

            <h2 className="text-2xl font-semibold text-slate-800">
              No saved properties
            </h2>

            <p className="mt-2 text-slate-500">
              Bookmark properties to see them here.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-slate-600">
              {savedProperties.length} saved
              {savedProperties.length === 1 ? " property" : " properties"}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {savedProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Saved;
