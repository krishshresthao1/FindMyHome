import { MapPin, Home, Wallet, Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="mt-12 rounded-3xl bg-white p-5 shadow-2xl">
      <div className="grid grid-cols-4">
        {/* Location */}

        <div className="border-r border-slate-200 px-6">
          <div className="mb-2 flex items-center gap-2">
            <MapPin size={18} className="text-blue-600" />

            <span className="text-sm font-semibold uppercase text-slate-500">
              Location
            </span>
          </div>

          <select className="w-full bg-transparent text-lg outline-none">
            <option>Any Area</option>

            <option>Baneshwor</option>

            <option>Koteshwor</option>

            <option>Maharajgunj</option>

            <option>Kalanki</option>

            <option>Baluwatar</option>

            <option>Satdobato</option>

            <option>Kirtipur</option>

            <option>Bhaktapur</option>
          </select>
        </div>

        {/* Property */}

        <div className="border-r border-slate-200 px-6">
          <div className="mb-2 flex items-center gap-2">
            <Home size={18} className="text-blue-600" />

            <span className="text-sm font-semibold uppercase text-slate-500">
              Property
            </span>
          </div>

          <select className="w-full bg-transparent text-lg outline-none">
            <option>Any Type</option>

            <option>Room</option>

            <option>Flat</option>

            <option>House</option>

            <option>Commercial</option>
          </select>
        </div>

        {/* Budget */}

        <div className="border-r border-slate-200 px-6">
          <div className="mb-2 flex items-center gap-2">
            <Wallet size={18} className="text-blue-600" />

            <span className="text-sm font-semibold uppercase text-slate-500">
              Budget
            </span>
          </div>

          <select className="w-full bg-transparent text-lg outline-none">
            <option>Any Budget</option>

            <option>Below Rs.10,000</option>

            <option>Rs.10k - Rs.20k</option>

            <option>Rs.20k - Rs.35k</option>

            <option>Rs.35k+</option>
          </select>
        </div>

        {/* Button */}

        <div className="flex items-center justify-center px-5">
          <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-5 text-lg font-semibold text-white transition hover:bg-blue-700">
            <Search size={22} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
