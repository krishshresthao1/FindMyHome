import { useEffect, useState } from "react";
import { getProperties } from "../services/api";

import PropertyMap from "../components/map/PropertyMap";

const Map = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await getProperties();

      setProperties(res.data);
    } catch (err) {
      console.error("Failed to fetch properties", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-xl font-semibold">
        Loading Map...
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-slate-800">
            Explore Properties
          </h1>

          <p className="mt-2 text-slate-500">
            Browse every available property on an interactive map.
          </p>
        </div>

        <PropertyMap properties={properties} />
      </div>
    </div>
  );
};

export default Map;
