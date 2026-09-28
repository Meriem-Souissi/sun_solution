import Image from "next/image";
import bandImage from "./../../../public/images/Band.jpg";
import React from "react";

const BandImage = () => {
  return (
    <>
      <section className="relative min-h-[360px] py-[120px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={bandImage}
            alt="Panneau solaire sous un ciel bleu"
            fill
            // className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E263C]/90 via-[#0E263C]/60 to-[#0E263C]/25"></div>
        </div>
        <div className="relative z-10 max-w-[1160px] mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
          <div>
            <h2 className="font-serif text-2xl lg:text-3xl text-(--cream) max-w-xs">
              Une équipe locale, du matériel certifié
            </h2>
            <p className="text-[#D4DED6] mt-3.5 max-w-md text-base">
              Nous travaillons avec des équipements certifiés et une équipe
              technique interne, sans sous-traitance sur les postes clés.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-7">
            <div>
              <b className="font-serif text-3xl font-medium text-(--gold) block">
                X
              </b>
              <span className="text-[#D4DED6] text-xs mt-1 block">
                installations
              </span>
            </div>
            <div>
              <b className="font-serif text-3xl font-medium text-(--gold) block">
                xx MW
              </b>
              <span className="text-[#D4DED6] text-xs mt-1 block">
                puissance cumulée
              </span>
            </div>
            <div>
              <b className="font-serif text-3xl font-medium text-(--gold) block">
                8
              </b>
              <span className="text-[#D4DED6] text-xs mt-1 block">
                ans d'expérience
              </span>
            </div>
            <div>
              <b className="font-serif text-3xl font-medium text-(--gold) block">
                98%
              </b>
              <span className="text-[#D4DED6] text-xs mt-1 block">
                clients satisfaits
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BandImage;
