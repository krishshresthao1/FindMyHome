import Hero from "../components/home/Hero/Hero";
import Categories from "../components/home/Categories/Categories";
import BrowseArea from "../components/home/BrowseArea/BrowseArea";
import FeaturedProperties from "../components/home/FeaturedProperties/FeaturedProperties";
import Features from "../components/home/Features/Features";
import HowItWorks from "../components/home/HowItWorks/HowItWorks";

const Home = () => {
  return (
    <>
      <Hero />

      <Categories />

      <BrowseArea /> 

      <FeaturedProperties />

      <Features />

      <HowItWorks />
    </>
  );
};

export default Home;
