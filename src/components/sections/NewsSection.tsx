"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import new1 from "./../../../public/images/new1.jpg";
import new2 from "./../../../public/images/new2.jpg";
import new3 from "./../../../public/images/new3.jpg";
import new4 from "./../../../public/images/new4.jpg";
import new5 from "./../../../public/images/new5.jpg";

type NewsSlide = {
  id: string;
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  isExternalPdf?: boolean;
  image: string;
};

const news_slides: NewsSlide[] = [
  {
    id: "jonsol-550",
    badge: "Nouveauté Produit",
    title: "Maximisez votre production avec les modules JONSOL 550W",
    description:
      "Découvrez la nouvelle génération de panneaux monocristallins à technologie Half-Cut. Rendement exceptionnel, même par faible ensoleillement.",
    ctaText: "Voir la fiche technique",
    ctaLink: "/fiche technique Jonsol.pdf",
    isExternalPdf: true,
    image: "/images/new1.jpg",
  },
  {
    id: "simulator",
    badge: "Outil Gratuit",
    title: "Calculez vos besoins en panneaux solaires en 2 clics",
    description:
      "Utilisez notre nouveau simulateur interactif pour estimer le nombre exact de panneaux et la puissance crête (kWc) nécessaire à votre projet.",
    ctaText: "Essayer le simulateur",
    ctaLink: "#simulateur",
    image: "/images/new2.jpg",
  },
  {
    id: "huawei-m5",
    badge: "Technologie & Sécurité",
    title: "Onduleurs Triphasés Huawei SUN2000 (12 à 25 kW)",
    description:
      "Optimisez vos installations commerciales grâce à la supervision intelligente à distance et la protection contre les arcs électriques.",
    ctaText: "Télécharger la fiche PDF",
    ctaLink: "/sun2000-12-15-17-20-25ktl-m5.pdf",
    isExternalPdf: true,
    image: "/images/new3.jpg",
  },
  {
    id: "steg-support",
    badge: "Service Client",
    title: "Vos démarches d'autorisation et de raccordement simplifiées",
    description:
      "Sun Solution prend en charge l'intégralité de votre dossier technique et administratif du premier rendez-vous à la mise en service.",
    ctaText: "Demander une étude gratuite",
    ctaLink: "/contact",
    image: "/images/new4.jpg",
  },
  {
    id: "luna-battery",
    badge: "Autonomie Énergétique",
    title: "Stockez votre propre énergie avec la batterie LUNA2000",
    description:
      "Conservez votre surplus de production grâce à une technologie modulable au lithium LiFePO4 ultra-sécurisée.",
    ctaText: "Consulter la fiche technique",
    ctaLink: "/luna fiche technique.pdf",
    isExternalPdf: true,
    image: "/images/new5.jpg",
  },
];

const NewsSection = () => {
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
    <section id="nouveautés" className="pt-20 pb-20">
      <div className="max-w-290 mx-auto px-8">
        <div className="flex justify-between items-end gap-8 mb-10 flex-wrap">
          <div>
            <div className="section-title">Notre nouveautés</div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium max-w-md">
              À la Une chez Sun Solution
            </h2>
            <p className="text-slateCustom text-base max-w-xl mt-2.5">
              Découvrez l'actualité de notre entreprise : lancements de matériel
              solaire haute performance, offres d'accompagnement STEG et
              nouvelles solutions de stockage.
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
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-8 max-w-290 mx-auto no-scrollbar"
      >
        {news_slides.map((slide) => (
          <div
            key={slide.id}
            className="new-card flex-none container snap-start bg-(--white) rounded-2xl overflow-hidden border border-(--line) shadow-md group"
          >
            {/* w-70 md:w-85 */}
            <div className="h-95 relative">
              {/* overflow-hidden */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* <div className="p-6"> */}
            {/* <span className="inline-block text-[11.5px] font-bold tracking-wider text-(--gold-deep) bg-(--sage) px-3 py-1 rounded-full mb-3">
                {slide.badge}
              </span> */}
            {/* <span className="absolute top-4 left-4 z-10 text-[11.5px] font-bold leading-none px-3 py-1.5 rounded-full text-(--gold-deep) bg-(--sage) mb-3">
                {slide.badge}
              </span> */}
            {/* <h3 className="font-serif text-lg font-medium mb-2">
                {slide.title}
              </h3> */}
            {/* <p className="text-slateCustom text-sm leading-relaxed">
                {slide.description}
              </p> */}
            {/* </div> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
