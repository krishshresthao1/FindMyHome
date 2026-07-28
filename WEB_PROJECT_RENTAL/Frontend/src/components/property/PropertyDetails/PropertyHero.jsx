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
} from "lucide-react";

import { useLayout } from "../../../context/LayoutContext";

const PropertyHero = ({ property }) => {
  const totalImages = property.images?.length || 0;

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const [thumbnailStart, setThumbnailStart] = useState(0);

  const { setShowNavbar, setShowFooter } = useLayout();
  
  console.log("ORS TOKEN:", import.meta.env.VITE_ORS_API_KEY);
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
            className="h-[520px] w-full cursor-pointer rounded-3xl object-cover transition hover:scale-[1.01]"
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
        <span className="flex w-fit items-center gap-2 rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
          <ShieldCheck size={18} />
          Verified Owner
        </span>

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

        <div className="mt-8 grid grid-cols-2 gap-5">
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
      </div>
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
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
