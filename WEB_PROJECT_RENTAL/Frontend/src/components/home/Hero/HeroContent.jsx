import { ArrowRight, Plus } from "lucide-react";
import HeroSearch from "./HeroSearch";
import HeroStats from "./HeroStats";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const HeroContent = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="max-w-3xl text-slate-900">
      <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
        Find verified rental properties across Nepal
      </span>

      <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 md:text-7xl">
        Find Your Perfect
        <br />
        Home 
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        Browse verified apartments, houses, flats, rooms using interactive
        maps, powerful filters and trusted property owners.
      </p>

      <div className="mt-10 space-y-8">
        <div className="flex flex-wrap gap-4">
          <Link
            to="/search"
            className="flex items-center gap-2 rounded-xl border border-blue-600 bg-blue-600 px-7 py-4 font-semibold !text-white shadow-md transition hover:bg-blue-500"
          >
            Browse Properties
            <ArrowRight size={20} />
          </Link>

          {user?.role === "owner" && (
            <Link
              to="/add-property"
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-800 shadow-md transition hover:bg-slate-100"
            >
              Post Property
              <Plus size={20} />
            </Link>
          )}
        </div>

        <HeroStats />
      </div>
    </div>
  );
};

export default HeroContent;
