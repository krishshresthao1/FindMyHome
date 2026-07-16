import HeroSearch from "./HeroSearch";
import HeroStats from "./HeroStats";

const HeroContent = () => {
  return (
    <div className="max-w-2xl">
      <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
        Kathmandu Valley Rental Platform
      </span>

      <h1 className="mt-8 text-6xl font-extrabold leading-tight text-slate-900">
        Find Your
        <br />
        Perfect Rental
        <br />
        Home
      </h1>

      <p className="mt-8 text-lg leading-8 text-slate-600">
        Search verified rooms, flats, apartments and houses across Kathmandu
        Valley with transparent pricing and trusted owners.
      </p>

      <HeroSearch />

      <HeroStats />
    </div>
  );
};

export default HeroContent;
