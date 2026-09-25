"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
// import imgProject0 from "./../../../public/images/projet0.jpg";
// import imgProject1 from "./../../../public/images/projet1.jpg";

type Project = {
  title: string;
  tag: string;
  description: string;
  image?: any;
};

const projects: Project[] = [
  {
    title: "Villa Les Oliviers",
    tag: "Résidentiel",
    description:
      "9 kWc en toiture inclinée, autoconsommation avec revente du surplus.",
    image: "/images/projet0.jpg",
  },
  {
    title: "Ombrière de parking",
    tag: "Commercial",
    description:
      "60 kWc en ombrière, à la fois production d'énergie et places à l'ombre.",
    image: "/images/projet1.jpg",
  },
  {
    title: "Ferme solaire de Sfax",
    tag: "Agrivoltaïque",
    description:
      "250 kWc au sol, raccordement moyenne tension et suivi de production à distance.",
    image: "/images/projet2.jpg",
  },
  {
    title: "Rénovation toiture Hammamet",
    tag: "Résidentiel",
    description:
      "12 kWc avec remplacement de couverture et intégration esthétique des panneaux.",
    image: "/images/projet3.jpg",
  },
  {
    title: "Extension atelier technique",
    tag: "Industriel",
    description:
      "80 kWc en toiture, dimensionné pour couvrir les pics de consommation en journée.",
    image: "/images/projet4.jpg",
  },
];

const ProjectsSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByStep = (direction: number) => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector(".project-card");
    const step = card ? card.clientWidth + 24 : 340;
    trackRef.current.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const AUTOPLAY_DELAY = 4500;
    let timer: NodeJS.Timeout;

    const advance = () => {
      const isEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (isEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const card = track.querySelector(".project-card");
        const step = card ? card.clientWidth + 24 : 340;
        track.scrollBy({ left: step, behavior: "smooth" });
      }
    };

    const startAutoplay = () => {
      clearInterval(timer);
      timer = setInterval(advance, AUTOPLAY_DELAY);
    };

    const stopAutoplay = () => clearInterval(timer);

    startAutoplay();

    track.addEventListener("mouseenter", stopAutoplay);
    track.addEventListener("mouseleave", startAutoplay);
    track.addEventListener("touchstart", stopAutoplay, { passive: true });

    return () => {
      stopAutoplay();
      track.removeEventListener("mouseenter", stopAutoplay);
      track.removeEventListener("mouseleave", startAutoplay);
      track.removeEventListener("touchstart", stopAutoplay);
    };
  }, []);

  return (
    <section id="projets" className="pt-20 pb-20">
      <div className="max-w-[1160px] mx-auto px-8">
        <div className="flex justify-between items-end gap-8 mb-10 flex-wrap">
          <div>
            <div className="section-title">Nos projets</div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium max-w-md">
              Des installations livrées, pas seulement promises
            </h2>
            <p className="text-slateCustom text-base max-w-xl mt-2.5">
              Un aperçu de réalisations récentes, résidentielles, commerciales
              et agricoles.
            </p>
          </div>
          <div className="flex gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              className="cursor-pointer w-11.5 h-11.5 rounded-full border border-line bg-white text-ink flex items-center justify-center hover:bg-forest hover:text-cream hover:border-forest transition-colors"
              aria-label="Projet précédent"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              className="cursor-pointer w-11.5 h-11.5 rounded-full border border-line bg-white text-ink flex items-center justify-center hover:bg-forest hover:text-cream hover:border-forest transition-colors"
              aria-label="Projet suivant"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-8 max-w-[1160px] mx-auto no-scrollbar"
      >
        {projects.map((proj, index) => (
          <div
            key={index}
            className="project-card flex-none w-[280px] md:w-[340px] snap-start bg-(--white) rounded-2xl overflow-hidden border border-(--line) shadow-md group"
          >
            <div className="h-56 relative overflow-hidden">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <span className="inline-block text-[11.5px] font-bold tracking-wider text-(--gold-deep) bg-(--sage) px-3 py-1 rounded-full mb-3">
                {proj.tag}
              </span>
              <h3 className="font-serif text-lg font-medium mb-2">
                {proj.title}
              </h3>
              <p className="text-slateCustom text-sm leading-relaxed">
                {proj.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
