"use client";

import { FormEvent, useState } from "react";
import MailIcon from "../icons/MailIcon";
import MapsIcon from "../icons/MapsIcon";
import PhoneIcon from "../icons/PhoneIcon";
import CheckIcon from "../icons/CheckIcon";
import Arrow2Icon from "../icons/Arrow2Icon";
import BlueButton from "../ui/BlueButton";

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-4.5">
      <label className="mb-2 block text-[13px] font-semibold text-[#17242E]">
        {label}
      </label>
      {children}
    </div>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = () => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmitted(() => true);

    // window.setTimeout(() => {
    //   document
    //     .scrollIntoView({ behavior: "smooth", block: "center" });
    // }, 0);
  };

  const resetForm = () => {
    setSubmitted(() => false);
  };

  return (
    <section id="contact" className="bg-(--cream) py-20 min-[961px]:py-[120px]">
      <div className="mx-auto grid w-full max-w-290 grid-cols-1 gap-12 px-5 min-[521px]:px-8 min-[961px]:grid-cols-[0.9fr_1.1fr] min-[961px]:gap-[70px]">
        {/* ==================== CONTACT INFO ==================== */}
        <div className="contact-info">
          <div className="section-title">Contactez-nous</div>

          <div className="flex gap-4 border-t border-(--line) py-5">
            <MailIcon />
            <div>
              <b className="mb-0.5 block text-sm font-semibold text-[#17242E]">
                Email
              </b>
              <span className="text-[14.5px] text-(--slate)">
                info@sun-sol.tn
              </span>
            </div>
          </div>

          <div className="flex gap-4 border-t border-(--line) py-5">
            <PhoneIcon />
            <div>
              <b className="mb-0.5 block text-sm font-semibold text-[#17242E]">
                Téléphone
              </b>
              <span className="text-[14.5px] text-(--slate)">
                +216 71 781 089
              </span>
            </div>
          </div>

          <div className="flex gap-4 border-y border-(--line) py-5">
            <MapsIcon />
            <div>
              <b className="mb-0.5 block text-sm font-semibold text-[#17242E]">
                Rue De Riadh, Mutuelleville, Tunisie
              </b>
              <span className="text-[14.5px] text-(--slate)">
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
          {/* ==================== DEVIS ==================== */}

          <form
            className="rounded-[20px] border border-[#E3DFD3] bg-white p-6 shadow-[0_30px_60px_-32px_rgba(30,36,32,0.25)] min-[521px]:p-10"
            onSubmit={handleSubmit()}
            noValidate={false}
          >
            {!submitted ? (
              <>
                <div className="grid grid-cols-1 gap-4 min-[521px]:grid-cols-2">
                  <Field label="Nom complet *">
                    <input
                      name="nom"
                      type="text"
                      placeholder="Votre nom"
                      required
                      className="input-class"
                    />
                  </Field>

                  <Field label="Téléphone *">
                    <input
                      name="telephone"
                      type="tel"
                      placeholder="+216 ..."
                      required
                      className="input-class"
                    />
                  </Field>
                </div>

                <Field label="Email *">
                  <input
                    name="email"
                    type="email"
                    placeholder="vous@exemple.com"
                    required
                    className="input-class"
                  />
                </Field>
                <Field label="Adresse *">
                  <input
                    name="adresse"
                    type="text"
                    placeholder="Saisir votre adresse"
                    required
                    className="input-class"
                  />
                </Field>

                <Field label="Votre message *">
                  <textarea
                    name="message"
                    placeholder="Votre message"
                    className="input-class min-h-24 resize-y"
                  />
                </Field>

                <BlueButton type="submit">Envoyer</BlueButton>

                <p className="mt-3.5 text-center text-[12.5px] text-(--slate)">
                  Réponse sous 48h ouvrées, sans engagement.
                </p>
              </>
            ) : (
              <SuccessMessage
                id="success-message"
                title="Message envoyé"
                message="Merci, votre message a bien été reçue. Notre équipe vous recontacte sous 48h ouvrées."
                onReset={() => resetForm()}
              />
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

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
      className="flex flex-col items-center px-2.5 pb-2.5 pt-6.5 text-center"
    >
      <div className="mb-5.5 flex h-15 w-15 items-center justify-center rounded-full bg-(--sage) text-[#144870]">
        <CheckIcon />
      </div>

      <h3 className="mb-2.5 font-serif text-[22px] font-medium leading-[1.14] text-(--ink)">
        {title}
      </h3>

      <p className="mb-7 max-w-[36ch] text-[15px] leading-[1.6] text-(--slate)">
        {message}
      </p>

      <BlueButton type="button" onClick={onReset}>
        Envoyer un nouveau message
      </BlueButton>
    </div>
  );
}

export default Contact;
