import React from "react";
import BadgeIcon from "./../../../components/icons/BadgeIcon";
import TeamIcon from "./../../../components/icons/TeamIcon";
import TruckIcon from "./../../../components/icons/TruckIcon";
import SmallCheckIcon from "./../../../components/icons/SmallCheckIcon";

const TrustBar = () => {
  const trustBarElts = [
    {
      icon: <BadgeIcon />,
      title: "Garantie constructeur",
      descreption:
        "Garantie sur tous nos équipements, selon le fabricant choisi.",
    },
    {
      icon: <TeamIcon />,
      title: "SAV local",
      descreption: "Une équipe technique basée à Tunis, joignable directement.",
    },
    {
      icon: <SmallCheckIcon />,
      title: "Produits certifiés",
      descreption:
        "Matériel conforme aux normes en vigueur et compatible STEG.",
    },
  ];

  return (
    <section className="bg-(--white) border-y border-(--line) py-0">
      <div className="max-w-290 mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {trustBarElts.map((el, index) => (
          <div
            key={index}
            className="p-7 md:py-10 md:px-7 flex flex-col gap-3.5 border-t sm:border-t-0 sm:border-l first:border-l-0 border-(--line)"
          >
            <>{el.icon}</>
            <h3 className="font-serif text-base font-medium text-(--ink)">
              {el.title}
            </h3>
            <p className="text-[13.5px] text-(--slate) leading-normal">
              {el.descreption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;
