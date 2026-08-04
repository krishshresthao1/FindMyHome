import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import CategoryCard, {
  categories,
} from "../components/home/Categories/CategoryCard";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="relative mb-10 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold !text-white shadow-md transition hover:-translate-x-1 hover:bg-blue-700"
          >
            <ArrowLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <h1 className="text-4xl font-bold text-slate-900">
              Explore Categories
            </h1>

            <p className="mt-2 text-slate-600">
              Choose the type of property you're looking for.
            </p>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
