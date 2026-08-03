import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import Container from "../../common/Container/Container";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroBackground />

      <Container>
        <div className="relative z-10 flex min-h-screen items-center">
          <HeroContent />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
