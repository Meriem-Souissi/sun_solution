"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BlueButton from "./BlueButton";
import { ArrowIcon } from "../icons/ArrowIcon";

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

  const badgeStyles = {
    gold: "bg-(--gold) text-(--ink)",
    navy: "bg-(--forest) text-(--cream)",
    light: "bg-(--white) text-(--forest) border border-(--line)",
  };

  return (
    <article className="flex flex-col bg-(--white) border border-(--line) rounded-[18px] overflow-hidden transition-all duration-250 ease-in-out hover:-translate-y-1 hover:border-(--gold)/55 hover:shadow-[0_26px_44px_-26px_rgba(23,36,46,0.35)]">
      {/* Médias & Visuels */}
      <div className="relative h-50 bg-gradient-to-br from-(--sage) to-(--cream-2) flex items-center justify-center">
        {product.badge && (
          <span
            className={`absolute top-4 left-4 z-10 text-[11.5px] font-bold leading-none px-3 py-1.5 rounded-full ${
              badgeStyles[product.badge.variant]
            }`}
          >
            {product.badge.label}
          </span>
        )}

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
        <p className="text-[13.5px] text-slate-custom leading-relaxed mb-[18px]">
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
          <BlueButton icon={<ArrowIcon />}>Passer une commande</BlueButton>

          <a
            href={product.techSheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-full font-semibold text-[13.5px] text-(--forest) border border-(--line) bg-(--cream) hover:border-(--forest) hover:bg-(--sage) transition-colors"
          >
            <svg
              className="w-3.75 h-3.75"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
              <path d="M14 3v5h5M9 13h6M9 17h6" />
            </svg>
            <span>Fiche technique</span>
          </a>
          {product.calculator && (
            <Link href={product.calculator}>
              <BlueButton>Simuler l'installation</BlueButton>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
