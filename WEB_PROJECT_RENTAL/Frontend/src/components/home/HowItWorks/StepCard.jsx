const StepCard = ({ step }) => {
  const Icon = step.icon;

  return (
    <div
      className="
      relative
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-10
      transition
      duration-300
      hover:-translate-y-2
      hover:shadow-xl
      "
    >
      {/* Step number */}
      <div
        className="
        absolute
        right-8
        top-6
        text-6xl
        font-extrabold
        text-slate-100
      "
      >
        {step.number}
      </div>

      {/* Icon */}
      <div
        className="
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-2xl
        bg-blue-50
        text-blue-600
        "
      >
        <Icon size={34} />
      </div>

      <h3
        className="
        mt-8
        text-2xl
        font-bold
        text-slate-900
      "
      >
        {step.title}
      </h3>

      <p
        className="
        mt-4
        leading-7
        text-slate-600
      "
      >
        {step.description}
      </p>
    </div>
  );
};

export default StepCard;
