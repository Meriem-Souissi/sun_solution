import React from "react";

const ProcedureSection = () => {
  const procedureTab = [
    {
      step: "01",
      title: "Visite technique",
      text: "Évaluation de votre toiture, exposition et consommation actuelle.",
      meta: "Sous 48h",
    },
    {
      step: "02",
      title: "Étude chiffrée",
      text: "Dimensionnement précis, simulation de production, devis détaillé.",
      meta: "3 à 5 jours",
    },
    {
      step: "03",
      title: "Démarches admin.",
      text: "Raccordement et autorisations déposés pour vous.",
      meta: "Pris en charge",
    },
    {
      step: "04",
      title: "Installation",
      text: "Pose des panneaux, de l'onduleur et du câblage, chantier propre.",
      meta: "1 à 3 jours",
    },
    {
      step: "05",
      title: "Mise en service",
      text: "Raccordement, tests de production, suivi dans la durée.",
      meta: "Suivi continu",
    },
    {
      step: "06",
      title: "Service aprés vente",
      text: "**********************************",
      meta: "*****",
    },
  ];
  return (
    <>
      <section id="procedure" className="py-28 bg-(--forest) text-(--cream)">
        <div className="max-w-[1160px] mx-auto px-8">
          <div className="max-w-2xl mb-16">
            <div className="section-title text-(--gold)">Notre procédure</div>
            <h2 className="font-serif text-3xl md:text-4xl text-cream font-medium">
              De la prise de contact à la mise en service
            </h2>
            <p className="text-[#C7D2C9] mt-4 text-base">
              Un déroulé encadré en cinq étapes, avec un point de suivi à
              chacune d'elles.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-7">
            {procedureTab.map((p, i) => (
              <div key={i} className="border-t border-(--cream)/20 pt-6">
                <span className="font-serif text-base text-(--gold) block mb-4.5">
                  {p.step}
                </span>
                <h3 className="text-(--cream) text-lg font-medium mb-2.5 min-h-[44px]">
                  {p.title}
                </h3>
                <p className="text-[#B7C4B9] text-xs leading-relaxed">
                  {p.text}
                </p>
                <span className="block mt-4 text-[11.5px] font-semibold text-(--gold) tracking-wider">
                  {p.meta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProcedureSection;
