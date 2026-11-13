"use client";

import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";

interface CartItem {
  id: string | number;
  nom: string;
  quantite: number;
}

interface OrderFormState {
  nom: string;
  telephone: string;
  email: string;
  reception: "livraison" | "retrait";
  adresse: string;
  message: string;
}

const KEY = "panierSolaire";
const MAX_QTY = 10000;

export default function CartPage() {
  const [panier, setPanier] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [orderDone, setOrderDone] = useState<{
    client: OrderFormState;
    articles: CartItem[];
  } | null>(null);

  // État de confirmation pour vider le panier en 2 temps
  const [isArmed, setIsArmed] = useState<boolean>(false);

  // Formulaire state
  const [formData, setFormData] = useState<OrderFormState>({
    nom: "",
    telephone: "",
    email: "",
    reception: "livraison",
    adresse: "",
    message: "",
  });

  // Charger le panier depuis le localStorage au montage
  useEffect(() => {
    setIsClient(true);
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      const validItems = saved.filter(
        (it: any) => it && it.nom && parseInt(it.quantite, 10) > 0,
      );
      setPanier(validItems);
    } catch (e) {
      setPanier([]);
    }
  }, []);

  // Sauvegarder le panier et synchroniser le header
  const updateCart = (newPanier: CartItem[]) => {
    setPanier(newPanier);
    try {
      localStorage.setItem(KEY, JSON.stringify(newPanier));
    } catch (e) {}

    // Déclencher un événement global si votre header écoute les changements du panier
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
      if ((window as any).refreshHeaderCart) {
        (window as any).refreshHeaderCart();
      }
    }
  };

  const handleQuantityChange = (id: string | number, delta: number) => {
    const updated = panier.map((item) => {
      if (String(item.id) === String(id)) {
        const newQty = Math.max(1, Math.min(MAX_QTY, item.quantite + delta));
        return { ...item, quantite: newQty };
      }
      return item;
    });
    updateCart(updated);
  };

  const handleRemove = (id: string | number) => {
    const updated = panier.filter((item) => String(item.id) !== String(id));
    updateCart(updated);
  };

  const handleClearCart = () => {
    if (!isArmed) {
      setIsArmed(true);
      setTimeout(() => setIsArmed(false), 3500);
      return;
    }
    setIsArmed(false);
    updateCart([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (panier.length === 0) return;

    const orderData = {
      client: { ...formData },
      articles: [...panier],
    };

    // -> Point d'ancrage : Vous pouvez envoyer orderData à votre API ici (ex: fetch('/api/commander', ...))
    setOrderDone(orderData);
    updateCart([]);
  };

  const isPanel = (nom: string) => /panneau|jonsol/i.test(nom);

  const totalArticles = panier.reduce((sum, it) => sum + it.quantite, 0);

  if (!isClient) return null; // Évite les erreurs d'hydratation SSR sur le localStorage

  return (
    <main>
      <section className="pt-27 pb-9">
        <div className="mx-auto px-[32px] max-[520px]:px-[20px] max-w-[760px]">
          <div className="section-title">Panier</div>
          <h1 className="font-serif text-(--ink) leading-[1.14] tracking-[-0.01em] font-medium text-[clamp(32px,4vw,46px)] max-w-[18ch]">
            Votre panier
          </h1>
          <p className="text-(--slate) text-[16.5px] mt-[16px] max-w-[56ch]">
            Vérifiez vos articles, ajustez les quantités puis validez votre
            commande. Un conseiller vous recontacte sous 48h ouvrées pour
            confirmer le prix, la disponibilité et la livraison.
          </p>
        </div>
      </section>

      <section className="py-[20px] pb-[110px]">
        <div className="w-full max-w-[1160px] mx-auto px-[32px] max-[520px]:px-[20px]">
          {/* 1. PANIER REMPLI */}
          {panier.length > 0 && !orderDone && (
            <div className="grid grid-cols-[1.35fr_1fr] max-[960px]:grid-cols-1 gap-[32px] items-start">
              <div>
                <div className="bg-(--white) border border-(--line) rounded-[20px] p-[6px_30px_8px] max-[560px]:p-[4px_18px_6px]">
                  <div className="flex items-center justify-between gap-[16px] py-[22px] pb-[18px] border-b border-(--line)">
                    <h2 className="font-serif font-medium text-[20px] text-(--ink)">
                      Vos articles
                    </h2>
                    <button
                      type="button"
                      onClick={handleClearCart}
                      className={`bg-transparent border-none cursor-pointer p-[4px_0] font-sans text-[13.5px] font-semibold underline underline-offset-[3px] transition-colors duration-150 ${
                        isArmed
                          ? "text-(--terracotta)"
                          : "text-(--slate) hover:text-(--terracotta)"
                      }`}
                    >
                      {isArmed ? "Confirmer le vidage ?" : "Vider le panier"}
                    </button>
                  </div>

                  <div>
                    {panier.map((it) => (
                      <article
                        key={it.id}
                        className="grid grid-cols-[64px_1fr_auto] max-[560px]:grid-cols-[56px_1fr] gap-[18px] max-[560px]:gap-[14px] items-center py-[22px] border-t border-(--line) first:border-t-0"
                      >
                        <div className="w-[64px] h-[64px] max-[560px]:w-[56px] max-[560px]:h-[56px] rounded-[16px] text-(--forest-soft) bg-gradient-to-br from-(--sage) to-(--cream) flex items-center justify-center">
                          {isPanel(it.nom) ? (
                            <svg
                              width="30px"
                              height="30px"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.4"
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
                          ) : (
                            <svg
                              className="w-[30px] h-[30px]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.4"
                            >
                              <rect x="5" y="3" width="14" height="18" rx="2" />
                              <path d="M13 7l-3 5h4l-3 5" />
                            </svg>
                          )}
                        </div>

                        <div>
                          <div className="text-[12px] font-semibold text-(--gold-deep) mb-[3px]">
                            {isPanel(it.nom)
                              ? "Panneaux solaires"
                              : "Onduleurs"}
                          </div>
                          <h3 className="font-serif font-medium text-[17.5px] text-(--ink) leading-[1.3]">
                            {it.nom}
                          </h3>
                        </div>

                        <div className="flex items-center gap-[14px] max-[560px]:col-span-full max-[560px]:justify-between">
                          <div className="inline-flex items-center gap-1 bg-(--cream) border border-(--line) rounded-full p-1">
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(it.id, -1)}
                              disabled={it.quantite <= 1}
                              aria-label={`Diminuer la quantité de ${it.nom}`}
                              className="w-[34px] h-[34px] rounded-full shrink-0 cursor-pointer flex items-center justify-center bg-(--white) border border-(--line) text-(--forest) hover:bg-(--forest) hover:border-(--forest) hover:text-(--cream) disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                              <svg
                                className="w-[14px] h-[14px]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                              >
                                <path d="M5 12h14" />
                              </svg>
                            </button>
                            <span className="min-w-[40px] text-center font-serif font-medium text-[19px]">
                              {it.quantite}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(it.id, 1)}
                              aria-label={`Augmenter la quantité de ${it.nom}`}
                              className="w-[34px] h-[34px] rounded-full shrink-0 cursor-pointer flex items-center justify-center bg-(--white) border border-(--line) text-(--forest) hover:bg-(--forest) hover:border-(--forest) hover:text-(--cream) transition-colors"
                            >
                              <svg
                                className="w-[14px] h-[14px]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                              >
                                <path d="M12 5v14M5 12h14" />
                              </svg>
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemove(it.id)}
                            aria-label={`Retirer ${it.nom} du panier`}
                            className="w-[40px] h-[40px] rounded-full shrink-0 cursor-pointer flex items-center justify-center bg-(--white) border border-(--line) text-(--slate) hover:text-(--terracotta) hover:border-(--terracotta) hover:bg-[#FDF3F1] transition-colors"
                          >
                            <svg
                              className="w-[17px] h-[17px]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
                            </svg>
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <Link
                  href="/equipements"
                  className="inline-flex items-center gap-[8px] my-[22px] mb-[18px] font-sans text-[14px] font-semibold text-(--forest) group"
                >
                  <svg
                    className="w-[15px] h-[15px] transition-transform duration-200 group-hover:-translate-x-[3px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M11 6l-6 6 6 6" />
                  </svg>
                  Continuer mes achats
                </Link>
              </div>

              {/* SECTION SUMMARY & FORM */}
              <aside className="sticky top-[96px] bg-(--white) border border-(--line) rounded-[20px] p-[30px] max-[560px]:p-[24px_20px] shadow-[0_30px_60px_-36px_rgba(20,72,112,0.35)]">
                <h2 className="font-serif font-medium text-[22px] text-(--ink) mb-[6px]">
                  Finaliser la commande
                </h2>
                <dl
                  className="my-[18px] mb-[6px] bg-(--cream) border border-(--line) rounded-[14px] p-[2px_20px]"
                  aria-live="polite"
                >
                  <div className="flex items-baseline justify-between gap-[12px] py-[14px]">
                    <dt className="text-[14px] text-(--slate)">
                      Articles au total
                    </dt>
                    <dd className="font-serif font-medium text-[26px] text-(--forest) leading-[1.1]">
                      {totalArticles}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-[12px] py-[14px] border-t border-(--line)">
                    <dt className="text-[14px] text-slate">Références</dt>
                    <dd className="font-serif font-medium text-[20px] text-(--ink) leading-[1.1]">
                      {panier.length}
                    </dd>
                  </div>
                </dl>
                <p className="text-[12.5px] text-(--slate) leading-[1.55] mb-[24px]">
                  Les prix vous sont communiqués sur devis, avec la
                  disponibilité et les frais de livraison.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-[16px]">
                    <label
                      htmlFor="o-nom"
                      className="block text-[13px] font-semibold text-(--ink) mb-[8px]"
                    >
                      Nom complet
                    </label>
                    <input
                      id="o-nom"
                      type="text"
                      placeholder="Votre nom"
                      autoComplete="name"
                      required
                      value={formData.nom}
                      onChange={(e) =>
                        setFormData({ ...formData, nom: e.target.value })
                      }
                      className="w-full p-[13px_16px] border border-(--line) rounded-[12px] font-sans text-[14.5px] bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) focus:shadow-[0_0_0_3px_rgba(20,72,112,0.10)] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-[14px] mb-[16px]">
                    <div>
                      <label
                        htmlFor="o-tel"
                        className="block text-[13px] font-semibold text-(--ink) mb-[8px]"
                      >
                        Téléphone
                      </label>
                      <input
                        id="o-tel"
                        type="tel"
                        placeholder="+216 ..."
                        autoComplete="tel"
                        required
                        value={formData.telephone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            telephone: e.target.value,
                          })
                        }
                        className="w-full p-[13px_16px] border border-(--line) rounded-[12px] font-sans text-[14.5px] bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) focus:shadow-[0_0_0_3px_rgba(20,72,112,0.10)] transition-all"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="o-email"
                        className="block text-[13px] font-semibold text-(--ink) mb-[8px]"
                      >
                        Email
                      </label>
                      <input
                        id="o-email"
                        type="email"
                        placeholder="vous@exemple.com"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full p-[13px_16px] border border-(--line) rounded-[12px] font-sans text-[14.5px] bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) focus:shadow-[0_0_0_3px_rgba(20,72,112,0.10)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="mb-[16px]">
                    <span className="block text-[13px] font-semibold text-(--ink) mb-[8px]">
                      Mode de réception
                    </span>
                    <div className="flex gap-[10px] flex-wrap">
                      <label
                        className={`flex items-center gap-[8px] border border-(--line) rounded-full p-[10px_16px] cursor-pointer text-[13.5px] transition-all ${formData.reception === "livraison" ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold" : "text-(--slate)"}`}
                      >
                        <input
                          type="radio"
                          name="reception"
                          value="livraison"
                          checked={formData.reception === "livraison"}
                          onChange={() =>
                            setFormData({ ...formData, reception: "livraison" })
                          }
                          className="accent-forest m-0"
                        />
                        <span>Livraison</span>
                      </label>
                      <label
                        className={`flex items-center gap-[8px] border border-(--line) rounded-full p-[10px_16px] cursor-pointer text-[13.5px] transition-all ${formData.reception === "retrait" ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold" : "text-(--slate)"}`}
                      >
                        <input
                          type="radio"
                          name="reception"
                          value="retrait"
                          checked={formData.reception === "retrait"}
                          onChange={() =>
                            setFormData({ ...formData, reception: "retrait" })
                          }
                          className="accent-forest m-0"
                        />
                        <span>Retrait en atelier</span>
                      </label>
                    </div>
                  </div>

                  {formData.reception === "livraison" && (
                    <div className="mb-[16px]">
                      <label
                        htmlFor="o-adresse"
                        className="block text-[13px] font-semibold text-(--ink) mb-[8px]"
                      >
                        Adresse de livraison
                      </label>
                      <input
                        id="o-adresse"
                        type="text"
                        placeholder="Adresse complète"
                        autoComplete="street-address"
                        required
                        value={formData.adresse}
                        onChange={(e) =>
                          setFormData({ ...formData, adresse: e.target.value })
                        }
                        className="w-full p-[13px_16px] border border-(--line) rounded-[12px] font-sans text-[14.5px] bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) focus:shadow-[0_0_0_3px_rgba(20,72,112,0.10)] transition-all"
                      />
                    </div>
                  )}

                  <div className="mb-[16px]">
                    <label
                      htmlFor="o-message"
                      className="block text-[13px] font-semibold text-(--ink) mb-[8px]"
                    >
                      Précisions (facultatif)
                    </label>
                    <textarea
                      id="o-message"
                      placeholder="Délai souhaité, question sur un produit..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full p-[13px_16px] border border-(--line) rounded-[12px] font-sans text-[14.5px] bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) focus:shadow-[0_0_0_3px_rgba(20,72,112,0.10)] transition-all resize-vertical min-h-[80px]"
                    />
                  </div>

                  <button type="submit" className="blue-button">
                    <span>Valider ma commande</span>
                    <svg
                      className="w-[15px] h-[15px] transition-transform duration-200 group-hover:translate-x-[3px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                  <div className="text-[12.5px] text-(--slate) mt-[14px] text-center">
                    Réponse sous 48h ouvrées, sans engagement.
                  </div>
                </form>
              </aside>
            </div>
          )}

          {/* 2. PANIER VIDE */}
          {panier.length === 0 && !orderDone && (
            <div className="max-w-[600px] mx-auto text-center bg-(--white) border border-(--line) rounded-[22px] p-[56px_40px] max-[560px]:p-[40px_22px] shadow-[0_30px_60px_-36px_rgba(20,72,112,0.3)]">
              <div className="w-[68px] h-[68px] rounded-full bg-(--sage) text-(--forest) flex items-center justify-center mx-auto mb-[24px]">
                <svg
                  className="w-[30px] h-[30px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6" />
                  <circle cx="9.5" cy="20" r="1.3" />
                  <circle cx="17" cy="20" r="1.3" />
                </svg>
              </div>
              <h2 className="font-serif font-medium text-[clamp(24px,3vw,30px)] text-(--ink) mb-[12px]">
                Votre panier est vide
              </h2>
              <p className="text-(--slate) text-[15.5px] max-w-[44ch] mx-auto mb-[28px]">
                Ajoutez des panneaux ou des onduleurs depuis la boutique, ils
                apparaîtront ici.
              </p>
              <Link
                href="/equipements"
                className="inline-flex items-center justify-center gap-[10px] bg-(--forest) text-(--cream) p-[16px_28px] rounded-full border-none font-bold text-[15px] font-sans cursor-pointer shadow-[0_14px_28px_-12px_rgba(20,72,112,0.5)] hover:bg-(--forest-deep) hover:-translate-y-[2px] transition-all group"
              >
                <span>Découvrir nos équipements</span>
                <svg
                  className="w-[15px] h-[15px] transition-transform duration-200 group-hover:translate-x-[3px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          )}

          {/* 3. COMMANDE ENVOYÉE (CONFIRMATION) */}
          {orderDone && (
            <div className="max-w-[600px] mx-auto text-center bg-(--white) border border-(--line) rounded-[22px] p-[56px_40px] max-[560px]:p-[40px_22px] shadow-[0_30px_60px_-36px_rgba(20,72,112,0.3)]">
              <div className="w-[68px] h-[68px] rounded-full bg-(--sage) text-(--forest) flex items-center justify-center mx-auto mb-[24px]">
                <svg
                  className="w-[30px] h-[30px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h2 className="font-serif font-medium text-[clamp(24px,3vw,30px)] text-(--ink) mb-[12px]">
                Commande envoyée
              </h2>
              <p className="text-(--slate) text-[15.5px] max-w-[44ch] mx-auto mb-[28px]">
                Merci {orderDone.client.nom}, votre commande a bien été reçue.
                Notre équipe vous recontacte sous 48h ouvrées pour confirmer le
                prix, la disponibilité et la{" "}
                {orderDone.client.reception === "livraison"
                  ? "livraison."
                  : "date de retrait en atelier."}
              </p>

              <ul className="list-none text-left bg-(--cream) border border-(--line) rounded-[14px] p-[6px_20px] mx-auto mb-[28px] max-w-[440px]">
                {orderDone.articles.map((a, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between gap-[16px] py-[12px] text-[14px] border-t border-(--line) first:border-t-0"
                  >
                    <span className="text-ink">{a.nom}</span>
                    <span className="font-serif font-medium text-(--forest) whitespace-nowrap">
                      × {a.quantite}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/equipements"
                className="inline-flex items-center justify-center gap-[10px] bg-(--forest) text-(--cream) p-[16px_28px] rounded-full border-none font-bold text-[15px] font-sans cursor-pointer shadow-[0_14px_28px_-12px_rgba(20,72,112,0.5)] hover:bg-(--forest-deep) hover:-translate-y-[2px] transition-all group"
              >
                <span>Retour à la boutique</span>
                <svg
                  className="w-[15px] h-[15px] transition-transform duration-200 group-hover:translate-x-[3px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
