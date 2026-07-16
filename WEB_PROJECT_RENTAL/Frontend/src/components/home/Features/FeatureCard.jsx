const FeatureCard = ({ feature }) => {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="text-5xl">{feature.icon}</div>

      <h3 className="mt-8 text-2xl font-bold">{feature.title}</h3>

      <p className="mt-4 leading-7 text-slate-600">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;
