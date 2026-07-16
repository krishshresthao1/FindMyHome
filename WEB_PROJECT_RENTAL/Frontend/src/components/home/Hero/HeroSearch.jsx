import { Search, MapPin, House, Wallet } from "lucide-react";

const HeroSearch = () => {
  return (
    <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
      <div className="grid grid-cols-4">
        {/* LOCATION */}

        <div className="flex items-center gap-4 rounded-2xl px-5 py-4 transition hover:bg-slate-50">
          <MapPin className="text-blue-600" size={24} />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Location
            </p>

            <input
              type="text"
              placeholder="Kathmandu"
              className="mt-1 w-full border-none bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* PROPERTY */}

        <div className="flex items-center gap-4 rounded-2xl px-5 py-4 transition hover:bg-slate-50">
          <House className="text-blue-600" size={24} />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Property
            </p>

            <select className="mt-1 bg-transparent text-sm font-medium outline-none">
              <option>Room</option>

              <option>Flat</option>

              <option>House</option>

              <option>Shutter</option>
            </select>
          </div>
        </div>

        {/* BUDGET */}

        <div className="flex items-center gap-4 rounded-2xl px-5 py-4 transition hover:bg-slate-50">
          <Wallet className="text-blue-600" size={24} />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Budget
            </p>

            <select className="mt-1 bg-transparent text-sm font-medium outline-none">
              <option>Below Rs.10k</option>

              <option>10k - 20k</option>

              <option>20k - 30k</option>

              <option>30k+</option>
            </select>
          </div>
        </div>

        {/* BUTTON */}

        <div className="flex items-center justify-center">
          <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-5 font-semibold text-white transition duration-300 hover:bg-blue-700">
            <Search size={20} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
