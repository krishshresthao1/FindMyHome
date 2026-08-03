import { Search, Building2, Wallet, ArrowRight } from "lucide-react";

const HeroSearch = () => {
  return (
    <div className="mt-12 rounded-3xl bg-white p-5 text-slate-800 shadow-2xl">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4">
          <Search className="text-blue-600" size={20} />
          <input
            type="text"
            placeholder="Search location..."
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4">
          <Building2 className="text-blue-600" size={20} />

          <select className="w-full bg-transparent outline-none">
            <option>Property Type</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Flat</option>
            <option>Room</option>
          </select>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4">
          <Wallet className="text-blue-600" size={20} />

          <select className="w-full bg-transparent outline-none">
            <option>Budget</option>
            <option>Below Rs. 10,000</option>
            <option>Rs. 10k - 20k</option>
            <option>Rs. 20k - 40k</option>
            <option>Above Rs. 40k</option>
          </select>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700">
          Search
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default HeroSearch;
