"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "../../components/ui/ProductCard";

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

const PRODUCTS: Product[] = [
  {
    id: "jonsol-550",
    title: "JONSOL 550 W (Demi-cellules)",
    category: "Panneaux solaires",
    description:
      "Le panneau solaire JONSOL JSM144-550 (série 182, technologie demi-cellules monocristallines) est un module photovoltaïque de haute puissance conçu pour les installations résidentielles et commerciales.",
    features: [
      "Technologie Half-Cut Monocristallin",
      "Rendement élevé même par faible ensoleillement",
    ],
    image: "/images/equipements/jonsol.jpg",
    techSheetUrl: "/fiches-techniques/fiche technique Jonsol.pdf",
    badge: { label: "Top Vente", variant: "gold" },
    calculator: "/calculateur_panneaux",
  },
  {
    id: "sungrow-sg320hx",
    title: "Onduleur SUNGROW Multi-MPPT",
    category: "Onduleurs réseau",
    description:
      "L'onduleur chaîne multi-MPPT Sungrow SG320HX-20 est conçu pour les grands parcs photovoltaïques et les systèmes solaires industriels en 1500 Vdc.",
    features: [
      "Multiples traqueurs MPPT indépendants",
      "Protection IP66 ultra-résistante",
    ],
    image: "/images/equipements/sungrow.jpg",
    techSheetUrl: "/fiches-techniques/Fiche Onduleur.pdf",
    badge: { label: "Pro & Industriel", variant: "navy" },
    calculator: "/calculateur_onduleur",
  },
  {
    id: "huawei-sun2000-2-4-6",
    title: "Onduleur Huawei SUN2000 (2-3-4-4.6)",
    category: "Onduleurs triphasés",
    description:
      "La série Huawei SUN2000-2/3/4/5/6KTL-L1 est une gamme d'onduleurs solaires triphasés de raccordement au réseau pour les installations résidentielles et tertiaires.",
    features: [
      "Sécurité active avec protection AFCI",
      "Rendement élevé et gestion intelligente",
    ],
    image: "/images/equipements/onduleur HWAWEI 2000-2KTL.L1.jpg",
    techSheetUrl: "/fiches-techniques/SUN2000-6KTL-L1.pdf",
    badge: { label: "Résidentiel & Tertiaire", variant: "light" },
  },
  {
    id: "huawei-sun2000-6-10",
    title: "Onduleur Huawei SUN2000 (6-8-10)",
    category: "Onduleurs triphasés",
    description:
      "La série Huawei SUN2000-3/4/5/6/8/10KTL-M1 est une gamme d'onduleurs solaires conçue pour les installations photovoltaïques résidentielles ou petites installations tertiaires.",
    features: ["Rendement maximal élevé", "Protections contre les surtensions"],
    image: "/images/equipements/onduleur HWAWEI 2000-2KTL.L1.jpg",
    techSheetUrl: "/fiches-techniques/SUN2000-6KTL-M1.pdf",
    badge: { label: "Résidentiel & Tertiaire", variant: "light" },
  },
  {
    id: "huawei-sun2000-12-25",
    title: "Onduleur Huawei SUN2000 (12~25)",
    category: "Onduleurs triphasés",
    description:
      "La série Huawei SUN2000-12~25KTL-M5 est une gamme d'onduleurs solaires conçue pour les installations solaires résidentielles de grande puissance, commerciales et industrielles.",
    features: [
      "Supervision intelligente à distance",
      "Technologie MPPT pour optimiser la production",
    ],
    image: "/images/equipements/onduleur HWAWEI 2000-12ktl-m5.jpg",
    techSheetUrl: "/fiches-techniques/sun2000-12-15-17-20-25ktl-m5.pdf",
    badge: { label: "Résidentiel & Tertiaire", variant: "light" },
  },
  {
    id: "huawei-sun2000-30-40",
    title: "Onduleur Huawei SUN2000 (30-40)",
    category: "Onduleurs triphasés",
    description:
      "La gamme Huawei SUN2000 (30–40 kW) regroupe des onduleurs triphasés adaptés aux installations photovoltaïques de moyenne et grande puissance, notamment dans les secteurs commercial et industriel.",
    features: ["Sécurité renforcée", "Conception robuste"],
    image: "/images/equipements/onduleur HWAWEI 2000-30ktl-m3.jpg",
    techSheetUrl: "/fiches-techniques/SUN2000-30-40KTL-M3.pdf",
    badge: { label: "Résidentiel & Tertiaire", variant: "light" },
  },
  {
    id: "sungrow-emu-200a",
    title: "EMU 200A (Energy Management Unit)",
    category: "Gestion & Pilotage",
    description:
      "Sungrow EMU200A est une unité de gestion de l'énergie (Energy Management Unit) conçue par Sungrow pour les centrales photovoltaïques commerciales et de grande envergure.",
    features: [
      "Régulation et contrôle avancés du réseau",
      "Optimisé pour centrales commerciales et grands parcs",
    ],
    image: "/images/equipements/EMU200A.jpg",
    techSheetUrl: "/fiches-techniques/EMU200A",
    badge: { label: "Gestion d'Énergie", variant: "light" },
  },
  {
    id: "com-100e",
    title: "COM 100E (Boîtier de communication)",
    category: "Boîtiers Intelligents",
    description:
      "Le COM100E de Sungrow est un boîtier de communication intelligent conçu pour la supervision, la collecte de données et la gestion à distance des centrales solaires photovoltaïques.",
    features: [
      "Supervision et suivi en temps réel",
      "Collecte de données et diagnostic à distance",
    ],
    image: "/images/equipements/com.jpg",
    techSheetUrl: "/fiches-techniques/Datasheet COM100E.pdf",
    badge: { label: "Communication", variant: "navy" },
  },
  {
    id: "huawei-luna2000",
    title: "Huawei LUNA2000",
    category: "Stockage & Batteries",
    description:
      "La batterie Huawei LUNA2000 est un système de stockage d'énergie modulaire au lithium-fer-phosphate (LiFePO4) conçu pour les installations photovoltaïques résidentielles et commerciales.",
    features: [
      "Technologie LiFePO4 sécurisée",
      "Architecture modulaire évolutive",
    ],
    image: "/images/equipements/batterie Huawei LUNA2000.jpg",
    techSheetUrl: "/fiches-techniques/luna fiche technique.pdf",
    badge: { label: "Stockage Énergétique", variant: "light" },
  },
];

