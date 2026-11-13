"use client";
import { useSearchParams } from "next/navigation";
import InverterCompatibility from "./InverterCompatibility";
import OrderSection from "./InverterOrderSection";
import { PRODUCTS } from "../../../../data/products";

const CalculatorContent = () => {
  const searchParams = useSearchParams();
  const equipementId = searchParams.get("equipement");

  const INVERTER_MODELS =
    PRODUCTS.find((item) => item.id === equipementId)?.models ||
    PRODUCTS[1].models;
  console.log(INVERTER_MODELS);
  return (
    <main className="py-12 px-5 sm:px-8 max-w-290 mx-auto space-y-8">
      <InverterCompatibility inverter_models={INVERTER_MODELS} />
      <OrderSection inverter_models={INVERTER_MODELS} />
    </main>
  );
};

export default CalculatorContent;
