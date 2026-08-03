import { MapPin, Home, Wallet } from "lucide-react";
import { useProperty } from "../../context/PropertyContext";
import { useState } from "react";
import { useEffect } from "react";

const FilterSection = () => {

  const [showLocations, setShowLocations] = useState(false);
  const {
    location,
    setLocation,

    locations,

    propertyType,
    setPropertyType,

    minPrice,
    setMinPrice,

    maxPrice,
    setMaxPrice,
  } = useProperty();

  const [locationSearch, setLocationSearch] = useState(location);
  useEffect(() => {
    setLocationSearch(location);
  }, [location]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        {/* Location */}
        <div className="relative flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
          <MapPin size={18} className="text-slate-500" />

          <input
            type="text"
            placeholder="Search location"
            value={locationSearch}
            onFocus={() => {
              setShowLocations(true);

              if (locationSearch === "Anywhere") {
                setLocationSearch("");
              }
            }}
            onChange={(e) => {
              setLocationSearch(e.target.value);
              setShowLocations(true);
            }}
            className="w-40 bg-transparent text-sm outline-none"
          />

          {showLocations && (
            <div className="absolute top-12 left-0 z-50 w-full rounded-lg border bg-white shadow-lg">
              <div
                onClick={() => {
                  setLocation("Anywhere");
                  setLocationSearch("Anywhere");
                  setShowLocations(false);
                }}
                className="cursor-pointer px-3 py-2 hover:bg-slate-100"
              >
                Anywhere
              </div>

              {locations
                .filter((item) =>
                  item.toLowerCase().includes(locationSearch.toLowerCase()),
                )
                .map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setLocation(item);
                      setLocationSearch(item);
                      setShowLocations(false);
                    }}
                    className="cursor-pointer px-3 py-2 hover:bg-slate-100"
                  >
                    {item}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Property Type */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
          <Home size={18} className="text-slate-500" />

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Room">Room</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Commercial">Commercial</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        {/* Min Price */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
          <Wallet size={18} className="text-slate-500" />

          <input
            type="number"
            placeholder="Min Rent"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-24 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Max Price */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
          <Wallet size={18} className="text-slate-500" />

          <input
            type="number"
            placeholder="Max Rent"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-24 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            setLocation("Anywhere");
            setLocationSearch("Anywhere");
            setPropertyType("All");
            setMinPrice("");
            setMaxPrice("");
          }}
          className="ml-auto rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium transition hover:bg-slate-100"
        >
          Reset
        </button>
      </div>
    </div>
  );
};



export default FilterSection;
