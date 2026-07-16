import features from "../../../data/features";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">Why Choose RentNepal?</h2>

          <p className="mt-4 text-lg text-slate-600">
            Built specifically for Nepal's rental market.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
