"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "./../../components/ui/ProductCard";

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
    image: "/images/produits/jonsol-jsm144-550.jpg",
    techSheetUrl: "/fiches-techniques/jonsol-jsm144-550.pdf",
    badge: { label: "Top Vente", variant: "gold" },
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
    image: "/images/produits/sungrow-sg320hx.jpg",
    techSheetUrl: "/fiches-techniques/sungrow-sg320hx.pdf",
    badge: { label: "Pro & Industriel", variant: "navy" },
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
    image: "/images/produits/huawei-sun2000-2-4-6.jpg",
    techSheetUrl: "/fiches-techniques/huawei-sun2000-2-4-6.pdf",
    badge: { label: "Résidentiel & Tertiaire", variant: "light" },
  },
  {
    id: "huawei-sun2000-6-10",
    title: "Onduleur Huawei SUN2000 (6-8-10)",
    category: "Onduleurs triphasés",
    description:
      "La série Huawei SUN2000-3/4/5/6/8/10KTL-M1 est une gamme d'onduleurs solaires conçue pour les installations photovoltaïques résidentielles ou petites installations tertiaires.",
    features: ["Rendement maximal élevé", "Protections contre les surtensions"],
    image: "/images/produits/huawei-sun2000-6-10.jpg",
    techSheetUrl: "/fiches-techniques/huawei-sun2000-6-10.pdf",
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
    image: "/images/produits/huawei-sun2000-12-25.jpg",
    techSheetUrl: "/fiches-techniques/huawei-sun2000-12-25.pdf",
    badge: { label: "Résidentiel & Tertiaire", variant: "light" },
  },
  {
    id: "huawei-sun2000-30-40",
    title: "Onduleur Huawei SUN2000 (30-40)",
    category: "Onduleurs triphasés",
    description:
      "La gamme Huawei SUN2000 (30–40 kW) regroupe des onduleurs triphasés adaptés aux installations photovoltaïques de moyenne et grande puissance, notamment dans les secteurs commercial et industriel.",
    features: ["Sécurité renforcée", "Conception robuste"],
    image: "/images/produits/huawei-sun2000-30-40.jpg",
    techSheetUrl: "/fiches-techniques/huawei-sun2000-30-40.pdf",
    badge: { label: "Résidentiel & Tertiaire", variant: "light" },
  },
];

