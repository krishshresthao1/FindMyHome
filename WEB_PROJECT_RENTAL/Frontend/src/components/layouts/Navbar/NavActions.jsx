import { Link } from "react-router-dom";
import Button from "../../common/Button/Button";

const NavActions = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        to="/saved"
        className="text-sm font-medium text-slate-700 transition-colors hover:text-blue-600"
      >
        Bookmark
      </Link>

    </div>
  );
};

export default NavActions;
