import CategoryCard from "./CategoryCard";

const categories = [
  {
    icon: "🏠",
    title: "Rooms",
    listings: 342,
  },
  {
    icon: "🏢",
    title: "Flats",
    listings: 188,
  },
  {
    icon: "🏡",
    title: "Houses",
    listings: 95,
  },
  {
    icon: "🏬",
    title: "Commercial",
    listings: 41,
  },
];

const Categories = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <h2 className="text-4xl font-bold text-slate-900">
            Browse by Category
          </h2>

          <p className="mt-3 text-slate-600">
            Find the type of property that suits your needs.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
