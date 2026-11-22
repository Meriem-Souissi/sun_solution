// import InverterCompatibility from "./components/InverterCompatibility";
import BatteryCompatibility from "./components/BatteryCompatibility";
import BatteryOrderSection from "./components/BatteryOrderSection";

export default function SimulatorPage() {
  return (
    <main className="py-12 px-5 sm:px-8 max-w-290 mx-auto space-y-8">
      <BatteryCompatibility />
      <BatteryOrderSection />
    </main>
  );
}