export default function ProductsPage() {
  // États pour le calculateur 1 (Nombre de panneaux)
  const [panelKw, setPanelKw] = useState<number>(1);

  // États pour le calculateur 2 (Onduleur sur mesure)
  const [ondKw, setOndKw] = useState<number>(1);
  const [ondPowerValue, setOndPowerValue] = useState<number>(1);

  // États pour le calculateur 3 (Compatibilité Onduleur / PV)
  const [pvPower, setPvPower] = useState<number>(1);
  const [inverterPower, setInverterPower] = useState<number>(1);

  // Ouverture sécurisée de la fiche technique PDF
  const openTechSheet = (file: string) => {
    window.open(`/${file}`, "_blank", "noopener,noreferrer");
  };

  // Calcul du nombre de panneaux requis
  const panelCalculation = useMemo(() => {
    const rawPanels = panelKw / 0.55;
    const count = Math.max(1, Math.ceil(rawPanels));
    const totalPower = (count * 0.55).toFixed(2).replace(".", ",");
    return { count, totalPower };
  }, [panelKw]);

  // Vérification de compatibilité (Calculateur 3)
  const compatibilityResult = useMemo(() => {
    if (inverterPower <= 0) {
      return {
        ratio: "Erreur",
        status: "Puissance onduleur invalide",
        colorClass: "text-red-500",
      };
    }
    const ratio = pvPower / inverterPower;
    const ratioFormatted = ratio.toFixed(2);

    if (ratio >= 0.9 && ratio <= 1.3) {
      return {
        ratio: ratioFormatted,
        status: "✅ Onduleur Compatible",
        colorClass: "text-emerald-600",
      };
    } else if (ratio < 0.9) {
      return {
        ratio: ratioFormatted,
        status:
          "❌ Onduleur non compatible (le rapport de puissance est trop bas < 0.9)",
        colorClass: "text-red-500",
      };
    } else {
      return {
        ratio: ratioFormatted,
        status:
          "❌ Onduleur non compatible (le rapport de puissance est trop haut > 1.3)",
        colorClass: "text-red-500",
      };
    }
  }, [pvPower, inverterPower]);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
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

      {/* SECTION SIMULATEURS */}
      {/* <section className="max-w-[1160px] mx-auto px-8 space-y-8"> */}
      {/* SIMULATEUR 1 : CALCUL DU NOMBRE DE PANNEAUX */}
      {/* <div className="bg-white rounded-2xl border border-border-card p-8 max-w-[500px] mx-auto shadow-lg">
          <div className="mb-6">
            <span className="inline-block bg-primary-blue/10 text-primary-blue font-bold text-xs px-3 py-1 rounded-full uppercase mb-3">
              Simulateur Solaire
            </span>
            <h2 className="text-slate-900 text-2xl font-extrabold mb-2">
              Calculez vos panneaux{" "}
              <span className="text-primary-blue">sur mesure</span>
            </h2>
            <p className="text-slate-500 text-sm">
              Entrez la puissance crête à installer (kWc) :
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="panelKw"
              className="block text-xs font-semibold text-slate-800 mb-2"
            >
              Puissance crête (kWc)
            </label>
            <input
              id="panelKw"
              type="number"
              min="1"
              max="50000"
              step="0.1"
              value={panelKw}
              onChange={(e) => setPanelKw(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-white border border-border-card rounded-xl focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 transition-colors"
            />
          </div>

          <div className="bg-white rounded-xl border border-border-card p-5 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">
                Nombre de panneaux requis :
              </span>
              <span className="text-xl font-extrabold text-primary-blue">
                {panelCalculation.count} panneaux
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">
                Puissance totale estimée :
              </span>
              <span className="text-xl font-extrabold text-primary-blue">
                {panelCalculation.totalPower} kWc
              </span>
            </div>
          </div>
        </div> */}

      {/* SIMULATEUR 2 : CHOIX ONDULEUR SUR MESURE */}
      {/* <div className="bg-white rounded-2xl border border-border-card p-8 max-w-[500px] mx-auto shadow-lg">
          <div className="mb-6">
            <span className="inline-block bg-primary-blue/10 text-primary-blue font-bold text-xs px-3 py-1 rounded-full uppercase mb-3">
              Simulateur Solaire
            </span>
            <h2 className="text-slate-900 text-2xl font-extrabold mb-2">
              Choisissez votre onduleur{" "}
              <span className="text-primary-blue">sur mesure</span>
            </h2>
            <p className="text-slate-500 text-sm">
              Entrez la puissance crête à installer (kWc) :
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label
                htmlFor="ondKw"
                className="block text-xs font-semibold text-slate-800 mb-2"
              >
                Puissance crête (kWc)
              </label>
              <input
                id="ondKw"
                type="number"
                min="1"
                max="50000"
                step="0.1"
                value={ondKw}
                onChange={(e) => setOndKw(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-white border border-border-card rounded-xl focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="ondPowerValue"
                className="block text-xs font-semibold text-slate-800 mb-2"
              >
                Entrez la puissance de l'onduleur (kW) :
              </label>
              <input
                id="ondPowerValue"
                type="number"
                min="0"
                max="50000"
                step="0.1"
                value={ondPowerValue}
                onChange={(e) =>
                  setOndPowerValue(parseFloat(e.target.value) || 0)
                }
                className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-white border border-border-card rounded-xl focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 transition-colors"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border-card p-5">
            <div className="flex flex-col text-sm gap-1">
              <span className="text-slate-500 font-medium">
                Compatibilité en puissance :
              </span>
              <span className="text-lg font-extrabold text-primary-blue">
                0.9 ≤ Pcpv / (Pac ond) ≤ 1.3
              </span>
            </div>
          </div>
        </div> */}

      {/* SIMULATEUR 3 : VÉRIFICATION DE COMPATIBILITÉ ONDULEUR / PV */}
      {/* <div className="bg-white rounded-2xl border border-border-card p-8 max-w-[500px] mx-auto shadow-lg">
          <div className="mb-6">
            <span className="inline-block bg-primary-blue/10 text-primary-blue font-bold text-xs px-3 py-1 rounded-full uppercase mb-3">
              Vérification Technique
            </span>
            <h2 className="text-slate-900 text-2xl font-extrabold mb-2">
              Compatibilité{" "}
              <span className="text-primary-blue">Onduleur / PV</span>
            </h2>
            <p className="text-slate-500 text-sm">
              Testez le dimensionnement de votre installation :
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label
                htmlFor="pvPower"
                className="block text-xs font-semibold text-slate-800 mb-2"
              >
                Puissance Crête PV (en kWc)
              </label>
              <input
                id="pvPower"
                type="number"
                min="0"
                step="0.1"
                value={pvPower}
                onChange={(e) => setPvPower(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-white border border-border-card rounded-xl focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="inverterPower"
                className="block text-xs font-semibold text-slate-800 mb-2"
              >
                Puissance de l'Onduleur (en kW)
              </label>
              <input
                id="inverterPower"
                type="number"
                min="0"
                step="0.1"
                value={inverterPower}
                onChange={(e) =>
                  setInverterPower(parseFloat(e.target.value) || 0)
                }
                className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-white border border-border-card rounded-xl focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/10 transition-colors"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border-card p-5 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">
                0.9 ≤ Pcpv / (Pac ond) ≤ 1.3 :
              </span>
              <span className="text-lg font-extrabold text-primary-blue">
                {compatibilityResult.ratio}
              </span>
            </div>
            <div className="flex flex-col text-sm pt-2 border-t border-slate-100">
              <span className="text-slate-500 font-medium mb-1">Statut :</span>
              <span
                className={`text-sm font-bold leading-relaxed ${compatibilityResult.colorClass}`}
              >
                {compatibilityResult.status}
              </span>
            </div>
          </div>
        </div> */}
      {/* </section> */}
    </main>
  );
}
