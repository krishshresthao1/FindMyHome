import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

const NavActions = () => {
  const navigate = useNavigate();

  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully!");

    navigate("/");
  };

  return (
    <div className="flex items-center gap-4">
      <Link
        to="/saved"
        className="text-sm font-medium text-slate-700 hover:text-blue-600"
      >
        Bookmark
      </Link>

      <button
        onClick={() => setShowLogout(true)}
        className="rounded-xl bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700 transition"
      >
        Logout
      </button>

      {showLogout &&
        createPortal(
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
            <div className="w-[350px] rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gray-800">Logout?</h2>

              <p className="mt-2 text-gray-500">
                Are you sure you want to logout from your account?
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowLogout(false)}
                  className="rounded-xl border px-4 py-2 text-gray-600"
                >
                  Cancel
                </button>

                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default NavActions;
