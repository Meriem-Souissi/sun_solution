"use client";

import ArrowIcon from "@/components/icons/ArrowIcon";
import BlueButton from "@/components/ui/BlueButton";
import React, { useState, useEffect, useMemo } from "react";

const INVERTER_POWER = [
  { name: "2 - 4 kW", value: 5 },
  { name: "5 - 6 kW", value: 10 },
  { name: "6 - 10 kW", value: 15 },
  { name: "10 - 15 kW", value: 20 },
];

const BATTERY_MODELS = [
  { name: "Huawei LUNA2000 (5 kW)", power: 5 },
  { name: "Huawei LUNA2000 (10 kW)", power: 10 },
  { name: "Huawei LUNA2000 (15 kW)", power: 15 },
  { name: "Huawei LUNA2000 (20 kW)", power: 20 },
];

const BatteryCompatibility = () => {
  const [inverterPower, setInverterPower] = useState<string>("");
  const [selectedBattery, setSelectedBattery] = useState<string>("");
  const [BatteryPower, setBatteryPower] = useState<string>("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedBattery(value);

    const found = BATTERY_MODELS.find((item) => item.name === value);
    if (found) {
      setBatteryPower(found.power.toString());
    } else {
      setBatteryPower("");
    }
  };

  // Calcul dynamique de la compatibilité
  const compatibilityResult = useMemo(() => {
    if (inverterPower == "") {
      return {
        status: "Sélectionner la puissance de l'onduleur",
        state: "pending", // pending, ok, bad
      };
    }
    if (BatteryPower == "") {
      return {
        status: "Sélectionner la puissance de la batterie.",
        state: "pending", // pending, ok, bad
      };
    }

    if (
      inverterPower === BatteryPower &&
      parseFloat(inverterPower) > 0 &&
      parseFloat(BatteryPower) > 0
    ) {
      console.log("ok");
      return {
        status: `✅ Compatible ! Une batterie de ${selectedBattery} convient parfaitement avec votre onduleur sélectionné.`,
        state: "ok",
      };
    } else {
      return {
        status: `❌ Incompatible. Une batterie de ${selectedBattery} n'est pas compatible avec votre onduleur sélectionné.`,
        state: "bad",
      };
    }
  }, [inverterPower, selectedBattery]);

  return (
    <div className="bg-(--white) border border-(--line) rounded-[22px] p-6 sm:p-11 max-w-140 mx-auto mb-7 shadow-[0_30px_60px_-34px_rgba(20,72,112,0.35)]">
      <div className="mb-7">
        <div className="section-title"> Vérification Technique</div>
        <h2 className="font-serif text-2xl sm:text-[32px] font-medium text-(--ink) mb-3 leading-tight">
          Compatibilité{" "}
          <span className="italic text-(--forest)">Onduleur / Batterie</span>
        </h2>
        <p className="text-(--slate-custom) text-[15.5px]">
          Testez le dimensionnement de votre installation :
        </p>
      </div>

      {/* Sélectionner la puissance de la motopompe */}
      <div className="mb-5.5">
        <label
          htmlFor="puissanceMotopompe"
          className="block text-xs font-semibold text-(--ink) mb-2.5"
        >
          Puissance de l'onduleur (kW)
        </label>
        <select
          id="puissanceMotopompe"
          value={inverterPower}
          onChange={(e) => setInverterPower(e.target.value)}
          className="w-full px-4 py-3.5 bg-(--cream) border border-(--line) rounded-xl font-sans text-[15px] font-medium text-(--ink) cursor-pointer focus:outline-none focus:border-(--forest) focus:bg-(--white) focus:ring-3 focus:ring-(--forest)/10 transition-all appearance-none bg-no-repeat bg-[position:right_16px_center] bg-[size:16px] pr-12"
        >
          <option value="">
            Sélectionnez la puissance de l'onduleur (Onduleur hybride)
          </option>
          {INVERTER_POWER.map((power, index) => (
            <option key={index} value={power.value}>
              {power.name}
            </option>
          ))}
        </select>
      </div>

      {/* Select Type de variateur */}
      <div className="mb-5.5">
        <label
          htmlFor="typeVariateur"
          className="block text-xs font-semibold text-(--ink) mb-2.5"
        >
          Puissance de la batterie (kW)
        </label>
        <select
          id="typeVariateur"
          value={selectedBattery}
          onChange={handleSelectChange}
          className="w-full px-4 py-3.5 bg-(--cream) border border-(--line) rounded-xl font-sans text-[15px] font-medium text-(--ink) cursor-pointer focus:outline-none focus:border-(--forest) focus:bg-(--white) focus:ring-3 focus:ring-(--forest)/10 transition-all appearance-none bg-no-repeat bg-[position:right_16px_center] bg-[size:16px] pr-12"
        >
          <option value="">Sélectionnez un modèle</option>
          {BATTERY_MODELS.map((model, index) => (
            <option key={index} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      {/* Bouton de test */}
      <BlueButton
        type="button"
        icon={<ArrowIcon />}
        onClick={() => {}}
        className="mb-6.5"
      >
        Vérifier la compatibilité
      </BlueButton>

      {/* Résultats dynamiques */}
      <div
        className="bg-(--cream) border border-(--line) rounded-2xl px-6.5 py-1"
        aria-live="polite"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 py-4.5">
          <span className="text-[14px] text-(--slate-custom)">Statut :</span>
          <span
            className={`font-semibold text-[15px] ml-auto leading-relaxed ${
              compatibilityResult.state === "ok"
                ? "text-ok"
                : compatibilityResult.state === "bad"
                  ? "text-(--terracotta)"
                  : "text-(--slate-custom) font-medium"
            }`}
          >
            {compatibilityResult.status}
          </span>
        </div>
      </div>
    </div>
  );
};
export default BatteryCompatibility;
