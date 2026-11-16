import PanelCompatibility from "./components/PanelCompatibility";
import PanelOrderSection from "./components/PanelOrderSection";

const SolarCalculator = () => {
  return (
    <main className="py-12 px-5 sm:px-8 max-w-290 mx-auto space-y-8">
      <PanelCompatibility />
      <PanelOrderSection />
    </main>
  );
};
export default SolarCalculator;
