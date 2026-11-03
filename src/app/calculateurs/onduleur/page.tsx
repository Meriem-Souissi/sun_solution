import InverterCompatibility from "./components/InverterCompatibility";
import OrderSection from "./components/InverterOrderSection";

export default function SimulatorPage() {
  return (
    <main className="py-12 px-5 sm:px-8 max-w-290 mx-auto space-y-8">
      <InverterCompatibility />
      <OrderSection />
    </main>
  );
}
