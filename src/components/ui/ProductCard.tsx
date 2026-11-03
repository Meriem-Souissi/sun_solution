"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DownloadIcon from "../icons/DownloadIcon";
import CalculatorIcon from "../icons/CalculatorIcon";
import PanierIcon from "../icons/PanierIcon";

type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  techSheetUrl: string;
  badge?: {
    label: string;
    variant: "gold" | "navy" | "light";
  };
  calculator?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false);
  const [count, setCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const badgeStyles = {
    gold: "bg-(--gold) text-(--ink)",
    navy: "bg-(--forest) text-(--cream)",
    light: "bg-(--white) text-(--forest) border border-(--line)",
  };
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);

    setShowToast(true);

    // Masque le toast automatiquement après 3 secondes
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <article className="flex flex-col bg-(--white) border border-(--line) rounded-[18px] overflow-hidden transition-all duration-250 ease-in-out hover:-translate-y-1 hover:border-(--gold)/55 hover:shadow-[0_26px_44px_-26px_rgba(23,36,46,0.35)]">
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
                href={product.calculator}
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
              data-nom="JONSOL 550 W (Demi-cellules)"
              data-tip="Ajouter au panier"
              aria-label="Ajouter JONSOL 550 W (Demi-cellules) au panier"
              onClick={incrementCount}
            >
              <PanierIcon />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--gold) px-1 text-[11px] font-bold text-(--ink) animate-in zoom-in-50 duration-200">
                  {count > 99 ? "99+" : count}
                </span>
              )}
              {/* <span className="tool-count"></span> */}
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
              <span className="text-[12.5px] font-medium text-slate-custom">
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
      </article>
      {showToast && (
        <div
          className={`fixed left-1/2 bottom-7 z-100 flex max-w-[calc(100vw-32px)] items-center gap-2.5 rounded-full bg-(--forest-deep) px-5 py-3.25 text-[14px] font-medium text-(--cream) shadow-[0_18px_36px_-14px_rgba(14,53,85,0.6)] pointer-events-none transition-all duration-250ms ${
            showToast
              ? "opacity-100 translate-x-[-50%] translate-y-0"
              : "opacity-0 translate-x-[-50%] translate-y-4"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-(--gold) shrink-0"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {product.title} ajouté au panier !
        </div>
      )}
    </>
  );
}
