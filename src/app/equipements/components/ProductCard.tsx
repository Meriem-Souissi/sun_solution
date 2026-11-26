"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import DownloadIcon from "../../../components/icons/DownloadIcon";
import CalculatorIcon from "../../../components/icons/CalculatorIcon";
import PanierIcon from "../../../components/icons/PanierIcon";
import ToastIcon from "../../../components/icons/ToastIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import BlueButton from "@/components/ui/BlueButton";

export default function ProductCard({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showPanelConfiguration, setShowPanelConfiguration] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedModel, setSelectedModel] = useState<string>(product.title);
  const [quantity, setQuantity] = useState<number>(1);

  const badgeStyles = {
    gold: "bg-(--gold) text-(--ink)",
    navy: "bg-(--forest) text-(--cream)",
    light: "bg-(--white) text-(--forest) border border-(--line)",
  };

  // Gestion de la quantité
  const modifierQuantite = (valeur: number) => {
    setQuantity((prev) => Math.max(1, prev + valeur));
  };

  // Ajout au panier via localStorage
  const ajouterAuPanier = (articleId: any, nomArticle: string) => {
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
        nom: selectedModel ? `${nomArticle}` : null,
        quantite: quantity,
      });
    }

    localStorage.setItem("panierSolaire", JSON.stringify(existingCart));

    window.dispatchEvent(new CustomEvent("cartUpdated"));
    setShowToast(true);

    // Masque le toast automatiquement après 3 secondes
    setTimeout(() => {
      setShowToast(false);
      setSelectedId(0);
    }, 3000);
  };

  return (
    <>
      <article className="relative flex flex-col bg-(--white) border border-(--line) rounded-[18px] overflow-hidden transition-all duration-250 ease-in-out hover:-translate-y-1 hover:border-(--gold)/55 hover:shadow-[0_26px_44px_-26px_rgba(23,36,46,0.35)]">
        {showPanelConfiguration ? (
          <>
            <div className="absolute flex flex-col px-8 py-6 inset-0 z-6 bg-(--white) overflow-y-auto animate-[cfgIn_0.28s_ease_both]">
              <div className="flex items-start justify-between gap-3 mb-8">
                <div>
                  <span className="block text-xs font-semibold text-(--gold-deep) mb-4">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-[19.5px] font-medium mb-3 leading-snug text-(--ink)">
                    {product.title}
                  </h3>
                </div>
                <button
                  className="w-9 h-9 rounded-full shrink-0 cursor-pointer flex items-center justify-center bg-(--white) border border-(--line) text-(--slate) transition-colors duration-[180ms] hover:bg-(--forest) hover:border-(--forest) hover:text-(--cream)"
                  onClick={() =>
                    setShowPanelConfiguration(!showPanelConfiguration)
                  }
                >
                  <CloseIcon />
                </button>
              </div>
              {product.models.length !== 0 ? (
                <div className="mb-[40px]">
                  <span className="block mb-[10px] text-(--ink) font-semibold text-sm">
                    Puissance
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.models.map((model) => {
                      const isSelected = selectedId === model.power;
                      return (
                        <button
                          key={model.power}
                          className={`text-sm font-medium px-4 py-[9px] rounded-full cursor-pointer border transition-colors duration-[180ms] ${
                            isSelected
                              ? "text-(--cream) bg-(--forest) border-(--forest)"
                              : "text-(--slate) bg-(--cream) border-(--line)"
                          }`}
                          onClick={() => (
                            setSelectedModel(model.name),
                            setSelectedId(model.power)
                          )}
                        >
                          {model.power}
                          {product.category === "Variateurs solaires"
                            ? "HP"
                            : product.category === "Panneaux solaires"
                              ? "W"
                              : "kW"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div className="mb-[40px]">
                <span className="block mb-[10px] text-(--ink) font-semibold text-sm">
                  Quantité
                </span>
                <div className="inline-flex items-center gap-1.5 bg-(--cream) border border-(--line) p-1 rounded-full">
                  <button
                    type="button"
                    aria-label="diminuer la quatité"
                    className="w-9 h-9 rounded-full shrink-0 cursor-pointer flex items-center justify-center bg-(--white) border border-(--line) text-(--forest) transition-colors duration-[180ms] hover:bg-(--forest) hover:border-(--forest) hover:text-(--cream)"
                    onClick={() => modifierQuantite(-1)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      width="14px"
                      height="14px"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <input
                    className="w-[68px] text-center border-none outline-none bg-transparent font-medium text-[20px] text-(--ink) [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
                    type="number"
                    min="1"
                    max="10000"
                    aria-label="Quantité"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                  ></input>
                  <button
                    type="button"
                    aria-label="augmenter la quatité"
                    className="w-9 h-9 rounded-full shrink-0 cursor-pointer flex items-center justify-center bg-(--white) border border-(--line) text-(--forest) transition-colors duration-[180ms] hover:bg-(--forest) hover:border-(--forest) hover:text-(--cream)"
                    onClick={() => modifierQuantite(1)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      width="14px"
                      height="14px"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <BlueButton
                  type="button"
                  onClick={() => ajouterAuPanier(selectedModel, selectedModel)}
                >
                  Ajouter au panier{" "}
                </BlueButton>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Médias & Visuels */}
            <div className="relative h-50 bg-linear-to-br from-(--sage) to-(--cream-2) flex items-center justify-center">
              {product.badge && (
                <span
                  className={`absolute top-6 left-4 z-10 text-[11.5px] font-bold leading-none px-3 py-1.5 rounded-full ${
                    badgeStyles[product.badge.variant]
                  }`}
                >
                  {product.badge.label}
                </span>
              )}
              <div className="absolute top-3.5 right-3.5 z-3 flex gap-2">
                {product.calculator && (
                  <Link
                    href={`${product.calculator}/?equipement=${product.id}`}
                    className="product-card-icon after:content-[attr(data-tip)]"
                    data-tip="Vérifier la compatibilité"
                    aria-label="Calculer le nombre de panneaux nécessaires"
                  >
                    <CalculatorIcon />
                  </Link>
                )}

                <button
                  type="button"
                  className="product-card-icon after:content-[attr(data-tip)]"
                  data-cart
                  data-id="1"
                  data-tip="Ajouter au panier"
                  onClick={() =>
                    setShowPanelConfiguration(!showPanelConfiguration)
                  }
                >
                  <PanierIcon />
                </button>
              </div>

              {!imageError ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-5.5 bg-(--white)"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-(--forest-soft) text-center px-5">
                  <svg
                    className="w-11.5 h-11.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <rect x="3" y="4" width="18" height="14" rx="1.2" />
                    <path d="M3 9h18M3 14h18M9 4v14M15 4v14M8 21h8" />
                  </svg>
                  <span className="text-[12.5px] font-medium text-(--slate-custom)">
                    {product.title}
                  </span>
                </div>
              )}
            </div>

            {/* Corps de la carte */}
            <div className="flex flex-col flex-grow p-6 pb-6.5">
              <span className="text-xs font-semibold text-(--gold-deep) mb-2">
                {product.category}
              </span>
              <h3 className="font-serif text-[19.5px] font-medium mb-3 leading-snug text-(--ink)">
                {product.title}
              </h3>
              <p className="text-[13.5px] text-slate-custom leading-relaxed mb-4.5">
                {product.description}
              </p>

              {/* Caractéristiques */}
              <ul className="space-y-1.5 mb-6 flex-grow">
                {product.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.25 text-[13.5px] text-ink leading-normal"
                  >
                    <svg
                      className="w-3.5 h-3.5 mt-0.75 shrink-0 text-(--forest-soft)"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Boutons d'actions */}
              <div className="flex flex-col gap-2.5">
                <Link
                  href={product.techSheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-full font-semibold text-[13.5px] text-(--forest) border border-(--line) bg-(--cream) hover:border-(--forest) hover:bg-(--sage) transition-colors"
                >
                  <DownloadIcon />
                  <span>Fiche technique</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </article>
      {showToast && (
        <div
          className={`fixed left-1/2 bottom-7 z-100 flex max-w-[calc(100vw-32px)] items-center gap-2.5 rounded-full bg-(--forest-deep) px-5 py-3.25 text-[14px] font-medium text-(--cream) shadow-[0_18px_36px_-14px_rgba(14,53,85,0.6)] pointer-events-none transition-all duration-250ms ${
            showToast
              ? "opacity-100 translate-x-[-50%] translate-y-0"
              : "opacity-0 translate-x-[-50%] translate-y-4"
          }`}
        >
          <ToastIcon />
          {`Succès ! ${quantity} unité(s) de "${selectedModel}" ajoutée(s) au
          panier.`}
        </div>
      )}
    </>
  );
}
