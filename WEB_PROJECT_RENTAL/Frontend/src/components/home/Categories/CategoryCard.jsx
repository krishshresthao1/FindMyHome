const CategoryCard = ({ icon, title, listings }) => {
  return (
    <div
      className="
      group
      cursor-pointer
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-blue-200
      hover:shadow-xl
      "
    >
      <div className="text-5xl">{icon}</div>

      <h3 className="mt-8 text-2xl font-bold text-slate-900">{title}</h3>

      <p className="mt-2 text-slate-500">{listings} Listings</p>

      <div
        className="
        mt-10
        font-semibold
        text-blue-600
        opacity-0
        transition-all
        duration-300
        group-hover:opacity-100
        "
      >
        Browse →
      </div>
    </div>
  );
};

export default CategoryCard;
