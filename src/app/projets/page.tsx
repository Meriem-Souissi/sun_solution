"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Project } from "./../../types/project";

const PROJECTS_DATA: Project[] = [
  {
    id: "centrale-sidi-bouzid",
    category: "Centrale",
    kwc: 1000,
    gov: "Sidi Bouzid",
    title: "Centrale Photovoltaïque",
    description: "Réalisation d'une centrale en régime d'autorisation.",
    image: "/images/projets/centrale.jpg",
    // isFeatured: true,
  },
  {
    id: "res-tunis",
    category: "Résidentiel",
    kwc: 2.2,
    gov: "Tunis",
    title: "Autoconsommation Résidentielle",
    description: "Installation en toiture plate avec revente du surplus.",
    image: "/images/projets/résidentiel.jpg",
  },
  {
    id: "eclairage-zaghouan",
    category: "Collectivité",
    kwc: 11,
    gov: "Zaghouan",
    title: "Éclairage Public Solaire",
    description: "Système autonome de luminaires LED par panneaux solaires.",
    image: "/images/projets/eclairage public.jpg",
  },
  {
    id: "pompage-gafsa",
    category: "Agriculture",
    kwc: 50,
    gov: "Gafsa",
    title: "Pompage Solaire Photovoltaïque",
    description:
      "Extraction et distribution d'eau automatisée pour l'irrigation.",
    image: "/images/projets/pompage.jpg",
  },
  {
    id: "tertiaire-mahdia",
    category: "Off-Grid",
    kwc: 5.5,
    gov: "Mahdia",
    title: "Toiture Solaire Tertiaire",
    description:
      "Système autonome d’alimentation électrique d’une habitation par panneaux solaires photovoltaïques Off-Grid.",
    image: "/images/projets/installation-off-grid.jpg",
  },
  {
    id: "centrale-mecano",
    category: "Centrale",
    kwc: 165,
    gov: "Zaghouan",
    title: "Centrale Solaire Photovoltaïque",
    description:
      "Réalisation et accompagnement des projets de centrales photovoltaïques sous le régime d’autorisation, de l’étude à la mise en service.",
    image: "/images/projets/centrale.jpg",
  },
  {
    id: "centrale-palma",
    category: "Centrale",
    kwc: 504,
    gov: "Gafsa",
    title: "Centrale Photovoltaïque",
    description:
      "Réalisation et accompagnement des projets de centrales photovoltaïques sous le régime d’autorisation, de l’étude à la mise en service.",
    image: "/images/projets/centrale.jpg",
  },
];

// const FILTERS = [
//   { label: "Tous", value: "all" },
//   { label: "Résidentiel", value: "Résidentiel" },
//   { label: "Collectivité", value: "Collectivité" },
//   { label: "Centrale", value: "Centrale" },
//   { label: "Agriculture", value: "Agriculture" },
//   { label: "Off-Grid", value: "Off-Grid" },
// ];

