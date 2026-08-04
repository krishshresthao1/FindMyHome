import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

const PropertyPopup = ({ property }) => {
  const image =
    property.images && property.images.length > 0
      ? `http://localhost:8000${property.images[0]}`
      : "https://placehold.co/400x300?text=No+Image";

  return (
    <div className="w-64 overflow-hidden rounded-xl bg-white">
      <img
        src={image}
        alt={property.title}
        className="h-36 w-full rounded-xl object-cover"
      />

      <div className="mt-3 space-y-2">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-800">
          {property.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>{property.property_type}</span>
        </div>

        <div className="flex items-center gap-2 text-lg font-bold text-blue-600">
          <Wallet size={18} />
          <span>Rs. {property.rent.toLocaleString()}/month</span>
        </div>

        <Link
          to={`/property/${property._id}`}
          className="mt-3 block rounded-xl bg-blue-600 py-2 text-center font-semibold !text-white transition hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyPopup;
