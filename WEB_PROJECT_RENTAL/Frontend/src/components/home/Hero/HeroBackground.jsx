import heroBg from "../../../assets/images/hero/hero-bg.png";

const HeroBackground = () => {
  return (
    <>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      />
      {/* Soft white overlay */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Subtle left gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/35 to-transparent" />
    </>
  );
};

export default HeroBackground;
