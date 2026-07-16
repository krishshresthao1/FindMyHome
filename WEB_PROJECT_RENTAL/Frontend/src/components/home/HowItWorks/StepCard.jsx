const StepCard = ({ step }) => {
  return (
    <div className="relative rounded-3xl bg-white p-10 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="absolute right-8 top-8 text-6xl font-extrabold text-slate-100">
        {step.number}
      </div>

      <div className="mb-6 text-6xl">{step.icon}</div>

      <h3 className="text-2xl font-bold text-slate-900">{step.title}</h3>

      <p className="mt-4 leading-7 text-slate-600">{step.description}</p>
    </div>
  );
};

export default StepCard;
