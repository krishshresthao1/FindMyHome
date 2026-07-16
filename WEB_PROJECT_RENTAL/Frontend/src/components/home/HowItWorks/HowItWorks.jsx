import steps from "../../../data/howItWorks";
import StepCard from "./StepCard";

const HowItWorks = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold">How RentNepal Works</h2>

          <p className="mt-4 text-lg text-slate-600">
            Finding your next rental home takes only three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-10">
          {steps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
