"use client";

import ArrowIcon from "@/components/icons/ArrowIcon";
import BlueButton from "@/components/ui/BlueButton";
import React, { useState, useEffect, useMemo } from "react";

const MOTO_POMPE_POWER = [
  { name: "5 HP", value: 5 },
  { name: "7.5 HP", value: 7.5 },
  { name: "10 HP", value: 10 },
  { name: "15 HP", value: 15 },
  { name: "20 HP", value: 20 },
  { name: "25 HP", value: 25 },
  { name: "30 HP", value: 30 },
  { name: "35 HP", value: 35 },
];

const VARIATOR_MODELS = [
  { name: "INVT GD100-PV (5 HP)", power: 5 },
  { name: "INVT GD100-PV (7.5 ou 10 HP)", power: 7.5 },
  { name: "INVT GD100-PV (10 ou 15 HP)", power: 10 },
  { name: "INVT GD100-PV (15 ou 20 HP)", power: 15 },
  { name: "INVT GD100-PV (20 ou 25 HP)", power: 20 },
  { name: "INVT GD100-PV (25 ou 30 HP)", power: 25 },
  { name: "INVT GD100-PV (30 ou 35 HP)", power: 30 },
  { name: "INVT GD100-PV (35 ou 40 HP)", power: 35 },
];

const InverterCompatibility = () => {
  const [motoPompePower, setmotoPompePower] = useState<string>("");
  const [selectedVariator, setSelectedVariator] = useState<string>("");
  const [variatorPower, setVariatorPower] = useState<string>("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedVariator(value);

    const found = VARIATOR_MODELS.find((item) => item.name === value);
    if (found) {
      setVariatorPower(found.power.toString());
    } else {
      setVariatorPower("");
    }
  };

  // Calcul dynamique de la compatibilité
  const compatibilityResult = useMemo(() => {
    if (motoPompePower == "") {
      return {
        status: "Sélectionner la puissance de la motopompe",
        state: "pending", // pending, ok, bad
      };
    }
    if (variatorPower == "") {
      return {
        status: "Sélectionner la puissance du variateur.",
        state: "pending", // pending, ok, bad
      };
    }

    if (
      motoPompePower === variatorPower &&
      parseFloat(motoPompePower) > 0 &&
      parseFloat(variatorPower) > 0
    ) {
      console.log("ok");
      return {
        status: `✅ Compatible ! Un variateur de ${selectedVariator} convient parfaitement pour une motopompe de ${motoPompePower} HP.`,
        state: "ok",
      };
    } else {
      return {
        status: `❌ Incompatible. Un variateur de ${selectedVariator} n'est pas compatible pour une motopompe de ${motoPompePower} HP.`,
        state: "bad",
      };
    }
  }, [motoPompePower, selectedVariator]);

  return (
    <div className="bg-(--white) border border-(--line) rounded-[22px] p-6 sm:p-11 max-w-140 mx-auto mb-7 shadow-[0_30px_60px_-34px_rgba(20,72,112,0.35)]">
      <div className="mb-7">
        <div className="section-title"> Vérification Technique</div>
        <h2 className="font-serif text-2xl sm:text-[32px] font-medium text-(--ink) mb-3 leading-tight">
          Compatibilité{" "}
          <span className="italic text-(--forest)">Motopompe / Variateur</span>
        </h2>
        <p className="text-(--slate-custom) text-[15.5px]">
          Testez le dimensionnement de votre installation de pompage :
        </p>
      </div>

      {/* Sélectionner la puissance de la motopompe */}
      <div className="mb-5.5">
        <label
          htmlFor="puissanceMotopompe"
          className="block text-xs font-semibold text-(--ink) mb-2.5"
        >
          Puissance de la motopompe (HP)
        </label>
        <select
          id="puissanceMotopompe"
          value={motoPompePower}
          onChange={(e) => setmotoPompePower(e.target.value)}
          className="w-full px-4 py-3.5 bg-(--cream) border border-(--line) rounded-xl font-sans text-[15px] font-medium text-(--ink) cursor-pointer focus:outline-none focus:border-(--forest) focus:bg-(--white) focus:ring-3 focus:ring-(--forest)/10 transition-all appearance-none bg-no-repeat bg-[position:right_16px_center] bg-[size:16px] pr-12"
        >
          <option value="">Sélectionnez un modèle</option>
          {MOTO_POMPE_POWER.map((power, index) => (
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
          Puissance du variateur (HP)
        </label>
        <select
          id="typeVariateur"
          value={selectedVariator}
          onChange={handleSelectChange}
          className="w-full px-4 py-3.5 bg-(--cream) border border-(--line) rounded-xl font-sans text-[15px] font-medium text-(--ink) cursor-pointer focus:outline-none focus:border-(--forest) focus:bg-(--white) focus:ring-3 focus:ring-(--forest)/10 transition-all appearance-none bg-no-repeat bg-[position:right_16px_center] bg-[size:16px] pr-12"
        >
          <option value="">Sélectionnez un modèle</option>
          {VARIATOR_MODELS.map((model, index) => (
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
export default InverterCompatibility;
