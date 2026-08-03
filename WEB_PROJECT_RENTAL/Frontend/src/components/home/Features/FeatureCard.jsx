const FeatureCard = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <div
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-8
      transition
      duration-300
      hover:-translate-y-2
      hover:shadow-xl
      "
    >
      <div
        className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-blue-50
        text-blue-600
        "
      >
        <Icon size={30} />
      </div>

      <h3 className="mt-7 text-xl font-bold text-slate-900">{feature.title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;
