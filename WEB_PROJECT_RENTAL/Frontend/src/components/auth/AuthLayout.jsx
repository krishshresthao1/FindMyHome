import Logo from "../layouts/Logo/Logo";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        {/* LEFT */}

        <div className="hidden md:flex flex-col justify-center bg-blue-600 p-14 text-white">
          <Logo />

          <h1 className="mt-16 text-5xl font-extrabold">
            Find your
            <br />
            dream home.
          </h1>

          <p className="mt-6 text-blue-100 leading-8">
            Browse thousands of verified rental properties across Nepal.
          </p>

          <div className="mt-10 space-y-4 text-lg">
            <p>Verified Listings</p>

            <p>Trusted Owners</p>

            <p>Secure Experience</p>

            <p>Affordable Rentals</p>
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
