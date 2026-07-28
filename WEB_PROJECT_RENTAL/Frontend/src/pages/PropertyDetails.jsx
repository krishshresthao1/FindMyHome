import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";

import PropertyHero from "../components/property/PropertyDetails/PropertyHero";
import PropertyInformation from "../components/property/PropertyDetails/PropertyInformation";
import NearbyPlaces from "../components/property/PropertyDetails/NearbyPlaces";
import PropertyLocation from "../components/property/PropertyDetails/PropertyLocation/PropertyLocation";
import OwnerCard from "../components/property/OwnerCard/OwnerCard";

import { getPropertyById } from "../services/api";

import { useNavigate } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await getPropertyById(id);

        setProperty(response.data);
      } catch (error) {
        console.error("Failed to load property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div className="py-20 text-center text-xl">Loading property...</div>;
  }

  return (
    <section className="bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <button
          onClick={() => navigate(-1)}
          className="group mb-8 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold !text-white shadow-md transition-all duration-300 hover:-translate-x-1 hover:bg-blue-700 hover:shadow-lg"
        >
          <ArrowLeft
            size={20}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Properties
        </button>

        <PropertyHero property={property} />

        <PropertyInformation property={property} />

        <NearbyPlaces property={property} />

        <PropertyLocation property={property} />

        <OwnerCard property={property} />
      </div>
    </section>
  );
};

export default PropertyDetails;
