import React from "react";

const ServicesSection = () => {
  const servicesTab = [
    {
      index: "01",
      title: "Etude technique",
      text: "Analyse de votre toiture et de votre consommation pour un dimensionnement rentable, sans surdimensionnement.",
    },
    {
      index: "02",
      title: "Fourniture",
      text: "Assurer la fourniture des equipements necessaires à installation photovoltaïque: panneaux solaires, onduleurs, coffrets DC/AC, câblage et accessoires.",
    },
    {
      index: "03",
      title: "Installation",
      text: "Pose de panneaux en toiture, ombrière ou au sol, dimensionnée selon votre consommation et l'exposition de votre site.",
    },
    {
      index: "04",
      title: "Maintenance et sevice aprés vente",
      text: "Entretien préventif, nettoyage, contrôle des rendements et intervention rapide en cas d'anomalie.",
    },
  ];
  return (
    <>
      <section id="services" className="pt-20 pb-20 bg-(--sage)">
        <div className="max-w-290 mx-auto px-8">
          <div className="flex justify-between items-end gap-10 mb-16 flex-wrap">
            <h2 className="font-serif text-3xl md:text-4xl font-medium max-w-xs">
              Tout ce qu'il faut, du toit au compteur
            </h2>
            <p className="text-slateCustom text-base max-w-sm">
              Quatre expertises complémentaires, mobilisées selon les besoins de
              votre projet.
            </p>
          </div>
          <div className="flex flex-col">
            {servicesTab.map((serv, i) => (
              <div
                key={i}
                className="grid grid-cols-[50px_1fr] md:grid-cols-[80px_1fr_1.6fr] gap-4 md:gap-8 items-center py-9 border-t border-(--ink)/12 last:border-b"
              >
                <span className="font-serif text-3xl md:text-4xl font-medium text-(--gold-deep)">
                  {serv.index}
                </span>
                <h3 className="font-serif text-xl font-medium">{serv.title}</h3>
                <p className="text-slateCustom text-sm md:text-base col-span-2 md:col-span-1">
                  {serv.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
