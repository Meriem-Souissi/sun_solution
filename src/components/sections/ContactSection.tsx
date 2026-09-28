"use client";

import { FormEvent, useState } from "react";
import MailIcon from "../icons/MailIcon";
import MapsIcon from "../icons/MapsIcon";
import PhoneIcon from "../icons/PhoneIcon";
import CheckIcon from "../icons/CheckIcon";
import Arrow2Icon from "../icons/Arrow2Icon";
import { ArrowIcon } from "../icons/ArrowIcon";

type FormType = "devis" | "etude";
type ClientType = "physique" | "morale";

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-[18px]">
      <label className="mb-2 block text-[13px] font-semibold text-[#17242E]">
        {label}
      </label>
      {children}
    </div>
  );
};

export default function Contact() {
  const [activeForm, setActiveForm] = useState<FormType>("devis");
  const [clientType, setClientType] = useState<ClientType>("physique");
  const [submitted, setSubmitted] = useState<Record<FormType, boolean>>({
    devis: false,
    etude: false,
  });

  const handleSubmit =
    (formType: FormType) => (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.currentTarget;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      setSubmitted((current) => ({
        ...current,
        [formType]: true,
      }));

      window.setTimeout(() => {
        document
          .getElementById(`success-${formType}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
    };

  const resetForm = (formType: FormType) => {
    setSubmitted((current) => ({
      ...current,
      [formType]: false,
    }));

    if (formType === "etude") {
      setClientType("physique");
    }
  };

  return (
    <section id="contact" className="bg-[#FAF7F1] py-20 min-[961px]:py-[120px]">
      <div className="mx-auto grid w-full max-w-290 grid-cols-1 gap-12 px-5 min-[521px]:px-8 min-[961px]:grid-cols-[0.9fr_1.1fr] min-[961px]:gap-[70px]">
        {/* ==================== CONTACT INFO ==================== */}
        <div className="contact-info">
          <div className="section-title">Contact</div>

          <h2 className="max-w-[11ch] font-serif text-[clamp(28px,3vw,38px)] font-medium leading-[1.14] tracking-[-0.01em] text-[#17242E]">
            Parlons de votre projet
          </h2>

          <p className="mb-9 mt-5 max-w-[42ch] text-base leading-[1.6] text-[#59636B]">
            Décrivez-nous votre toiture ou votre facture actuelle: nous revenons
            vers vous avec une première estimation sous 48h.
          </p>

          <div className="flex gap-4 border-t border-[#E3DFD3] py-5">
            <MailIcon />
            <div>
              <b className="mb-0.5 block text-sm font-semibold text-[#17242E]">
                Email
              </b>
              <span className="text-[14.5px] text-[#59636B]">
                info@sun-sol.tn
              </span>
            </div>
          </div>

          <div className="flex gap-4 border-t border-[#E3DFD3] py-5">
            <PhoneIcon />
            <div>
              <b className="mb-0.5 block text-sm font-semibold text-[#17242E]">
                Téléphone
              </b>
              <span className="text-[14.5px] text-[#59636B]">
                +216 71 781 089
              </span>
            </div>
          </div>

          <div className="flex gap-4 border-y border-[#E3DFD3] py-5">
            <MapsIcon />
            <div>
              <b className="mb-0.5 block text-sm font-semibold text-[#17242E]">
                Rue De Riadh, Mutuelleville, Tunisie
              </b>
              <span className="text-[14.5px] text-[#59636B]">
                <a
                  className="inline-flex items-center gap-1.5 font-semibold text-(--gold) hover:text-[#F2B15A] transition-colors"
                  href="https://www.google.com/maps/place/CCDH+Training/@36.8348083,10.165009,17z/data=!3m1!4b1!4m6!3m5!1s0x12fd336182427403:0xf1a29571490b9d22!8m2!3d36.834804!4d10.1675839!16s%2Fg%2F11g8_6x8y4?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir sur Google Maps
                  <Arrow2Icon />
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* ==================== CONTACT FORMS ==================== */}
        <div className="w-full">
          <div
            className="mb-5 inline-flex gap-0.5 rounded-full border border-[#E3DFD3] bg-white p-[5px]"
            role="tablist"
            aria-label="Type de demande"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeForm === "devis"}
              onClick={() => setActiveForm("devis")}
              className={`rounded-full px-4.5 py-2.5 text-[13.5px] font-semibold transition-colors cursor-pointer ${
                activeForm === "devis"
                  ? "bg-[#144870] text-[#FAF7F1]"
                  : "text-[#59636B] hover:text-[#17242E]"
              }`}
            >
              Demande de devis
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeForm === "etude"}
              onClick={() => setActiveForm("etude")}
              className={`rounded-full px-4.5 py-2.5 text-[13.5px] font-semibold transition-colors cursor-pointer ${
                activeForm === "etude"
                  ? "bg-[#144870] text-[#FAF7F1]"
                  : "text-[#59636B] hover:text-[#17242E]"
              }`}
            >
              Étude technique gratuite
            </button>
          </div>

          {/* ==================== DEVIS ==================== */}
          {activeForm === "devis" && (
            <form
              className="rounded-[20px] border border-[#E3DFD3] bg-white p-6 shadow-[0_30px_60px_-32px_rgba(30,36,32,0.25)] min-[521px]:p-10"
              onSubmit={handleSubmit("devis")}
              noValidate={false}
            >
              {!submitted.devis ? (
                <>
                  <div className="grid grid-cols-1 gap-4 min-[521px]:grid-cols-2">
                    <Field label="Nom complet">
                      <input
                        name="nom"
                        type="text"
                        placeholder="Votre nom"
                        required
                        className="input-class"
                      />
                    </Field>

                    <Field label="Téléphone">
                      <input
                        name="telephone"
                        type="tel"
                        placeholder="+216 ..."
                        required
                        className="input-class"
                      />
                    </Field>
                  </div>

                  <Field label="Email">
                    <input
                      name="email"
                      type="email"
                      placeholder="vous@exemple.com"
                      required
                      className="input-class"
                    />
                  </Field>

                  <div className="grid grid-cols-1 gap-4 min-[521px]:grid-cols-2">
                    <Field label="Type de projet">
                      <select name="typeProjet" className="input-class">
                        <option>Choisir votre projet</option>
                        <option>Installation résidentielle</option>
                        <option>Installation commerciale</option>
                        <option>Site isolé</option>
                        <option>Pompage</option>
                      </select>
                    </Field>

                    <Field label="Puissance à installer">
                      <input
                        name="power"
                        type="power"
                        placeholder="Saisir la puissance à installer"
                        required
                        className="input-class"
                      />
                    </Field>
                  </div>

                  <Field label="Votre facture mensuelle actuelle ou toute précision utile">
                    <textarea
                      name="message"
                      placeholder="Ex : facture moyenne de 250 DT/mois, toiture plate de 120m²"
                      className="input-class min-h-24 resize-y"
                    />
                  </Field>

                  <SubmitButton>Recevoir mon devis</SubmitButton>

                  <p className="mt-3.5 text-center text-[12.5px] text-[#59636B]">
                    Réponse sous 48h ouvrées, sans engagement.
                  </p>
                </>
              ) : (
                <SuccessMessage
                  id="success-devis"
                  title="Demande envoyée"
                  message="Merci, votre demande de devis a bien été reçue. Notre équipe vous recontacte sous 48h ouvrées."
                  onReset={() => resetForm("devis")}
                />
              )}
            </form>
          )}

          {/* ==================== ÉTUDE TECHNIQUE ==================== */}
          {activeForm === "etude" && (
            <form
              className="rounded-[20px] border border-[#E3DFD3] bg-white p-6 shadow-[0_30px_60px_-32px_rgba(30,36,32,0.25)] min-[521px]:p-10"
              onSubmit={handleSubmit("etude")}
            >
              {!submitted.etude ? (
                <>
                  <div className="grid grid-cols-1 gap-4 min-[521px]:grid-cols-2">
                    <Field label="Nom complet">
                      <input
                        name="nom"
                        type="text"
                        placeholder="Votre nom"
                        required
                        className="input-class"
                      />
                    </Field>

                    <Field label="Téléphone">
                      <input
                        name="telephone"
                        type="tel"
                        placeholder="+216 ..."
                        required
                        className="input-class"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-4 min-[521px]:grid-cols-2">
                    <Field label="Email">
                      <input
                        name="email"
                        type="email"
                        placeholder="vous@exemple.com"
                        required
                        className="input-class"
                      />
                    </Field>

                    <Field label="Référence STEG">
                      <input
                        name="steg"
                        type="text"
                        placeholder="Référence de votre STEG"
                        className="input-class"
                      />
                    </Field>
                  </div>

                  <Field label="Type de client">
                    <div className="flex flex-wrap gap-2.5">
                      <label
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] transition-colors ${
                          clientType === "physique"
                            ? "border-[#144870] bg-[#EAF0F4] font-semibold text-[#17242E]"
                            : "border-[#E3DFD3] text-[#59636B] hover:border-[#144870]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="clientType"
                          value="physique"
                          checked={clientType === "physique"}
                          onChange={() => setClientType("physique")}
                          className="m-0 accent-[#144870]"
                        />
                        <span>Personne physique</span>
                      </label>

                      <label
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[13.5px] transition-colors ${
                          clientType === "morale"
                            ? "border-[#144870] bg-[#EAF0F4] font-semibold text-[#17242E]"
                            : "border-[#E3DFD3] text-[#59636B] hover:border-[#144870]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="clientType"
                          value="morale"
                          checked={clientType === "morale"}
                          onChange={() => setClientType("morale")}
                          className="m-0 accent-[#144870]"
                        />
                        <span>Raison sociale</span>
                      </label>
                    </div>
                  </Field>

                  {clientType === "morale" && (
                    <Field label="Matricule fiscale">
                      <input
                        name="matricule"
                        type="text"
                        placeholder="Ex : 1234567/A/M/000"
                        required
                        className="input-class"
                      />
                    </Field>
                  )}

                  <Field label="Adresse">
                    <input
                      name="adresse"
                      type="text"
                      placeholder="Adresse du site à étudier"
                      className="input-class"
                    />
                  </Field>

                  <Field label="Type de projet">
                    <select name="typeProjet" className="input-class">
                      <option>Choisir votre projet</option>
                      <option>Installation résidentielle</option>
                      <option>Installation commerciale</option>
                      <option>Site isolé</option>
                      <option>Pompage</option>
                    </select>
                  </Field>

                  <Field label="Votre facture mensuelle actuelle ou toute précision utile">
                    <textarea
                      name="message"
                      placeholder="Ex : facture moyenne de 250 DT/mois, toiture plate de 120m²"
                      className="input-class min-h-24 resize-y"
                    />
                  </Field>

                  <SubmitButton>Demander mon étude gratuite</SubmitButton>

                  <p className="mt-3.5 text-center text-[12.5px] text-[#59636B]">
                    Réponse sous 48h ouvrées, sans engagement.
                  </p>
                </>
              ) : (
                <SuccessMessage
                  id="success-etude"
                  title="Demande envoyée"
                  message="Merci, votre demande d'étude technique a bien été reçue. Notre équipe vous recontacte sous 48h ouvrées."
                  onReset={() => resetForm("etude")}
                />
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="w-full rounded-full border-0 bg-[#144870] px-5 py-[15px] text-[15px] font-bold text-[#FAF7F1] shadow-[0_12px_26px_-12px_rgba(20,72,112,0.45)] transition-all duration-200 hover:-translate-y-px hover:bg-[#0E3555] hover:shadow-[0_14px_30px_-10px_rgba(20,72,112,0.55)] focus-visible:outline-2 focus-visible:outline-[#C97A0F] focus-visible:outline-offset-3"
    >
      {children}
    </button>
  );
}

function SuccessMessage({
  id,
  title,
  message,
  onReset,
}: {
  id: string;
  title: string;
  message: string;
  onReset: () => void;
}) {
  return (
    <div
      id={id}
      className="flex flex-col items-center px-2.5 pb-2.5 pt-[26px] text-center"
    >
      <div className="mb-[22px] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#EAF0F4] text-[#144870]">
        <CheckIcon />
      </div>

      <h3 className="mb-2.5 font-serif text-[22px] font-medium leading-[1.14] text-[#17242E]">
        {title}
      </h3>

      <p className="mb-7 max-w-[36ch] text-[15px] leading-[1.6] text-[#59636B]">
        {message}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="group inline-flex items-center gap-2 rounded-full border border-[#E3DFD3] bg-transparent px-6 py-[13px] text-sm font-semibold text-[#17242E] transition-colors hover:border-[#144870] hover:bg-[#144870]/5 focus-visible:outline-2 focus-visible:outline-[#C97A0F] focus-visible:outline-offset-3"
      >
        Envoyer une nouvelle demande
        <ArrowIcon />
      </button>
    </div>
  );
}
