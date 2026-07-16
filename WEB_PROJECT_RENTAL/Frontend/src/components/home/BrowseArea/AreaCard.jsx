const AreaCard = ({ area }) => {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="overflow-hidden">
        <img
          src={area.image}
          alt={area.name}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-slate-900">{area.name}</h3>

        <p className="mt-2 text-slate-500">{area.listings} Properties</p>
      </div>
    </div>
  );
};

export default AreaCard;
