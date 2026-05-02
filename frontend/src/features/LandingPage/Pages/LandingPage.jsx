import CategoriesSlider from "../components/CategoriesSlider";
import FooterCTA from "../components/CtaButtonsAboveFooter";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import SystemFeatures from "../components/SystemFeatures";

const LandingPage = () => {
  return (
    <div className="w-full bg-brand-900 text-white font-sans">
      <Hero />
      <CategoriesSlider />
      <HowItWorks />
      <SystemFeatures />
      <FooterCTA />
    </div>
  );
};

export default LandingPage;
