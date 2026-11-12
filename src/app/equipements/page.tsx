"use client";
import { PRODUCTS } from "./../../data/products";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import TrustBar from "./components/TrustBar";

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
          <div className="mx-auto px-8 max-w-180">
            <div className="section-title">
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
      <TrustBar />

      {/* CTA BAND */}
      {/* <section className="bg-(--forest) text-(--cream) py-24">
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
      </section> */}
    </main>
  );
};
export default Products;
