import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 select-none">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
        <FaHome className="text-xl" />
      </div>

      <div className="leading-tight">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
          Find My Home
        </h1>

        <p className="text-xs text-slate-500">Kathmandu Rentals</p>
      </div>
    </Link>
  );
};

export default Logo;
