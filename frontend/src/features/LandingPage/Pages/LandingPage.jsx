import CategoriesSlider from "../components/CategoriesSlider";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";


const LandingPage = () => {
  return (
    <div className="w-full  bg-brand-900 text-white font-sans">
      <Hero />
      <CategoriesSlider/>
      <HowItWorks />
    </div>
  );
};

export default LandingPage;
