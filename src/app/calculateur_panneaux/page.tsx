"use client";

import React, { useState, useMemo } from "react";

const PANEL_POWER_WATT = 550;

const SolarCalculator = () => {
  const [kwcInput, setKwcInput] = useState<string>("");

  // Convertit la valeur saisie en nombre valide
  const numericKwc = useMemo(() => {
    const parsed = parseFloat(kwcInput.replace(",", "."));
    return isFinite(parsed) && parsed > 0 ? parsed : 0;
  }, [kwcInput]);

  // Calcul du nombre de panneaux requis (arrondi à l'entier supérieur)
  const panelCount = useMemo(() => {
    if (numericKwc <= 0) return 0;
    return Math.ceil((numericKwc * 1000) / PANEL_POWER_WATT - 1e-9);
  }, [numericKwc]);

  // Calcul de la puissance totale estimée
  const estimatedPower = useMemo(() => {
    const totalKwc = (panelCount * PANEL_POWER_WATT) / 1000;
    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(totalKwc);
  }, [panelCount]);

  // Gestion des boutons + et -
  const handleStep = (delta: number) => {
    const current = numericKwc;
    const updated = Math.max(0, Math.round((current + delta) * 100) / 100);
    setKwcInput(updated > 0 ? updated.toString() : "");
  };

  return (
    <section className="bg-(--cream) py-18 md:py-25" id="simulateur">
      <div className="w-full max-w-[1160px] mx-auto px-5 sm:px-8">
        <div className="max-w-150 mx-auto bg-(--white) border border-(--line) rounded-[22px] p-5.5 sm:p-11 shadow-[0_30px_60px_-34px_rgba(20,72,112,0.35)]">
          <div className="section-title"> Simulateur solaire</div>
          {/* Titre */}
          <h2 className="font-serif text-(--ink) text-2xl sm:text-3xl md:text-[34px] font-medium leading-[1.14] tracking-tight mb-3 max-w-[15ch]">
            Calculez vos panneaux sur mesure
          </h2>

          <p className="text-(--slate-custom) text-[15.5px] mb-7.5">
            Entrez la puissance crête à installer (kWc) :
          </p>

          <label
            htmlFor="calcKwc"
            className="block text-xs font-semibold text-(--slate-custom) mb-2.5"
          >
            Puissance crête (kWc)
          </label>

          {/* Champ de saisie interactif */}
          <div className="flex items-center gap-2.5 bg-(--cream) border border-(--line) rounded-2xl p-2 transition-colors focus-within:border-(--forest) focus-within:bg-(--white)">
            <button
              type="button"
              onClick={() => handleStep(-0.5)}
              className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center bg-(--white) border border-(--line) text-(--forest) transition-colors hover:bg-(--forest) hover:border-(--forest) hover:text-(--cream) cursor-pointer"
              aria-label="Diminuer la puissance"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M5 12h14" />
              </svg>
            </button>

            <input
              id="calcKwc"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="0"
              value={kwcInput}
              onChange={(e) => setKwcInput(e.target.value)}
              className="flex-1 min-w-0 w-full border-none bg-transparent outline-none text-center font-serif font-medium text-3xl text-(--ink) py-1 placeholder:text-[#b4b9bd]"
            />

            <span className="text-sm font-semibold text-(--slate-custom) pr-1.5">
              kWc
            </span>

            <button
              type="button"
              onClick={() => handleStep(0.5)}
              className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center bg-(--white) border border-(--line) text-(--forest) transition-colors hover:bg-(--forest) hover:border-(--forest) hover:text-(--cream) cursor-pointer"
              aria-label="Augmenter la puissance"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>

          {/* Résultats du calcul */}
          <dl
            className="mt-6.5 bg-(--cream) border border-(--line) rounded-2xl px-4.5 sm:px-6.5 py-0.5"
            aria-live="polite"
          >
            <div className="flex items-baseline justify-between gap-4 py-5 border-b border-(--line)">
              <dt className="text-[14.5px] text-(--slate-custom)">
                Nombre de panneaux requis :
              </dt>
              <dd className="font-serif font-medium text-2xl sm:text-[28px] text-(--forest) text-right leading-none">
                {panelCount} {panelCount > 1 ? "panneaux" : "panneau"}
              </dd>
            </div>

            <div className="flex items-baseline justify-between gap-4 py-5">
              <dt className="text-[14.5px] text-(--slate-custom)">
                Puissance totale estimée :
              </dt>
              <dd className="font-serif font-medium text-2xl sm:text-[28px] text-(--ink) text-right leading-none">
                {estimatedPower} kWc
              </dd>
            </div>
          </dl>

          <p className="mt-4.5 text-[12.5px] text-(--slate-custom) leading-normal">
            Calcul basé sur des panneaux de 550 W (JONSOL JSM144-550).
            Estimation indicative, sujette à étude technique.
          </p>
        </div>
      </div>
    </section>
  );
};
export default SolarCalculator;
