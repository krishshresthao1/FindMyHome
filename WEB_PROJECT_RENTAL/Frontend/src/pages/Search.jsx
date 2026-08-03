import FilterSection from "../components/FilterSection/FilterSection";
import PropertyGrid from "../components/property/PropertyGrid/PropertyGrid";

const Search = () => {
  return (
    <section className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-6">

        {/* Filter Section */}
        <div className="mb-8">
          <FilterSection />
        </div>

        {/* Property Grid */}
        <PropertyGrid />
      </div>
    </section>
  );
};

export default Search;