const Products = () => {
  // Ouverture sécurisée de la fiche technique PDF
  const openTechSheet = (file: string) => {
    window.open(`/${file}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="bg-(--cream) min-h-screen text-(--ink)">
      {/* SECTION NOS ÉQUIPEMENTS */}
      <section className="py-20 bg-(--cream)">
        {/* HERO SECTION */}
        <section className="pt-7 pb-9">
          <div className="max-w-240 mx-auto px-8 max-w-190">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-(--forest) tracking-wider mb-5 before:content-[''] before:w-[22px] before:h-px before:bg-(--gold)">
              Équipements de haute performance
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-medium leading-tight text-(--ink) max-w-[18ch]">
              Nos équipements photovoltaïques
            </h1>
            <p className="text-slate-custom text-[16.5px] mt-4 max-w-[56ch] leading-relaxed">
              Fournisseur de référence en équipements solaires certifiés. De la
              fourniture de panneaux haute efficacité aux onduleurs et batteries
              de stockage, nous accompagnons les particuliers et professionnels
              vers une autonomie énergétique rentable.
            </p>
          </div>
        </section>

        {/* PRODUITS GRID */}
        <section className="pt-6 pb-28">
          <div className="max-w-[1160px] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* TRUST STRIP SECTION */}
      <section className="bg-(--white) border-y border-(--line) py-0">
        <div className="max-w-[1160px] mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-7 md:py-10 md:px-7 flex flex-col gap-3.5 border-t sm:border-t-0 sm:border-l first:border-l-0 border-(--line)">
            <svg
              className="w-6 h-6 text-(--gold-deep)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M12 22s7-4.5 7-11V5l-7-3-7 3v6c0 6.5 7 11 7 11Z" />
            </svg>
            <h3 className="font-serif text-base font-medium text-(--ink)">
              Garantie constructeur
            </h3>
            <p className="text-[13.5px] text-(--slate) leading-normal">
              Jusqu'à 25 ans sur les panneaux, selon le fabricant choisi.
            </p>
          </div>

          <div className="p-7 md:py-10 md:px-7 flex flex-col gap-3.5 border-t sm:border-t-0 border-l border-(--line)">
            <svg
              className="w-6 h-6 text-(--gold-deep)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M3 21v-4a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v4" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <h3 className="font-serif text-base font-medium text-(--ink)">
              SAV local
            </h3>
            <p className="text-[13.5px] text-(--slate) leading-normal">
              Une équipe technique basée à Tunis, joignable directement.
            </p>
          </div>

          <div className="p-7 md:py-10 md:px-7 flex flex-col gap-3.5 border-t lg:border-t-0 lg:border-l border-(--line)">
            <svg
              className="w-6 h-6 text-(--gold-deep)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="1" y="7" width="15" height="10" rx="1" />
              <path d="M16 10h3l3 3v4h-6" />
              <circle cx="6" cy="19" r="1.6" />
              <circle cx="18" cy="19" r="1.6" />
            </svg>
            <h3 className="font-serif text-base font-medium text-(--ink)">
              Livraison Grand Tunis
            </h3>
            <p className="text-[13.5px] text-(--slate) leading-normal">
              Livraison et retrait en atelier possibles selon les quantités.
            </p>
          </div>

          <div className="p-7 md:py-10 md:px-7 flex flex-col gap-3.5 border-t lg:border-t-0 border-l border-(--line)">
            <svg
              className="w-6 h-6 text-(--gold-deep)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <h3 className="font-serif text-base font-medium text-(--ink)">
              Produits certifiés
            </h3>
            <p className="text-[13.5px] text-(--slate) leading-normal">
              Matériel conforme aux normes en vigueur et compatible STEG.
            </p>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-(--forest) text-(--cream) py-24">
        <div className="max-w-[1160px] mx-auto px-8 flex items-center justify-between gap-10 flex-wrap">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-(--cream) max-w-[16ch] leading-tight font-medium">
              Besoin d'un projet complet plutôt que d'un produit seul ?
            </h2>
            <p className="text-[#C7D2C9] mt-3 max-w-[44ch] text-[15.5px]">
              Étude, installation et mise en service : nos équipes s'occupent de
              tout, du dimensionnement au raccordement.
            </p>
          </div>
          <Link
            href="/devis"
            className="inline-flex items-center justify-center gap-2.5 bg-(--sage) text-(--forest-deep) px-7 py-4 rounded-full font-bold text-sm hover:bg-(--white) transition-colors group"
          >
            <span>Demander une étude gratuite</span>
            <svg
              className="w-3.75 h-3.75 transition-transform group-hover:translate-x-0.75"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
};
export default Products;
