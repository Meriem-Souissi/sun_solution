"use client";

import React, { useState } from "react";

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

const InverterOrderSection = () => {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // Gestion de la quantité
  const modifierQuantite = (valeur: number) => {
    setQuantity((prev) => Math.max(1, prev + valeur));
  };

  // Ajout au panier via localStorage
  const ajouterAuPanier = (articleId: number, nomArticle: string) => {
    if (typeof window === "undefined") return;

    const existingCart = JSON.parse(
      localStorage.getItem("panierSolaire") || "[]",
    );
    const indexArticle = existingCart.findIndex(
      (item: any) => item.id === articleId,
    );

    if (indexArticle !== -1) {
      existingCart[indexArticle].quantite += quantity;
    } else {
      existingCart.push({
        id: articleId,
        nom: selectedModel ? `${nomArticle} - ${selectedModel}` : nomArticle,
        quantite: quantity,
      });
    }

    localStorage.setItem("panierSolaire", JSON.stringify(existingCart));
    alert(
      `Succès ! ${quantity} unité(s) de "${nomArticle}" ajoutée(s) au panier.`,
    );
  };

  return (
    <div className="bg-(--white) border border-(--line) rounded-[22px] p-6 sm:p-11 max-w-[560px] mx-auto shadow-[0_30px_60px_-34px_rgba(20,72,112,0.35)]">
      <div className="mb-7">
        <div className="section-title"> Passez votre commande</div>
        <p className="text-(--slate-custom) text-[15.5px]">
          Sélectionnez votre produit
        </p>
      </div>

      {/* Select Type d'onduleur commande */}
      <div className="mb-5.5">
        <label
          htmlFor="typeOnduleurCommande"
          className="block text-xs font-semibold text-(--ink) mb-2.5"
        >
          Type d'onduleur
        </label>
        <select
          id="typeOnduleurCommande"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full px-4 py-3.5 bg-(--cream) border border-(--line) rounded-xl font-sans text-[15px] font-medium text-(--ink) cursor-pointer focus:outline-none focus:border-(--forest) focus:bg-(--white) focus:ring-3 focus:ring-(--forest)/10 transition-all appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23144870\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><path d=\'M6 9l6 6 6-6\'/></svg>')] bg-no-repeat bg-[position:right_16px_center] bg-[size:16px] pr-12"
        >
          <option value="">Sélectionnez un modèle</option>
          {INVERTER_MODELS.map((model, idx) => (
            <option key={idx} value={model.name}>
              {model.name} ({model.power} kW)
            </option>
          ))}
        </select>
      </div>

      {/* Sélecteur de quantité */}
      <div className="mb-7">
        <label
          htmlFor="quantiteArticle"
          className="block text-xs font-semibold text-(--ink) mb-2.5"
        >
          Quantité à commander / réserver :
        </label>

        <div className="inline-flex items-center gap-1.5 bg-(--cream) border border-(--line) rounded-full p-1.5 transition-colors focus-within:border-(--forest) focus-within:bg-(--white)">
          <button
            type="button"
            onClick={() => modifierQuantite(-1)}
            className="w-10.5 h-10.5 rounded-full flex items-center justify-center bg-(--white) border border-(--line) text-(--forest) hover:bg-(--forest) hover:border-(--forest) hover:text-(--cream) transition-colors cursor-pointer shrink-0"
            aria-label="Diminuer la quantité"
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
            type="number"
            id="quantiteArticle"
            value={quantity}
            min="1"
            max="10000"
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-[72px] py-1 text-center border-none bg-transparent font-serif text-[22px] font-medium text-(--ink) focus:outline-none"
          />

          <button
            type="button"
            onClick={() => modifierQuantite(1)}
            className="w-10.5 h-10.5 rounded-full flex items-center justify-center bg-(--white) border border-(--line) text-(--forest) hover:bg-(--forest) hover:border-forest hover:text-cream transition-colors cursor-pointer shrink-0"
            aria-label="Augmenter la quantité"
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
      </div>

      {/* Bouton d'ajout au panier */}
      <button
        type="button"
        onClick={() => ajouterAuPanier(1, "Onduleur Huawei SUN2000")}
        className="flex items-center justify-center gap-2.5 w-full py-4 px-7 bg-(--forest) text-(--cream) rounded-full font-bold text-[15px] shadow-[0_14px_28px_-12px_rgba(20,72,112,0.5)] hover:bg-(--forest-deep) hover:-translate-y-0.5 transition-all cursor-pointer"
      >
        <svg
          className="w-4.5 h-4.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6" />
          <circle cx="9.5" cy="20" r="1.3" />
          <circle cx="17" cy="20" r="1.3" />
        </svg>
        <span>Ajouter au panier</span>
      </button>
    </div>
  );
};
export default InverterOrderSection;
