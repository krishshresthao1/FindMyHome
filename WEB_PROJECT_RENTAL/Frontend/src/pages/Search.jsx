import FilterSection from "../components/home/FilterSection/FilterSection";
import PropertyGrid from "../components/property/PropertyGrid/PropertyGrid";

const Search = () => {
  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Page Header */}

        <div className="mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
            Browse Properties
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Discover verified rental properties across Kathmandu Valley.
          </p>
        </div>

        {/* Layout */}

        <div className="flex gap-8">
          {/* Left */}

          <aside className="w-80 flex-shrink-0">
            <FilterSection />
          </aside>

          {/* Right */}

          <main className="flex-1">
            <PropertyGrid />
          </main>
        </div>
      </div>
    </section>
  );
};

export default Search;
