import { Link } from "react-router-dom";
import { useState } from "react";
import {
  BadgeCheck,
  MapPin,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useProperty } from "../../../context/PropertyContext";
import { toggleFavourite } from "../../../services/api";
const PropertyCard = ({ property }) => {
  const { favourites, setFavourites } = useProperty();
  const isFavourite = favourites.includes(property._id);
  const [currentImage, setCurrentImage] = useState(0);

  const totalImages = property.images?.length || 0;

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrentImage((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const previousImage = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrentImage((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };
  const handleFavourite = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await toggleFavourite(property._id, token);

      if (response.data.isFavourite) {
        setFavourites([...favourites, property._id]);
      } else {
        setFavourites(favourites.filter((id) => id !== property._id));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={
            property.images?.length
              ? `${import.meta.env.VITE_API_URL}${property.images[currentImage]}`
              : "https://via.placeholder.com/500"
          }
          alt={property.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Image arrows */}
        {totalImages > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow transition hover:scale-110"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow transition hover:scale-110"
            >
              <ChevronRight size={18} />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white">
              {currentImage + 1} / {totalImages}
            </div>
          </>
        )}

        {/* Favourite */}
        <button
          onClick={handleFavourite}
          className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md transition hover:scale-110"
        >
          <Heart
            size={20}
            className={
              isFavourite ? "fill-red-500 text-red-500" : "text-slate-600"
            }
          />
        </button>
      </div>
      {/* Content */}
      <div className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-1 text-xl font-semibold text-slate-900">
            {property.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={16} />
            {property.location}
          </div>
        </div>

        {/* Rent */}
        <div className="text-2xl font-bold text-blue-600">
          Rs. {property.rent?.toLocaleString()}
          <span className="text-sm font-normal text-slate-500"> / month</span>
        </div>

        <Link
          to={`/property/${property._id}`}
          className="block rounded-xl bg-blue-600 py-3 text-center font-medium !text-white hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
