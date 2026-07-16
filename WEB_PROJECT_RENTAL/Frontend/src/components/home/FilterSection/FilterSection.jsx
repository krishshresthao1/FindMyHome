import { MapPin, Home, Wallet, Wifi, Sun, Bike } from "lucide-react";

import { useProperty } from "../../../context/PropertyContext";

const FilterSection = () => {
  const {
    location,
    setLocation,

    propertyType,
    setPropertyType,

    budget,
    setBudget,

    wifi,
    setWifi,

    solar,
    setSolar,

    bikeParking,
    setBikeParking,
  } = useProperty();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <h2 className="mb-8 text-2xl font-bold">Filters</h2>

      {/* LOCATION */}

      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2 font-semibold">
          <MapPin size={18} />
          Location
        </label>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
        >
          <option>Anywhere</option>

          <option>New Baneshwor</option>

          <option>Koteshwor</option>

          <option>Kirtipur</option>

          <option>Lalitpur</option>

          <option>Thamel</option>
        </select>
      </div>

      {/* PROPERTY */}

      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2 font-semibold">
          <Home size={18} />
          Property Type
        </label>

        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
        >
          <option>All</option>

          <option>Room</option>

          <option>Flat</option>

          <option>House</option>

          <option>Commercial</option>
        </select>
      </div>

      {/* BUDGET */}

      <div className="mb-8">
        <label className="mb-2 flex items-center gap-2 font-semibold">
          <Wallet size={18} />
          Budget
        </label>

        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
        >
          <option>Any</option>

          <option value="Below 10000">Below Rs.10,000</option>

          <option value="10000-20000">Rs.10k – Rs.20k</option>

          <option value="20000-35000">Rs.20k – Rs.35k</option>

          <option value="35000+">Above Rs.35k</option>
        </select>
      </div>

      <hr className="mb-8" />

      <h3 className="mb-5 text-lg font-bold">Amenities</h3>

      <div className="space-y-4">
        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
          <div className="flex items-center gap-3">
            <Wifi size={18} />
            WiFi
          </div>

          <input
            type="checkbox"
            checked={wifi}
            onChange={(e) => setWifi(e.target.checked)}
          />
        </label>

        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
          <div className="flex items-center gap-3">
            <Sun size={18} />
            Solar Water
          </div>

          <input
            type="checkbox"
            checked={solar}
            onChange={(e) => setSolar(e.target.checked)}
          />
        </label>

        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
          <div className="flex items-center gap-3">
            <Bike size={18} />
            Bike Parking
          </div>

          <input
            type="checkbox"
            checked={bikeParking}
            onChange={(e) => setBikeParking(e.target.checked)}
          />
        </label>
      </div>

      <button
        className="mt-8 w-full rounded-xl border border-slate-300 py-3 font-semibold transition hover:bg-slate-100"
        onClick={() => {
          setLocation("Anywhere");
          setPropertyType("All");
          setBudget("Any");
          setWifi(false);
          setSolar(false);
          setBikeParking(false);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
