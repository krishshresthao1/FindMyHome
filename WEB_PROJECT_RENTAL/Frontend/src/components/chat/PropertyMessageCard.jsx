import { useNavigate } from "react-router-dom";
import { MapPin, Wallet, ArrowRight } from "lucide-react";

const PropertyMessageCard = ({ property }) => {
  if (!property) return null;
  const navigate = useNavigate();

  const handleViewProperty = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div
      className="
        w-[280px]
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition
        hover:shadow-lg
      "
    >
      {/* Image */}
      <div
        onClick={handleViewProperty}
        className="
          cursor-pointer
          overflow-hidden
        "
      >
        <img
          src={
            property.image
              ? `http://127.0.0.1:8000${property.image}`
              : "/default-property.png"
          }
          alt={property.title}
          className="
            h-40
            w-full
            object-cover
            transition
            duration-300
            hover:scale-105
          "
        />
      </div>

      {/* Details */}
      <div className="p-4">
        <h3
          className="
            truncate
            text-lg
            font-bold
            text-slate-900
          "
        >
          {property.title}
        </h3>

        <div
          className="
            mt-2
            flex
            items-center
            gap-2
            text-sm
            text-slate-500
          "
        >
          <MapPin size={16} />

          <span className="truncate">{property.location}</span>
        </div>

        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            font-semibold
            text-blue-600
          "
        >
          <Wallet size={17} />

          <span>Rs. {property.rent}/month</span>
        </div>

        {/* Button */}
        <button
          onClick={handleViewProperty}
          className="
            mt-4
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          View Details
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PropertyMessageCard;
