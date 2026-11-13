"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InverterCompatibility from "./components/InverterCompatibility";
import OrderSection from "./components/InverterOrderSection";
import { PRODUCTS } from "../../../data/products";

export default function SimulatorPage() {
  const searchParams = useSearchParams();
  const equipementId = searchParams.get("equipement");

  const INVERTER_MODELS =
    PRODUCTS.find((item) => item.id === equipementId)?.models ||
    PRODUCTS[1].models;
  console.log(INVERTER_MODELS);
  return (
    <main className="py-12 px-5 sm:px-8 max-w-290 mx-auto space-y-8">
      <Suspense fallback={<div>Chargement...</div>}>
        <InverterCompatibility inverter_models={INVERTER_MODELS} />
      </Suspense>
      <Suspense fallback={<div>Chargement...</div>}>
        <OrderSection inverter_models={INVERTER_MODELS} />
      </Suspense>
    </main>
  );
}