const page = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [imageError, setImageError] = useState(false);

  // Calcul des statistiques globales (indépendantes du filtre actif)
  // const stats = useMemo(() => {
  //   const totalCount = PROJECTS_DATA.length;
  //   const totalKwc = PROJECTS_DATA.reduce((acc, curr) => acc + curr.kwc, 0);
  //   const uniqueGovs = new Set(PROJECTS_DATA.map((p) => p.gov)).size;

  //   const formatter = new Intl.NumberFormat("fr-FR", {
  //     maximumFractionDigits: 2,
  //   });
  //   const formattedPower =
  //     totalKwc >= 1000
  //       ? `${formatter.format(totalKwc / 1000)} MWc`
  //       : `${formatter.format(totalKwc)} kWc`;

  //   return {
  //     count: totalCount,
  //     power: formattedPower,
  //     govs: uniqueGovs,
  //   };
  // }, []);

  // Compteurs pour chaque catégorie de filtre
  // const categoryCounts = useMemo(() => {
  //   const counts: Record<string, number> = { all: PROJECTS_DATA.length };
  //   PROJECTS_DATA.forEach((p) => {
  //     counts[p.category] = (counts[p.category] || 0) + 1;
  //   });
  //   return counts;
  // }, []);

  // Projets filtrés
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === activeFilter);
  }, [activeFilter]);
  return (
    <main className="min-h-screen bg-(--cream) text-(--ink)">
      <section className="py-20 bg-(--cream)">
        <section className="pt-7 pb-9">
          <div className="mx-auto px-8 max-w-180">
            <div className="section-title">Nos références & succès</div>
            <h1 className="font-serif text-3xl md:text-5xl font-medium leading-tight text-(--ink) max-w-[18ch]">
              Ils font confiance à notre expertise solaire
            </h1>
            <p className="text-(--slate-custom) text-[16.5px] mt-4 max-w-[56ch] leading-relaxed">
              Découvrez quelques-unes de nos réalisations phares en Tunisie.
            </p>
          </div>
        </section>

        {/* STATS BAND */}
        {/* <section
          className="pt-7 pb-9"
          aria-label="Chiffres clés des réalisations présentées"
        >
          <div className="w-full max-w-[1160px] mx-auto px-[32px] max-[520px]:px-[20px]">
            <div className="grid grid-cols-3 max-[640px]:grid-cols-1 bg-(--white) border border-(--line) rounded-[20px]">
              <div className="p-[28px_32px] max-[640px]:border-t max-[640px]:first:border-t-0 max-[640px]:p-[22px_24px] border-l first:border-l-0 border-(--line)">
                <b className="block font-serif font-medium text-[34px] leading-[1.1] text-(--forest)">
                  {stats.count}
                </b>
                <span className="block mt-1.5 text-[13.5px] text-(--slate-custom)">
                  Réalisations présentées
                </span>
              </div>
              <div className="p-[28px_32px] max-[640px]:border-t max-[640px]:first:border-t-0 max-[640px]:p-[22px_24px] border-l first:border-l-0 border-(--line)">
                <b className="block font-serif font-medium text-[34px] leading-[1.1] text-(--forest)">
                  {stats.power}
                </b>
                <span className="block mt-[6px] text-[13.5px] text-(--slate-custom)">
                  Puissance cumulée
                </span>
              </div>
              <div className="p-[28px_32px] max-[640px]:border-t max-[640px]:first:border-t-0 max-[640px]:p-[22px_24px] border-l first:border-l-0 border-(--line)">
                <b className="block font-serif font-medium text-[34px] leading-[1.1] text-(--forest)">
                  {stats.govs}
                </b>
                <span className="block mt-[6px] text-[13.5px] text-(--slate-custom)">
                  Gouvernorats
                </span>
              </div>
            </div>
          </div>
        </section> */}

        {/* PROJECTS MAIN & FILTERS */}
        <section className="pb-[110px]">
          <div className="w-full max-w-[1160px] mx-auto px-[32px] max-[520px]:px-[20px]">
            {/* FILTERS */}
            {/* <div
              className="flex flex-wrap gap-2 mb-[34px]"
              role="group"
              aria-label="Filtrer par type de projet"
            >
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.value;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setActiveFilter(filter.value)}
                    aria-pressed={isActive}
                    className={`font-sans text-[13.5px] font-semibold px-4.5 py-2.5 rounded-full border cursor-pointer transition-colors duration-180 ${
                      isActive
                        ? "bg-(--forest) border-(--forest) text-(--cream)"
                        : "bg-(--white) border-(--line) text-(--slate) hover:text-ink hover:border-(--forest-soft)"
                    }`}
                  >
                    {filter.label}
                    <span className="ml-[7px] font-medium opacity-[0.65]">
                      {categoryCounts[filter.value] || 0}
                    </span>
                  </button>
                );
              })}
            </div> */}

            {/* GRID */}
            <div className="grid grid-cols-3 max-[960px]:grid-cols-2 max-[640px]:grid-cols-1 gap-[24px]">
              {filteredProjects.map((project) => {
                const isFeatured = project.isFeatured;
                return (
                  <article
                    key={project.id}
                    data-category={project.category}
                    className={`flex flex-col bg-(--white) border border-(--line) rounded-[18px] overflow-hidden transition-all duration-250 hover:-translate-y-1 hover:border-[#E8951A8C] hover:shadow-[0_26px_44px_-26px_rgba(23,36,46,0.35)] animate-[cardIn_.45s_ease_both] ${
                      isFeatured
                        ? "col-span-full grid grid-cols-[1.1fr_1fr] max-[960px]:grid-cols-1"
                        : ""
                    }`}
                  >
                    {/* MEDIA CONTAINER */}
                    <div
                      className={`relative overflow-hidden bg-gradient-to-br from-sage to-cream-2 flex items-center grow justify-center ${
                        isFeatured
                          ? "min-h-[360px] max-[960px]:min-h-[260px]"
                          : "h-[220px]"
                      }`}
                    >
                      <span className="absolute top-4 left-4 z-10 px-3 py-[7px] bg-[rgba(255,255,255,0.96)] text-(--forest) border border-(--line) text-[11.5px] font-bold leading-none rounded-full">
                        {project.category}
                      </span>

                      {/* Fallback SVG Placeholder */}
                      <div className="text-(--forest-soft) opacity-[0.85]">
                        {!imageError ? (
                          <Image
                            src={project.image}
                            alt={`${project.title} — ${project.gov}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="absolute inset-0 object-cover transition-transform duration-600 hover:scale-106"
                            loading="lazy"
                            onError={() => setImageError(true)}
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-3 text-(--forest-soft) text-center px-5">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="3"
                                y="4"
                                width="18"
                                height="14"
                                rx="1.2"
                              />
                              <path d="M3 9h18M3 14h18M9 4v14M15 4v14M8 21h8" />
                            </svg>
                            <span className="text-[12.5px] font-medium text-(--slate-custom)">
                              {project.title}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* BODY CONTAINER */}
                    <div
                      className={`flex flex-col grow ${
                        isFeatured
                          ? "justify-center p-[44px] max-[960px]:p-[30px_26px]"
                          : "p-[24px_24px_26px]"
                      }`}
                    >
                      {isFeatured && (
                        <div className="section-title">Projet phare</div>
                      )}

                      <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-(--gold-deep) mb-[10px]">
                        <svg
                          className="w-3.5 h-3.5 shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>
                        {project.gov}
                      </div>

                      <h3
                        className={`font-serif font-medium leading-[1.25] text-(--ink) mb-2.5 ${isFeatured ? "text-[clamp(26px,3vw,34px)] mb-3.5" : "text-[20px]"}`}
                      >
                        {project.title}
                      </h3>

                      <p
                        className={`text-slate leading-[1.6] grow mb-5.5 ${isFeatured ? "text-[15.5px] max-w-[46ch] mb-7" : "text-[14px]"}`}
                      >
                        {project.description}
                      </p>

                      <div className="flex items-baseline justify-between gap-3 pt-4 border-t border-(--line)">
                        <span className="text-[13px] text-(--slate)">
                          Puissance
                        </span>
                        <b
                          className={`font-serif font-medium text-(--forest) ${isFeatured ? "text-[42px] leading-[1]" : "text-[24px]"}`}
                        >
                          {project.kwc >= 1000
                            ? `${project.kwc / 1000} MWc`
                            : `${project.kwc.toString().replace(".", ",")} kWc`}
                        </b>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default page;
