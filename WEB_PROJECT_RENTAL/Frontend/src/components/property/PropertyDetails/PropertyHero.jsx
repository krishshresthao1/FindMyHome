import { useEffect, useState } from "react";

import {
  MapPin,
  ShieldCheck,
  BedDouble,
  Bath,
  Wallet,
  Car,
  X,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useLayout } from "../../../context/LayoutContext";

const PropertyHero = ({ property, onChat }) => {
  const totalImages = property.images?.length || 0;

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const [thumbnailStart, setThumbnailStart] = useState(0);

  const { setShowNavbar, setShowFooter } = useLayout();

  const navigate = useNavigate();

  const changeImage = (index) => {
    setCurrentImage(index);

    // keep thumbnails synced
    if (index < thumbnailStart) {
      setThumbnailStart(index);
    }

    if (index >= thumbnailStart + 4) {
      setThumbnailStart(index - 3);
    }
  };

  useEffect(() => {
    return () => {
      setShowNavbar(true);
      setShowFooter(true);
    };
  }, [setShowNavbar, setShowFooter]);

  return (
    <section className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      {/* LEFT SIDE - IMAGES */}

      <div className="col-span-1 lg:col-span-8">
        {/* Main Image */}
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="
              absolute
              left-5
              top-25
              z-20
              flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              font-semibold
              text-slate-100
              shadow-lg
              transition
              hover:bg-blue-700
              "
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="relative">
          <img
            src={
              property.images?.length > 0
                ? `http://127.0.0.1:8000${property.images[currentImage]}`
                : "/placeholder.jpg"
            }
            alt={property.title}
            onClick={() => {
              setSelectedImage(currentImage);
              setShowNavbar(false);
              setShowFooter(false);
            }}
            className="h-[540px] mt-4 w-full cursor-pointer rounded-3xl object-cover transition hover:scale-[1.01]"
          />

          {/* Main image arrows */}

          {totalImages > 1 && (
            <>
              {/* Previous */}
              <button
                onClick={() => {
                  const previous =
                    currentImage === 0 ? totalImages - 1 : currentImage - 1;

                  changeImage(previous);
                }}
                className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow transition hover:scale-110"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Next */}
              <button
                onClick={() => {
                  const next =
                    currentImage === totalImages - 1 ? 0 : currentImage + 1;

                  changeImage(next);
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow transition hover:scale-110"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          {/* Counter */}

          {totalImages > 1 && (
            <div className="absolute bottom-5 right-5 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white">
              {currentImage + 1} / {totalImages}
            </div>
          )}
        </div>

        {/* Gallery */}

        {totalImages > 1 && (
          <div className="relative mt-4">
            <div className="grid grid-cols-4 gap-4">
              {property.images
                .slice(thumbnailStart, thumbnailStart + 4)
                .map((image, index) => {
                  const realIndex = thumbnailStart + index;

                  return (
                    <img
                      key={realIndex}
                      src={`http://127.0.0.1:8000${image}`}
                      onClick={() => changeImage(realIndex)}
                      className={`h-28 w-full cursor-pointer rounded-2xl object-cover transition ${
                        currentImage === realIndex
                          ? "ring-4 ring-blue-600"
                          : "hover:opacity-80"
                      }`}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}

      <div className="col-span-1 lg:col-span-4">
        <h1 className="mt-5 text-4xl font-bold text-slate-900">
          {property.title}
        </h1>

        <div className="mt-3 flex items-center gap-2 text-slate-500">
          <MapPin size={18} />

          {property.location}
        </div>

        <div className="mt-6 text-5xl font-bold text-blue-600">
          Rs. {property.rent?.toLocaleString()}
          <span className="text-xl font-medium text-slate-500">/month</span>
        </div>

        {/* BASIC INFO CARDS */}

        <div className="mt-6 grid grid-cols-2 gap-5">
          <div className="rounded-xl bg-slate-100 p-4">
            <BedDouble />

            <p className="mt-2 font-semibold">{property.bedrooms} Bedrooms</p>
          </div>

          <div className="rounded-xl bg-slate-100 p-4">
            <Bath />

            <p className="mt-2 font-semibold">{property.bathrooms} Bathrooms</p>
          </div>

          <div className="rounded-xl bg-slate-100 p-4">
            <Car />

            <p className="mt-2 font-semibold">{property.parking} Parking</p>
          </div>

          <div className="rounded-xl bg-slate-100 p-4">
            <ChefHat />

            <p className="mt-2 font-semibold">{property.kitchens} Kitchen</p>
          </div>
        </div>
        {/* OWNER SECTION */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            {/* Owner Info */}

            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-100
                  font-bold
                  text-blue-600
                  "
              >
                {property.owner_name?.charAt(0)}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">
                    {property.owner_name}
                  </h3>

                  <ShieldCheck size={18} className="text-green-600" />
                </div>

                <p className="text-sm text-slate-500">Verified Owner</p>
              </div>
            </div>
          </div>

          {/* Message Button */}

          <button
            onClick={onChat}
            className="
              mt-5
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              py-3
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              "
          >
            <MessageCircle size={18} />
            Contact Owner
          </button>
        </div>
      </div>
      {selectedImage !== null && (
        <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/90">
          {/* Close */}
          <button
            onClick={() => {
              setSelectedImage(null);
              setShowNavbar(true);
              setShowFooter(true);
            }}
            className="absolute right-8 top-8 rounded-full bg-white p-3 text-black transition hover:scale-110"
          >
            <X size={28} />
          </button>

          {/* Previous */}
          {property.images.length > 1 && (
            <button
              onClick={() =>
                setSelectedImage(
                  selectedImage === 0
                    ? property.images.length - 1
                    : selectedImage - 1,
                )
              }
              className="absolute left-8 rounded-full bg-white p-3 text-black hover:scale-110"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Image */}

          <img
            src={`http://127.0.0.1:8000${property.images[selectedImage]}`}
            alt={property.title}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
          />

          {/* Next */}

          {property.images.length > 1 && (
            <button
              onClick={() =>
                setSelectedImage(
                  selectedImage === property.images.length - 1
                    ? 0
                    : selectedImage + 1,
                )
              }
              className="absolute right-8 rounded-full bg-white p-3 text-black hover:scale-110"
            >
              <ChevronRight size={32} />
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default PropertyHero;
