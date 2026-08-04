import CategoryCard, { categories } from "./CategoryCard";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-left mb-12">
          <h2 className="text-4xl font-bold text-slate-900">
            Explore Properties
          </h2>

          <p className="mt-3 text-slate-600">
            Find the perfect place based on your needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/categories")}
            className="group flex items-center gap-2 rounded-xl border border-blue-600 bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            More Categories
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
