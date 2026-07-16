import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      <HeroBackground />

      <div className="mx-auto flex min-h-[88vh] max-w-7xl items-center justify-between gap-20 px-6 lg:px-8">
        <HeroContent />

        <HeroImage />
      </div>
    </section>
  );
};

export default Hero;
