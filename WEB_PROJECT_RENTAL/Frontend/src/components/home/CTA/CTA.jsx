import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-blue-600 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] bg-gradient-to-r from-blue-600 to-indigo-700 px-16 py-20 text-center text-white shadow-2xl">
          <h2 className="text-5xl font-extrabold">
            Ready to Find Your Next Home?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Browse verified rooms, flats, apartments and houses across Kathmandu
            Valley. Connect directly with owners and find the perfect place to
            call home.
          </p>

          <div className="mt-12 flex justify-center gap-6">
            <Link
              to="/search"
              className="rounded-2xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:scale-105"
            >
              Explore Properties
            </Link>

            <Link
              to="/post-property"
              className="rounded-2xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-blue-700"
            >
              Post Property
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
