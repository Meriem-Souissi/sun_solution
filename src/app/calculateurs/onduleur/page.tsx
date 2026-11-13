import { Suspense } from "react";
import CalculatorContent from "./components/CalculatorContent";

export const dynamic = "force-dynamic";

export default function SimulatorPage() {
  return (
    <Suspense fallback={<div className="py-12 px-5">Chargement...</div>}>
      <CalculatorContent />
    </Suspense>
  );
}
