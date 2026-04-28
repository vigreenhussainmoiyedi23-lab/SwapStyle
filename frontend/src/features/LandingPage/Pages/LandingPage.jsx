import CategoriesSlider from "../components/CategoriesSlider";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import SystemFeatures from "../components/SystemFeatures";
import CTASection from "../components/CTASectionSimple";

const LandingPage = () => {
  return (
    <div className="w-full bg-brand-900 text-white font-sans">
      <Hero />
      <CategoriesSlider />
      <HowItWorks />
      <SystemFeatures />
      <CTASection />
    </div>
  );
};

export default LandingPage;
