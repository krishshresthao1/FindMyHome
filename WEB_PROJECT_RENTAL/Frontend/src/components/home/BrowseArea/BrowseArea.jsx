import areas from "../../../data/areas";
import AreaCard from "./AreaCard";

const BrowseArea = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <h2 className="text-4xl font-bold text-slate-900">
            Browse Popular Areas
          </h2>

          <p className="mt-3 text-slate-600">
            Explore rentals from the most popular locations inside Kathmandu
            Valley.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {areas.map((area) => (
            <AreaCard key={area.id} area={area} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseArea;
