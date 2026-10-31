"use client";

import { ArrowIcon } from "@/components/icons/ArrowIcon";
import BlueButton from "@/components/ui/BlueButton";
import React, { useState, useEffect, useMemo } from "react";

const INVERTER_MODELS = [
  { name: "Sungrow SG320HX-20", power: 320 },
  { name: "Huawei SUN2000 (2 kW)", power: 2 },
  { name: "Huawei SUN2000 (3 kW)", power: 3 },
  { name: "Huawei SUN2000 (4 kW)", power: 4 },
  { name: "Huawei SUN2000 (4.6 kW)", power: 4.6 },
  { name: "Huawei SUN2000 (6 kW)", power: 6 },
  { name: "Huawei SUN2000 (8 kW)", power: 8 },
  { name: "Huawei SUN2000 (10 kW)", power: 10 },
  { name: "Huawei SUN2000 (12 kW)", power: 12 },
  { name: "Huawei SUN2000 (15 kW)", power: 15 },
  { name: "Huawei SUN2000 (17 kW)", power: 17 },
  { name: "Huawei SUN2000 (20 kW)", power: 20 },
  { name: "Huawei SUN2000 (25 kW)", power: 25 },
  { name: "Huawei SUN2000 (30 kW)", power: 30 },
  { name: "Huawei SUN2000 (40 kW)", power: 40 },
  { name: "Huawei SUN2000 (50 kW)", power: 50 },
];

const InverterCompatibility = () => {
  const [pvPower, setPvPower] = useState<string>("1");
  const [selectedInverter, setSelectedInverter] = useState<string>("");
  const [inverterPower, setInverterPower] = useState<string>("");

  // Mise à jour de la puissance de l'onduleur lors du changement de sélection
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedInverter(value);

    const found = INVERTER_MODELS.find((item) => item.name === value);
    if (found) {
      setInverterPower(found.power.toString());
    } else {
      setInverterPower("");
    }
  };

  // Calcul dynamique de la compatibilité
  const compatibilityResult = useMemo(() => {
    const pCpv = parseFloat(pvPower) || 0;
    const pacOnd = parseFloat(inverterPower) || 0;

    if (pacOnd <= 0) {
      return {
        ratio: "Saisir votre puissance crête PV (en kWc)",
        status: "Sélectionner un onduleur",
        state: "pending", // pending, ok, bad
      };
    }

    const ratio = pCpv / pacOnd;
    const ratioFormatted = ratio.toFixed(2).replace(".", ",");
    const minLimit = 0.9;
    const maxLimit = 1.3;

    if (ratio >= minLimit && ratio <= maxLimit) {
      return {
        ratio: ratioFormatted,
        status: "Onduleur compatible",
        state: "ok",
      };
    } else if (ratio < minLimit) {
      return {
        ratio: ratioFormatted,
        status:
          "Onduleur non compatible (le rapport de puissance trop bas < 0.9)",
        state: "bad",
      };
    } else {
      return {
        ratio: ratioFormatted,
        status:
          "Onduleur non compatible (le rapport de puissance trop haut > 1.3)",
        state: "bad",
      };
    }
  }, [pvPower, inverterPower]);

  return (
    <div className="bg-(--white) border border-(--line) rounded-[22px] p-6 sm:p-11 max-w-[560px] mx-auto mb-7 shadow-[0_30px_60px_-34px_rgba(20,72,112,0.35)]">
      <div className="mb-7">
        <div className="section-title"> Vérification Technique</div>
        <h2 className="font-serif text-2xl sm:text-[32px] font-medium text-(--ink) mb-3 leading-tight">
          Compatibilité{" "}
          <span className="italic text-(--forest)">Onduleur / PV</span>
        </h2>
        <p className="text-(--slate-custom) text-[15.5px]">
          Testez le dimensionnement de votre installation :
        </p>
      </div>

      {/* Input Puissance PV */}
      <div className="mb-5.5">
        <label
          htmlFor="pvPower"
          className="block text-xs font-semibold text-(--ink) mb-2.5"
        >
          Puissance Crête PV (en kWc)
        </label>
        <input
          id="pvPower"
          type="number"
          step="0.1"
          min="0"
          value={pvPower}
          onChange={(e) => setPvPower(e.target.value)}
          className="w-full px-4 py-3 bg-(--cream) border border-(--line) rounded-xl font-serif text-[22px] font-medium text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) focus:ring-3 focus:ring-(--forest)/10 transition-all"
        />
      </div>

      {/* Select Type d'onduleur */}
      <div className="mb-5.5">
        <label
          htmlFor="typeOnduleur"
          className="block text-xs font-semibold text-(--ink) mb-2.5"
        >
          Type d'onduleur
        </label>
        <select
          id="typeOnduleur"
          value={selectedInverter}
          onChange={handleSelectChange}
          className="w-full px-4 py-3.5 bg-(--cream) border border-(--line) rounded-xl font-sans text-[15px] font-medium text-(--ink) cursor-pointer focus:outline-none focus:border-(--forest) focus:bg-(--white) focus:ring-3 focus:ring-(--forest)/10 transition-all appearance-none bg-no-repeat bg-[position:right_16px_center] bg-[size:16px] pr-12"
        >
          <option value="">Sélectionnez un modèle</option>
          {INVERTER_MODELS.map((model, idx) => (
            <option key={idx} value={model.name}>
              {model.name} ({model.power} kW)
            </option>
          ))}
        </select>
      </div>

      {/* Input Puissance de l'Onduleur (ReadOnly) */}
      <div className="mb-5.5">
        <label
          htmlFor="puissance_onduleur"
          className="block text-xs font-semibold text-(--ink) mb-2.5"
        >
          Puissance de l'Onduleur (en kW)
        </label>
        <input
          type="text"
          id="puissance_onduleur"
          readOnly
          value={inverterPower}
          placeholder="Ex: 320"
          className="w-full px-4 py-3 bg-(--sage) border border-transparent rounded-xl font-serif text-[22px] font-medium text-(--forest) cursor-default focus:outline-none"
        />
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
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 py-4.5 border-b border-(--line)">
          <span className="text-[14px] text-(--slate-custom)">
            0.9≤Pcpv/(Pac ond)≤1.3 :
          </span>
          <span
            className={`text-right font-semibold text-[15px] ml-auto leading-relaxed ${
              compatibilityResult.state === "number" ||
              compatibilityResult.state === "ok" ||
              compatibilityResult.state === "bad"
                ? "font-serif font-medium text-[28px] leading-none"
                : "text-(--slate-custom) font-medium"
            }`}
          >
            {compatibilityResult.ratio}
          </span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 py-4.5">
          <span className="text-[14px] text-(--slate-custom)">Statut :</span>
          <span
            className={`text-right font-semibold text-[15px] ml-auto leading-relaxed ${
              compatibilityResult.state === "ok"
                ? "text-ok before:content-['✓\\00a0']"
                : compatibilityResult.state === "bad"
                  ? "text-(--terracotta) before:content-['✕\\00a0'] before:bg-(--terracotta) before:w-5 before:h-5"
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
export default InverterCompatibility;
