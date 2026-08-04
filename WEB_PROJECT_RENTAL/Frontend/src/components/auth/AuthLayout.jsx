import Logo from "../layouts/Logo/Logo";
import { FaShieldAlt, FaMapMarkedAlt, FaLock } from "react-icons/fa";
import heroImage from "../../assets/images/main/bg.jpg";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div
        className={`grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2 ${
          title.toLowerCase().includes("login") ? "max-w-5xl" : "max-w-6xl"
        }`}
      >
        {/* LEFT */}
        {/* LEFT */}
        <div className="relative hidden overflow-hidden rounded-l-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 md:flex">
          {/* Background Image */}
          <img
            src={heroImage}
            alt="Find My Home"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />

          {/* Blue Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-700/80 via-blue-600/75 to-blue-500/80" />

          {/* Decorative Blur */}
          <div className="absolute -top-20 -left-20 z-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-1/3 -right-16 z-10 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 z-10 h-56 w-56 rounded-full bg-blue-300/10 blur-3xl" />

          {/* Content */}
          <div className="relative z-20 flex h-full w-full flex-col p-14 text-white">
            {/* Logo */}
            <Logo />

            {/* Hero Content */}
            <div className="mt-16 max-w-md">
              <h1 className="text-5xl font-black leading-tight">
                Welcome to
                <br />
                Find My Home
              </h1>

              <p className="mt-5 text-lg leading-8 text-white/90">
                Nepal's modern platform for finding verified rental properties.
              </p>

              {/* Features */}
              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                    <FaShieldAlt className="text-lg text-white" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Verified Listings</h3>
                    <p className="text-sm text-white/80">
                      Browse trusted rental properties.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                    <FaMapMarkedAlt className="text-lg text-white" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Smart Search</h3>
                    <p className="text-sm text-white/80">
                      Explore homes with interactive maps.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                    <FaLock className="text-lg text-white" />
                  </div>

                  <div>
                    <h3 className="font-semibold">Secure Access</h3>
                    <p className="text-sm text-white/80">
                      Your account is protected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-slate-800">{title}</h2>

            <p className="mt-2 text-slate-500">{subtitle}</p>

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
