import features from "../../../data/features";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose FindMyHome?
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Making property search simpler, safer, and more convenient across
            Nepal.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
