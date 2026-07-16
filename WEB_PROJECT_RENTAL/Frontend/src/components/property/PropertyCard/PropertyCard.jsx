import { Link } from "react-router-dom";
import {
  BadgeCheck,
  BedDouble,
  Bath,
  Wifi,
  Sun,
  Bike,
  Car,
  MapPin,
} from "lucide-react";

const PropertyCard = ({ property }) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}

      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
          {property.propertyType}
        </div>

        {property.verified && (
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-sm font-semibold text-white">
            <BadgeCheck size={16} />
            Verified
          </div>
        )}
      </div>

      {/* Body */}

      <div className="space-y-5 p-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">
            {property.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-slate-500">
            <MapPin size={18} />
            {property.location}
          </div>
        </div>

        <div className="text-3xl font-bold text-blue-600">
          Rs. {property.price.toLocaleString()}
          <span className="text-base font-medium text-slate-500">/month</span>
        </div>

        {/* Property Features */}

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <BedDouble size={18} />
            {property.bedrooms} Bedroom
          </div>

          <div className="flex items-center gap-2">
            <Bath size={18} />
            {property.bathroomType}
          </div>

          {property.wifi && (
            <div className="flex items-center gap-2">
              <Wifi size={18} />
              WiFi
            </div>
          )}

          {property.solar && (
            <div className="flex items-center gap-2">
              <Sun size={18} />
              Solar
            </div>
          )}

          {property.bikeParking && (
            <div className="flex items-center gap-2">
              <Bike size={18} />
              Bike Parking
            </div>
          )}

          {property.carParking && (
            <div className="flex items-center gap-2">
              <Car size={18} />
              Car Parking
            </div>
          )}
        </div>

        {/* Nepal Specific */}

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm">🚽 {property.toiletStyle} Toilet</p>

          <p className="mt-2 text-sm">🚶 {property.roadDistance}</p>

          <p className="mt-2 text-sm">🚌 Bus Stop: {property.busStop}</p>
        </div>

        <Link
          to={`/property/${property.id}`}
          className="block rounded-2xl bg-blue-600 py-4 text-center font-semibold text-white transition hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
