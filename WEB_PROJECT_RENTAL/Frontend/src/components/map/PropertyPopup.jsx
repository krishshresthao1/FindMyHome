import { Link } from "react-router-dom";

const PropertyPopup = ({ property }) => {
  const image =
    property.images && property.images.length > 0
      ? `http://localhost:8000${property.images[0]}`
      : "https://placehold.co/400x300?text=No+Image";

  return (
    <div className="w-64 overflow-hidden rounded-xl">
      <img
        src={image}
        alt={property.title}
        className="h-36 w-full rounded-lg object-cover"
      />

      <div className="mt-3">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-800">
          {property.title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">📍 {property.location}</p>

        <p className="mt-2 text-lg font-semibold text-blue-600">
          Rs. {property.rent.toLocaleString()}/month
        </p>

        <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
          <span>🛏 {property.bedrooms}</span>
          <span>🛁 {property.bathrooms}</span>
          <span>{property.property_type}</span>
        </div>

        <Link
          to={`/property/${property._id}`}
          className="mt-4 block rounded-xl bg-blue-600 py-2 text-center font-semibold !text-white transition hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyPopup;
