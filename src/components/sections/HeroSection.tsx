import Image from "next/image";
import Link from "next/link";
import imgHeroSection from "./../../../public/images/heroSection.jpg";
import { ArrowIcon } from "../icons/ArrowIcon";
import BlueButton from "../ui/BlueButton";

const HeroSection = () => {
  return (
    <>
      <section id="accueil" className="pt-20 pb-0">
        <div className="max-w-[1160px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1fr_0.92fr] gap-16 items-center">
          <div>
            <div className="section-title">
              EPC fournisseur d'équipement photovoltaïque
            </div>
            <h1 className="font-serif text-4xl lg:text-6xl font-medium text-ink leading-tight">
              L'énergie solaire,{" "}
              <em className="italic text-forest font-serif">
                pensée simplement.
              </em>
            </h1>
            <p className="text-slateCustom text-lg max-w-md mt-6">
              Fondée en 2018, Sun Solution est spécialisée dans le
              photovoltaïque. Nous accompagnons particuliers et professionnels
              avec des solutions solaires performantes, fiables et durables,
              adaptées à leurs besoins. Ensemble, faisons le choix d’une énergie
              plus propre et durable!
            </p>
            <div className="flex gap-4 mt-9 flex-wrap">
              <Link href="#contact">
                <BlueButton icon={<ArrowIcon />} className="px-6 py-4">
                  Demander une étude gratuite
                </BlueButton>
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full font-semibold text-sm text-(--ink) border border-(--line) hover:border-(--forest) hover:bg-(--forest)/5 transition-colors"
              >
                Voir nos services
              </Link>
            </div>
            <div className="flex items-center gap-7 mt-14 pt-7 border-t border-(--line) flex-wrap">
              <div className="flex items-center gap-2.5">
                <b className="font-serif text-2xl font-medium text-(--forest)">
                  +450
                </b>
                <span className="text-xs text-slateCustom leading-snug max-w-[11ch]">
                  installations réalisées
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <b className="font-serif text-2xl font-medium text-(--forest)">
                  8 ans
                </b>
                <span className="text-xs text-slateCustom leading-snug max-w-[11ch]">
                  d'expérience terrain
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <b className="font-serif text-2xl font-medium text-(--forest)">
                  25 ans
                </b>
                <span className="text-xs text-slateCustom leading-snug max-w-[11ch]">
                  garantie panneaux
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden h-[380px] lg:h-[520px] shadow-2xl relative">
              <Image
                src={imgHeroSection}
                alt="Maison équipée de panneaux solaires, vue aérienne"
                fill
                className="object-cover saturate-105"
                priority
              />
            </div>
            <div className="static lg:absolute lg:-left-8 lg:bottom-9 bg-(--white) rounded-2xl p-6 max-w-none lg:max-w-[220px] shadow-xl mt-4 lg:mt-0">
              <b className="font-serif text-3xl font-medium text-(--gold-deep) block">
                98%
              </b>
              <span className="text-xs text-slateCustom mt-1 block leading-relaxed">
                de clients satisfaits du suivi après installation
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-20 pb-20">
        <div className="max-w-[1160px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-14">
          <p className="font-serif font-medium text-2xl lg:text-3xl leading-snug max-w-[14ch]">
            Une énergie que vous produisez, que vous maîtrisez.
          </p>
          <div>
            <p className="text-slateCustom text-base max-w-xl mb-4">
              Chaque toiture reçoit assez de lumière pour couvrir une bonne
              part, parfois la totalité, de sa propre consommation. Nous
              dimensionnons chaque installation pour votre profil réel, pas pour
              un catalogue générique.
            </p>
            <p className="text-slateCustom text-base max-w-xl">
              Nos équipes gèrent l'étude technique, les démarches
              administratives, l'installation et le suivi de production — pour
              que l'énergie solaire reste simple de bout en bout.
            </p>
            <div className="flex gap-9 mt-8 flex-wrap">
              {[
                "Étude personnalisée",
                "Démarches prises en charge",
                "Équipe technique interne",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 text-sm text-ink font-medium"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D9A441"
                    strokeWidth="2.4"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
