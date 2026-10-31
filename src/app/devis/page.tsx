"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Arrow2Icon from "./../../components/icons/Arrow2Icon";
import MapsIcon from "./../../components/icons/MapsIcon";
import PhoneIcon from "./../../components/icons/PhoneIcon";
import BlueButton from "./../../components/ui/BlueButton";
import MailIcon from "./../../components/icons/MailIcon";
import FileInput from "./../../components/ui/FileInput";

type ClientType = "physique" | "morale";
type ProjectType = "autorisation" | "autoproduction" | "pompage";
type TensionType = "bt" | "mt";
type CourbeChargeType = "oui" | "non";
type mtTypeSuperficie =
  | "Toiture plate (terrasse)"
  | "Toiture inclinée (charpente)"
  | "Terrain au sol (parking, champ)"
  | "Ombrière de parking"
  | "Aucune surface disponible";
type TypeDeStructure = "un étage" | "deux étages" | "trois étages";

interface FormState {
  // Étape 1
  nom: string;
  tel: string;
  email: string;
  adresse: string;
  clientType: ClientType;
  matricule: string;
  projectType: ProjectType;

  // Étape 2 - Branche Autorisation
  aPuissance: string;
  aSurface: string;
  aSite: string;
  aTitreFile: File | null;
  aStegFile: File | null;
  aAgriFile: File | null;

  // Étape 2 - Branche Autoproduction
  tensionType: TensionType;
  pSite: string;
  pReference: string;

  // Sous-branche BT
  btCompteurFile: File | null;
  btDisjoncteurFile: File | null;

  // Sous-branche MT
  mtSecteur: string;
  mtSecteurSpecified: string;
  mtConso: string;
  mtFacturesFiles: FileList | null;
  courbeCharge: CourbeChargeType;
  mtCourbeFile: File | null;
  mtPuissance: string;
  mtHoraire: string;
  mtTypeSuperficie: mtTypeSuperficie;
  mtSuperficieToiture: string;
  mtSuperficieTerrain: string;

  // Étape 2 - Branche Pompage
  pPuissanceMoteur: string;
  pWaterLevel: string;
  pSiteImplimentation: string;
  pEspaceModules: string;
  pEspaceModulesSpecifier: string;
  pTypesCulture: string;
  pTypesCultureSpecifier: string;

  // Étape 3 - Branche Dimensions de l'installation
  d_pv_onduleur: string;
  d_onduleur_compteur: string;
  d_pv_regard: string;
  roofType: string;
  roofTypeSpecified: string;
  structureType: TypeDeStructure;
}

const Devis = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormState>({
    nom: "",
    tel: "",
    email: "",
    adresse: "",
    clientType: "physique",
    matricule: "",
    projectType: "autorisation",

    aPuissance: "",
    aSurface: "",
    aSite: "",
    aTitreFile: null,
    aStegFile: null,
    aAgriFile: null,

    tensionType: "bt",
    pSite: "",
    pReference: "",

    btCompteurFile: null,
    btDisjoncteurFile: null,

    mtSecteur: "",
    mtSecteurSpecified: "",
    mtConso: "",
    mtFacturesFiles: null,
    courbeCharge: "non",
    mtCourbeFile: null,
    mtPuissance: "",
    mtHoraire: "",
    mtTypeSuperficie: "Toiture plate (terrasse)",
    mtSuperficieToiture: "",
    mtSuperficieTerrain: "",

    pPuissanceMoteur: "",
    pWaterLevel: "",
    pSiteImplimentation: "",
    pEspaceModules: "",
    pEspaceModulesSpecifier: "",
    pTypesCulture: "",
    pTypesCultureSpecifier: "",

    d_pv_onduleur: "",
    d_onduleur_compteur: "",
    d_pv_regard: "",
    roofType: "",
    roofTypeSpecified: "",
    structureType: "un étage",
  });

  // Modificateurs de champs textes / select
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, name, value } = e.target;
    const key = (name || id.replace("s1-", "")) as keyof FormState;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Modificateurs de fichiers
  const handleFileChange = (
    key: keyof FormState,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      if (e.target.multiple) {
        setFormData((prev) => ({ ...prev, [key]: e.target.files }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [key]: e.target.files?.[0] || null,
        }));
      }
    }
  };

  // Validation et passage à l'étape suivante (Étape 1 -> 2 -> 3)
  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();

    // --- VALIDATION ÉTAPE 1 ---
    if (step === 1) {
      if (
        !formData.nom ||
        !formData.tel ||
        !formData.email ||
        !formData.adresse
      ) {
        alert("Veuillez remplir tous les champs obligatoires de l'étape 1.");
        return;
      }
      if (formData.clientType === "morale" && !formData.matricule) {
        alert("Veuillez renseigner la matricule fiscale.");
        return;
      }
      setStep(2);
    }

    // --- VALIDATION ÉTAPE 2 ---
    else if (step === 2) {
      if (formData.projectType === "autorisation") {
        if (
          !formData.aPuissance ||
          !formData.aSurface ||
          !formData.aSite ||
          !formData.aTitreFile ||
          !formData.aStegFile ||
          !formData.aAgriFile
        ) {
          alert("Veuillez remplir tous les champs de vos informations.");
          return;
        }
      } else if (
        formData.projectType === "autoproduction" &&
        formData.clientType === "physique"
      ) {
        if (
          !formData.tensionType ||
          !formData.pSite ||
          !formData.pReference ||
          !formData.btCompteurFile ||
          !formData.btDisjoncteurFile
        ) {
          alert("Veuillez remplir tous les détails du projet.");
          return;
        }
      } else if (
        formData.projectType === "autoproduction" &&
        formData.clientType === "morale"
      ) {
        if (
          formData.tensionType === "bt" &&
          (!formData.pSite ||
            !formData.pReference ||
            !formData.btCompteurFile ||
            !formData.btDisjoncteurFile)
        ) {
          alert("Veuillez remplir tous les détails pour la basse tension.");
          return;
        }
        if (
          formData.tensionType === "mt" &&
          (!formData.mtSecteur ||
            !formData.mtConso ||
            !formData.mtFacturesFiles ||
            !formData.courbeCharge ||
            // !formData.mtCourbeFile ||
            !formData.mtPuissance ||
            !formData.mtHoraire ||
            !formData.mtTypeSuperficie ||
            !formData.mtSuperficieToiture ||
            !formData.mtSuperficieTerrain)
        ) {
          alert("Veuillez remplir tous les détails pour la moyenne tension.");
          return;
        }
      } else if (formData.projectType === "pompage") {
        if (
          !formData.pPuissanceMoteur ||
          !formData.pWaterLevel ||
          !formData.pSiteImplimentation ||
          !formData.pEspaceModules ||
          !formData.pTypesCulture
        ) {
          alert("Veuillez remplir tous les champs pour le pompage.");
          return;
        }
      }
      setStep(3);
    }

    // Défilement doux vers le haut du formulaire après changement d'étape
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  //Retour à l'étape précedente
  const handlePrevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };
  // Soumission du formulaire
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !formData.d_pv_onduleur ||
      !formData.d_onduleur_compteur ||
      !formData.d_pv_regard ||
      !formData.roofType ||
      !formData.structureType
    ) {
      alert(
        "Veuillez remplir tous les détails pour les dimensions de l'installation.",
      );
      return;
    }
    console.log("Formulaire soumis :", formData);
    setSubmitted(true);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  // Réinitialisation du formulaire
  const handleReset = () => {
    setFormData({
      nom: "",
      tel: "",
      email: "",
      adresse: "",
      clientType: "physique",
      matricule: "",
      projectType: "autorisation",
      aPuissance: "",
      aSurface: "",
      aSite: "",
      aTitreFile: null,
      aStegFile: null,
      aAgriFile: null,
      tensionType: "bt",
      pSite: "",
      pReference: "",
      btCompteurFile: null,
      btDisjoncteurFile: null,
      mtSecteur: "",
      mtSecteurSpecified: "",
      mtConso: "",
      mtFacturesFiles: null,
      courbeCharge: "non",
      mtCourbeFile: null,
      mtPuissance: "",
      mtHoraire: "",
      mtTypeSuperficie: "Toiture plate (terrasse)",
      mtSuperficieToiture: "",
      mtSuperficieTerrain: "",
      pPuissanceMoteur: "",
      pWaterLevel: "",
      pSiteImplimentation: "",
      pEspaceModules: "",
      pEspaceModulesSpecifier: "",
      pTypesCulture: "",
      pTypesCultureSpecifier: "",
      d_pv_onduleur: "",
      d_onduleur_compteur: "",
      d_pv_regard: "",
      roofType: "",
      roofTypeSpecified: "",
      structureType: "un étage",
    });
    setStep(1);
    setSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-(--cream) text-(--ink)">
      {/* PAGE HERO */}
      <section className="pt-16 pb-9">
        <div className="max-w-180 mx-auto px-8">
          <div className="section-title">Etude gratuite & sans engagement</div>
          <h1 className="text-(--ink) font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight">
            Passez à l'Energie Solaire en Toute Sérénité
          </h1>
          <p className="text-(--slate) text-base sm:text-lg mt-4 max-w-[54ch]">
            Obtenez une analyse personnalisée et découvrez instantanément vos
            économies d'électricité grâce à nos solutions photovoltaïques sur
            mesure
          </p>
        </div>
      </section>

      {/* CONTACT MAIN SECTION */}
      <section className="pt-5 pb-28">
        <div className="max-w-290 mx-auto px-8 grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-12 lg:gap-16 items-start">
          {/* INFOS DE CONTACT (STICKY ON DESKTOP) */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <h2 className="text-(--ink) font-serif text-2xl font-medium mb-2.5">
              Nous contacter
            </h2>
            <p className="text-(--slate) text-sm sm:text-base max-w-[40ch]">
              Une question avant de remplir le formulaire ? Contactez-nous
              directement.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 border-t border-(--line) py-5">
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

              <div className="flex gap-4 border-t border-(--line) py-5">
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

              <div className="flex gap-4 border-y border-(--line) py-5">
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
          </div>

          {/* FORMULAIRE MULTI-ÉTAPES */}
          <div id="form-container">
            {!submitted ? (
              <>
                {/* STEP INDICATOR */}
                <div className="flex items-center gap-3 sm:gap-4 mb-7">
                  <div
                    className={`flex items-center gap-2.5 text-sm font-semibold transition-colors ${step === 1 ? "text-(--ink)" : "text-(--slate)"}`}
                  >
                    <b
                      className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-serif text-xs border transition-colors ${
                        step >= 1
                          ? "bg-(--forest) border-(--forest) text-(--cream)"
                          : "bg-(--sage) border-(--forest) text-(--forest)"
                      }`}
                    >
                      1
                    </b>
                    Vos informations
                  </div>

                  <div className="flex-1 max-w-11.5 h-px bg-(--line)"></div>

                  <div
                    className={`flex items-center gap-2.5 text-sm font-semibold transition-colors ${step === 2 ? "text-(--ink)" : "text-(--slate)"}`}
                  >
                    <b
                      className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-serif text-xs border transition-colors ${
                        step >= 2
                          ? "bg-(--forest) border-(--forest) text-(--cream)"
                          : "bg-(--sage) border-(--forest) text-(--forest)"
                      }`}
                    >
                      2
                    </b>
                    Détails du projet
                  </div>

                  <div className="flex-1 max-w-11.5 h-px bg-(--line)"></div>

                  <div
                    className={`flex items-center gap-2.5 text-sm font-semibold transition-colors ${step === 3 ? "text-(--ink)" : "text-(--slate)"}`}
                  >
                    <b
                      className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center font-serif text-xs border transition-colors ${
                        step === 3
                          ? "bg-(--forest) border-(--forest) text-(--cream)"
                          : "bg-(--sage) border-(--forest) text-(--forest)"
                      }`}
                    >
                      3
                    </b>
                    Dimensions de l'instalation
                  </div>
                </div>

                {/* FORM CARD */}
                <form
                  onSubmit={handleSubmit}
                  className="bg-(--white) border border-(--line) rounded-2xl p-6 sm:p-10 shadow-xl"
                >
                  {/* ÉTAPE 1 */}
                  {step === 1 && (
                    <div className="animate-step-in space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="s1-nom"
                            className="block text-xs font-semibold text-(--ink) mb-2"
                          >
                            Nom complet *
                          </label>
                          <input
                            id="s1-nom"
                            type="text"
                            required
                            placeholder="Votre nom"
                            value={formData.nom}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="s1-tel"
                            className="block text-xs font-semibold text-(--ink) mb-2"
                          >
                            Téléphone *
                          </label>
                          <input
                            id="s1-tel"
                            type="tel"
                            required
                            placeholder="+216 ..."
                            value={formData.tel}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="s1-email"
                          className="block text-xs font-semibold text-(--ink) mb-2"
                        >
                          Email *
                        </label>
                        <input
                          id="s1-email"
                          type="email"
                          required
                          placeholder="vous@exemple.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="s1-adresse"
                          className="block text-xs font-semibold text-(--ink) mb-2"
                        >
                          Adresse *
                        </label>
                        <input
                          id="s1-adresse"
                          type="text"
                          required
                          placeholder="Adresse du site concerné"
                          value={formData.adresse}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                        />
                      </div>

                      {/* Segmented Client Type */}
                      <div>
                        <label className="block text-xs font-semibold text-(--ink) mb-2">
                          Type de client *
                        </label>
                        <div className="flex gap-2.5 flex-wrap">
                          <label
                            className={`flex items-center gap-2 border rounded-full px-4 py-2.5 cursor-pointer text-xs transition-all ${
                              formData.clientType === "physique"
                                ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                : "border-(--line) text-(--slate)"
                            }`}
                          >
                            <input
                              type="radio"
                              name="clientType"
                              value="physique"
                              checked={formData.clientType === "physique"}
                              onChange={() =>
                                setFormData((p) => ({
                                  ...p,
                                  clientType: "physique",
                                }))
                              }
                              className="accent-forest"
                            />
                            <span>Personne physique</span>
                          </label>

                          <label
                            className={`flex items-center gap-2 border rounded-full px-4 py-2.5 cursor-pointer text-xs transition-all ${
                              formData.clientType === "morale"
                                ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                : "border-(--line) text-(--slate)"
                            }`}
                          >
                            <input
                              type="radio"
                              name="clientType"
                              value="morale"
                              checked={formData.clientType === "morale"}
                              onChange={() =>
                                setFormData((p) => ({
                                  ...p,
                                  clientType: "morale",
                                }))
                              }
                              className="accent-forest"
                            />
                            <span>Raison sociale</span>
                          </label>
                        </div>
                      </div>

                      {/* Matricule Fiscale (conditionnelle) */}
                      {formData.clientType === "morale" && (
                        <div className="animate-step-in pt-1">
                          <label
                            htmlFor="matricule"
                            className="block text-xs font-semibold text-(--ink) mb-2"
                          >
                            Matricule fiscale *
                          </label>
                          <input
                            id="matricule"
                            type="text"
                            required
                            placeholder="Ex : 1234567/A/M/000"
                            value={formData.matricule}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                          />
                        </div>
                      )}

                      {/* Segmented Project Type */}
                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-(--ink) mb-2">
                          Type de projet *
                        </label>
                        <div className="flex gap-2.5 flex-wrap">
                          <label
                            className={`flex items-center gap-2 border rounded-full px-4 py-2.5 cursor-pointer text-xs transition-all ${
                              formData.projectType === "autorisation"
                                ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                : "border-(--line) text-(--slate)"
                            }`}
                          >
                            <input
                              type="radio"
                              name="projectType"
                              value="autorisation"
                              checked={formData.projectType === "autorisation"}
                              onChange={() =>
                                setFormData((p) => ({
                                  ...p,
                                  projectType: "autorisation",
                                }))
                              }
                              className="accent-forest"
                            />
                            <span>Autorisation</span>
                          </label>

                          <label
                            className={`flex items-center gap-2 border rounded-full px-4 py-2.5 cursor-pointer text-xs transition-all ${
                              formData.projectType === "autoproduction"
                                ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                : "border-(--line) text-(--slate)"
                            }`}
                          >
                            <input
                              type="radio"
                              name="projectType"
                              value="autoproduction"
                              checked={
                                formData.projectType === "autoproduction"
                              }
                              onChange={() =>
                                setFormData((p) => ({
                                  ...p,
                                  projectType: "autoproduction",
                                }))
                              }
                              className="accent-forest"
                            />
                            <span>Autoproduction</span>
                          </label>

                          <label
                            className={`flex items-center gap-2 border rounded-full px-4 py-2.5 cursor-pointer text-xs transition-all ${
                              formData.projectType === "pompage"
                                ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                : "border-(--line) text-(--slate)"
                            }`}
                          >
                            <input
                              type="radio"
                              name="projectType"
                              value="pompage"
                              checked={formData.projectType === "pompage"}
                              onChange={() =>
                                setFormData((p) => ({
                                  ...p,
                                  projectType: "pompage",
                                }))
                              }
                              className="accent-forest"
                            />
                            <span>Pompage</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ÉTAPE 2 */}
                  {step === 2 && (
                    <div className="animate-step-in space-y-5">
                      {/* BRANCHE : AUTORISATION */}
                      {formData.projectType === "autorisation" && (
                        <div className="space-y-4">
                          <FileInput
                            required={true}
                            label="Titre *"
                            file={formData.aTitreFile}
                            onChange={(e) => handleFileChange("aTitreFile", e)}
                          />
                          <FileInput
                            required={true}
                            label="Étude préliminaire de raccordement à la STEG *"
                            file={formData.aStegFile}
                            onChange={(e) => handleFileChange("aStegFile", e)}
                          />
                          <FileInput
                            required={true}
                            label="Accord du ministère de l'Agriculture *"
                            file={formData.aAgriFile}
                            onChange={(e) => handleFileChange("aAgriFile", e)}
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="aPuissance"
                                className="block text-xs font-semibold text-(--ink) mb-2"
                              >
                                Puissance *
                              </label>
                              <input
                                id="aPuissance"
                                type="text"
                                required
                                placeholder="Ex : 250 kWc"
                                value={formData.aPuissance}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="aSurface"
                                className="block text-xs font-semibold text-(--ink) mb-2"
                              >
                                Surface *
                              </label>
                              <input
                                id="aSurface"
                                type="text"
                                required
                                placeholder="Ex : 3 000 m²"
                                value={formData.aSurface}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:(--bg-white) transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="aSite"
                              className="block text-xs font-semibold text-(--ink) mb-2"
                            >
                              Site d'implantation *
                            </label>
                            <input
                              id="aSite"
                              type="text"
                              required
                              placeholder="Localisation du site"
                              value={formData.aSite}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                            />
                          </div>
                        </div>
                      )}

                      {/* BRANCHE : AUTOPRODUCTION */}
                      {formData.projectType === "autoproduction" && (
                        <div className="space-y-4">
                          {formData.clientType === "morale" ? (
                            <div>
                              <label className="block text-xs font-semibold text-(--ink) mb-2">
                                Type de projet *
                              </label>
                              <div className="flex gap-2.5 flex-wrap">
                                <label
                                  className={`flex items-center gap-2 border rounded-full px-4 py-2.5 cursor-pointer text-xs transition-all ${
                                    formData.tensionType === "bt"
                                      ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                      : "border-(--line) text-(--slate)"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="tensionType"
                                    value="bt"
                                    checked={formData.tensionType === "bt"}
                                    onChange={() =>
                                      setFormData((p) => ({
                                        ...p,
                                        tensionType: "bt",
                                      }))
                                    }
                                    className="accent-forest"
                                  />
                                  <span>Basse tension</span>
                                </label>

                                <label
                                  className={`flex items-center gap-2 border rounded-full px-4 py-2.5 cursor-pointer text-xs transition-all ${
                                    formData.tensionType === "mt"
                                      ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                      : "border-(--line) text-(--slate)"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="tensionType"
                                    value="mt"
                                    checked={formData.tensionType === "mt"}
                                    onChange={() =>
                                      setFormData((p) => ({
                                        ...p,
                                        tensionType: "mt",
                                      }))
                                    }
                                    className="accent-forest"
                                  />
                                  <span>Moyenne tension</span>
                                </label>
                              </div>
                            </div>
                          ) : (
                            <span className="block text-xs font-semibold text-(--gold-deep) tracking-wider uppercase mb-3">
                              Basse tension
                            </span>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="pSite"
                                className="block text-xs font-semibold text-(--ink) mb-2"
                              >
                                Site d'implantation *
                              </label>
                              <input
                                id="pSite"
                                type="text"
                                required
                                placeholder="Localisation du site"
                                value={formData.pSite}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="pReference"
                                className="block text-xs font-semibold text-(--ink) mb-2"
                              >
                                Référence *
                              </label>
                              <input
                                id="pReference"
                                type="text"
                                required
                                placeholder="Référence"
                                value={formData.pReference}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                              />
                            </div>
                          </div>

                          {/* SOUS-BRANCHE : BASSE TENSION */}
                          {formData.tensionType === "bt" && (
                            <div className="animate-step-in mt-4 pt-4 border-t border-dashed border-(--line) space-y-4">
                              {formData.clientType === "morale" ? (
                                <span className="block text-xs font-semibold text-(--gold-deep) tracking-wider uppercase mb-3">
                                  Basse tension
                                </span>
                              ) : null}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FileInput
                                  label="Le compteur *"
                                  required={true}
                                  file={formData.btCompteurFile}
                                  onChange={(e) =>
                                    handleFileChange("btCompteurFile", e)
                                  }
                                />
                                <FileInput
                                  label="Le disjoncteur *"
                                  required={true}
                                  file={formData.btDisjoncteurFile}
                                  onChange={(e) =>
                                    handleFileChange("btDisjoncteurFile", e)
                                  }
                                />
                              </div>
                            </div>
                          )}

                          {/* SOUS-BRANCHE : MOYENNE TENSION */}
                          {formData.tensionType === "mt" && (
                            <div className="animate-step-in mt-4 pt-4 border-t border-dashed border-(--line) space-y-4">
                              <span className="block text-xs font-semibold text-(--gold-deep) tracking-wider uppercase mb-3">
                                Moyenne tension
                              </span>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label
                                    htmlFor="mtSecteur"
                                    className="block text-xs font-semibold text-(--ink) mb-2"
                                  >
                                    Secteur d'activité *
                                  </label>
                                  <select
                                    id="mtSecteur"
                                    required
                                    value={formData.mtSecteur}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                                  >
                                    <option value="">Choisir...</option>
                                    <option>Industrie</option>
                                    <option>Hôtel</option>
                                    <option>Autre à spécifier</option>
                                  </select>
                                  {formData.mtSecteur ===
                                    "Autre à spécifier" && (
                                    <input
                                      id="mtSecteurSpecified"
                                      type="text"
                                      required
                                      placeholder="Ex : agroalimentaire, textile..."
                                      value={formData.mtSecteurSpecified}
                                      onChange={handleChange}
                                      className="w-full mt-4 px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                                    />
                                  )}
                                </div>
                                <div>
                                  <label
                                    htmlFor="mtConso"
                                    className="block text-xs font-semibold text-(--ink) mb-2"
                                  >
                                    Consommation annuelle d'électricité *
                                  </label>
                                  <input
                                    id="mtConso"
                                    type="text"
                                    required
                                    placeholder="Ex : 1 200 kWh/an"
                                    value={formData.mtConso}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                                  />
                                </div>
                              </div>

                              <FileInput
                                label="Les 12 dernières factures *"
                                required={true}
                                multiple
                                fileList={formData.mtFacturesFiles}
                                onChange={(e) =>
                                  handleFileChange("mtFacturesFiles", e)
                                }
                              />

                              <div>
                                <label className="block text-xs font-semibold text-(--ink) mb-2">
                                  Courbe de charge disponible ? *
                                </label>
                                <div className="flex gap-2.5">
                                  <label
                                    className={`flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer text-xs transition-all ${
                                      formData.courbeCharge === "oui"
                                        ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                        : "border-(--line) text-(--slate)"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="courbeCharge"
                                      value="oui"
                                      checked={formData.courbeCharge === "oui"}
                                      onChange={() =>
                                        setFormData((p) => ({
                                          ...p,
                                          courbeCharge: "oui",
                                        }))
                                      }
                                      className="accent-forest"
                                    />
                                    <span>Oui</span>
                                  </label>

                                  <label
                                    className={`flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer text-xs transition-all ${
                                      formData.courbeCharge === "non"
                                        ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                        : "border-(--line) text-(--slate)"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="courbeCharge"
                                      value="non"
                                      checked={formData.courbeCharge === "non"}
                                      onChange={() =>
                                        setFormData((p) => ({
                                          ...p,
                                          courbeCharge: "non",
                                        }))
                                      }
                                      className="accent-forest"
                                    />
                                    <span>Non</span>
                                  </label>
                                </div>
                              </div>

                              {formData.courbeCharge === "oui" && (
                                <div className="animate-step-in">
                                  <FileInput
                                    label="La courbe de charge *"
                                    required
                                    file={formData.mtCourbeFile}
                                    onChange={(e) =>
                                      handleFileChange("mtCourbeFile", e)
                                    }
                                  />
                                </div>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label
                                    htmlFor="mtPuissance"
                                    className="block text-xs font-semibold text-(--ink) mb-2"
                                  >
                                    Puissance souscrite *
                                  </label>
                                  <input
                                    id="mtPuissance"
                                    type="text"
                                    required
                                    placeholder="Ex : 500 kVA"
                                    value={formData.mtPuissance}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="mtHoraire"
                                    className="block text-xs font-semibold text-(--ink) mb-2"
                                  >
                                    Horaire de fonctionnement *
                                  </label>
                                  <select
                                    id="mtHoraire"
                                    required
                                    value={formData.mtHoraire}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                                  >
                                    <option value="">Choisir...</option>
                                    <option>De jour (6h - 18h)</option>
                                    <option>De nuit (18h - 6h)</option>
                                    <option>En continu (24h/24h)</option>
                                    <option>
                                      Horaires variables selon la saison
                                    </option>
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-(--ink) mb-2">
                                  Type de surfaces disponibles pour les PV *
                                </label>
                                <div className="flex flex-wrap gap-2.5">
                                  <label
                                    className={`flex items-center gap-2 w-58 border rounded-full px-4 py-2 cursor-pointer text-xs transition-all ${
                                      formData.mtTypeSuperficie ===
                                      "Toiture plate (terrasse)"
                                        ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                        : "border-(--line) text-(--slate)"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="mtTypeSuperficie"
                                      value="Toiture plate (terrasse)"
                                      checked={
                                        formData.mtTypeSuperficie ===
                                        "Toiture plate (terrasse)"
                                      }
                                      onChange={() =>
                                        setFormData((p) => ({
                                          ...p,
                                          mtTypeSuperficie:
                                            "Toiture plate (terrasse)",
                                        }))
                                      }
                                      className="accent-forest"
                                    />
                                    <span>Toiture plate (terrasse)</span>
                                  </label>
                                  <label
                                    className={`flex items-center w-58 gap-2 border rounded-full px-4 py-2 cursor-pointer text-xs transition-all ${
                                      formData.mtTypeSuperficie ===
                                      "Toiture inclinée (charpente)"
                                        ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                        : "border-(--line) text-(--slate)"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="mtTypeSuperficie"
                                      value="Toiture inclinée (charpente)"
                                      checked={
                                        formData.mtTypeSuperficie ===
                                        "Toiture inclinée (charpente)"
                                      }
                                      onChange={() =>
                                        setFormData((p) => ({
                                          ...p,
                                          mtTypeSuperficie:
                                            "Toiture inclinée (charpente)",
                                        }))
                                      }
                                      className="accent-forest"
                                    />
                                    <span>Toiture inclinée (charpente)</span>
                                  </label>
                                  <label
                                    className={`flex items-center w-58 gap-2 border rounded-full px-4 py-2 cursor-pointer text-xs transition-all ${
                                      formData.mtTypeSuperficie ===
                                      "Terrain au sol (parking, champ)"
                                        ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                        : "border-(--line) text-(--slate)"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="mtTypeSuperficie"
                                      value="Terrain au sol (parking, champ)"
                                      checked={
                                        formData.mtTypeSuperficie ===
                                        "Terrain au sol (parking, champ)"
                                      }
                                      onChange={() =>
                                        setFormData((p) => ({
                                          ...p,
                                          mtTypeSuperficie:
                                            "Terrain au sol (parking, champ)",
                                        }))
                                      }
                                      className="accent-forest"
                                    />
                                    <span>Terrain au sol (parking, champ)</span>
                                  </label>
                                  <label
                                    className={`flex items-center w-58 gap-2 border rounded-full px-4 py-2 cursor-pointer text-xs transition-all ${
                                      formData.mtTypeSuperficie ===
                                      "Ombrière de parking"
                                        ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                        : "border-(--line) text-(--slate)"
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name="mtTypeSuperficie"
                                      value="Ombrière de parking"
                                      checked={
                                        formData.mtTypeSuperficie ===
                                        "Ombrière de parking"
                                      }
                                      onChange={() =>
                                        setFormData((p) => ({
                                          ...p,
                                          mtTypeSuperficie:
                                            "Ombrière de parking",
                                        }))
                                      }
                                      className="accent-forest"
                                    />
                                    <span>Ombrière de parking</span>
                                  </label>
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-(--ink) mb-2">
                                  Superficie approximative disponible *
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label
                                      htmlFor="mtSuperficieToiture"
                                      className="block text-xs font-semibold text-(--ink) mb-2"
                                    >
                                      Surface de toiture *
                                    </label>
                                    <input
                                      id="mtSuperficieToiture"
                                      type="text"
                                      required
                                      placeholder="Votre surface de toiture (m²)"
                                      value={formData.mtSuperficieToiture}
                                      onChange={handleChange}
                                      className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="mtSuperficieTerrain"
                                      className="block text-xs font-semibold text-(--ink) mb-2"
                                    >
                                      Surface de terrain *
                                    </label>
                                    <input
                                      id="mtSuperficieTerrain"
                                      type="text"
                                      required
                                      placeholder="Votre surface de terrain (m²)"
                                      value={formData.mtSuperficieTerrain}
                                      onChange={handleChange}
                                      className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {/* BRANCHE : POMPAGE */}
                      {formData.projectType === "pompage" && (
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="pPuissanceMoteur"
                              className="block text-xs font-semibold text-(--ink) mb-2"
                            >
                              Puissance de la moto pompe *
                            </label>
                            <input
                              id="pPuissanceMoteur"
                              type="text"
                              required
                              placeholder="En cheveau (HP)"
                              value={formData.pPuissanceMoteur}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="pWaterLevel"
                              className="block text-xs font-semibold text-(--ink) mb-2"
                            >
                              Niveau de l'eau HMT *
                            </label>
                            <input
                              id="pWaterLevel"
                              type="text"
                              required
                              placeholder="Ex: 2m"
                              value={formData.pWaterLevel}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="pSiteImplimentation"
                              className="block text-xs font-semibold text-(--ink) mb-2"
                            >
                              Site d'implimentation *
                            </label>
                            <input
                              id="pSiteImplimentation"
                              type="text"
                              required
                              placeholder="Localisation ..."
                              value={formData.pSiteImplimentation}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="pEspaceModules"
                              className="block text-xs font-semibold text-(--ink) mb-2"
                            >
                              Espace pour la fixatation du modules *
                            </label>
                            <select
                              id="pEspaceModules"
                              required
                              value={formData.pEspaceModules}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                            >
                              <option value="">Choisir ...</option>
                              <option>Au sol</option>
                              <option>Sur toiture</option>
                              <option>Autre à spécifier</option>
                            </select>
                            {formData.pEspaceModules ===
                              "Autre à spécifier" && (
                              <input
                                id="pEspaceModulesSpecifier"
                                type="text"
                                required
                                placeholder="Spécifier l'espace pour fixation des modules"
                                value={formData.pEspaceModulesSpecifier}
                                onChange={handleChange}
                                className="w-full mt-4 px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                              />
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="pTypesCulture"
                              className="block text-xs font-semibold text-(--ink) mb-2"
                            >
                              Type de culture *
                            </label>
                            <select
                              id="pTypesCulture"
                              required
                              value={formData.pTypesCulture}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                            >
                              <option value="">
                                Sélectionnez le type de culture
                              </option>
                              <option>Blé dur</option>
                              <option>Blé tendre</option>
                              <option>Orge</option>
                              <option>Avoine</option>
                              <option>Triticale</option>
                              <option>Oliviers</option>
                              <option>Amandiers</option>
                              <option>
                                Agrumes : oranges, citrons, mandarines
                              </option>
                              <option>Pommiers, poiriers et pêches</option>
                              <option>Abricotiers et pruniers</option>
                              <option>Figuiers</option>
                              <option>Pistachiers</option>
                              <option>Vignes</option>
                              <option>Tomates</option>
                              <option>Pommes de terre</option>
                              <option>Oignons</option>
                              <option>Piments et poivrons</option>
                              <option>Courgettes</option>
                              <option>Concombres</option>
                              <option>Carottes</option>
                              <option>Navets</option>
                              <option>Laitues et salades</option>
                              <option>Choux</option>
                              <option>Aubergines</option>
                              <option>Artichauts</option>
                              <option>Melons et pastèques</option>
                              <option>Luzerne</option>
                              <option>Bersim (trèfle d'Alexandrie)</option>
                              <option>Sulla</option>
                              <option>Ray-grass</option>
                              <option>Maïs fourrager</option>
                              <option>Sorgho fourrager</option>
                              <option>Avoine fourragère</option>
                              <option>Fèves</option>
                              <option>Pois chiches</option>
                              <option>Lentilles</option>
                              <option>Poins secs</option>
                              <option>Haricots secs</option>
                              <option>Dattes</option>
                              <option>Fourrages irrigués</option>
                              <option>
                                Grenadiers et autres arbres fruitiers adaptés
                                aux oasis
                              </option>
                              <option>Fraises</option>
                              <option>Raisin</option>
                              <option>Tournesol</option>
                              <option>Autre à spécifier</option>
                            </select>
                            {formData.pTypesCulture === "Autre à spécifier" && (
                              <input
                                id="pTypesCultureSpecifier"
                                type="text"
                                required
                                placeholder="Spécifier l'espace pour fixation des modules"
                                value={formData.pTypesCultureSpecifier}
                                onChange={handleChange}
                                className="w-full mt-4 px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ÉTAPE 3 */}
                  {step == 3 && (
                    <div className="animate-step-in space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="d_pv_onduleur"
                            className="block text-xs font-semibold text-(--ink) mb-2"
                          >
                            Distance entre le champ PV (Structure) et l'onduleur
                            *
                          </label>
                          <input
                            id="d_pv_onduleur"
                            type="text"
                            required
                            placeholder="Ex: 5m"
                            value={formData.d_pv_onduleur}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="d_onduleur_compteur"
                            className="block text-xs font-semibold text-(--ink) mb-2"
                          >
                            Distance entre l'onduleur et le compteur STEG *
                          </label>
                          <input
                            id="d_onduleur_compteur"
                            type="text"
                            required
                            placeholder="Ex : 10m "
                            value={formData.d_onduleur_compteur}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="d_pv_regard"
                          className="block text-xs font-semibold text-(--ink) mb-2"
                        >
                          Distance entre le champ PV (Structure) et le regard de
                          terre *
                        </label>
                        <input
                          id="d_pv_regard"
                          type="text"
                          required
                          placeholder="Ex: 10 m"
                          value={formData.d_pv_regard}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="roofType"
                          className="block text-xs font-semibold text-(--ink) mb-2"
                        >
                          Type de toiture *
                        </label>
                        <select
                          id="roofType"
                          required
                          value={formData.roofType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                        >
                          <option value="">Choisir...</option>
                          <option>Béton</option>
                          <option>Auvent</option>
                          <option>Charpente</option>
                          <option>Autre à spécifier</option>
                        </select>
                        {formData.roofType === "Autre à spécifier" && (
                          <input
                            id="roofTypeSpecified"
                            type="text"
                            required
                            placeholder="Spécifier votre type de toiture"
                            value={formData.roofTypeSpecified}
                            onChange={handleChange}
                            className="w-full mt-4 px-4 py-3 border border-(--line) rounded-lg text-sm bg-(--cream) text-(--ink) focus:outline-none focus:border-(--forest) focus:bg-(--white) transition-colors"
                          />
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="structureType"
                          className="block text-xs font-semibold text-(--ink) mb-2"
                        >
                          Type de Structure *
                        </label>
                        <div className="flex gap-2.5">
                          <label
                            className={`flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer text-xs transition-all ${
                              formData.structureType === "un étage"
                                ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                : "border-(--line) text-(--slate)"
                            }`}
                          >
                            <input
                              type="radio"
                              name="structureType"
                              value="un étage"
                              checked={formData.structureType === "un étage"}
                              onChange={() =>
                                setFormData((p) => ({
                                  ...p,
                                  structureType: "un étage",
                                }))
                              }
                              className="accent-forest"
                            />
                            <span>Un étage</span>
                          </label>

                          <label
                            className={`flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer text-xs transition-all ${
                              formData.structureType === "deux étages"
                                ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                : "border-(--line) text-(--slate)"
                            }`}
                          >
                            <input
                              type="radio"
                              name="structureType"
                              value="deux étages"
                              checked={formData.structureType === "deux étages"}
                              onChange={() =>
                                setFormData((p) => ({
                                  ...p,
                                  structureType: "deux étages",
                                }))
                              }
                              className="accent-forest"
                            />
                            <span>Deux étages</span>
                          </label>
                          {(formData.projectType === "pompage" ||
                            formData.tensionType === "mt") && (
                            <label
                              className={`flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer text-xs transition-all ${
                                formData.structureType === "trois étages"
                                  ? "border-(--forest) bg-(--sage) text-(--ink) font-semibold"
                                  : "border-(--line) text-(--slate)"
                              }`}
                            >
                              <input
                                type="radio"
                                name="structureType"
                                value="trois étages"
                                checked={
                                  formData.structureType === "trois étages"
                                }
                                onChange={() =>
                                  setFormData((p) => ({
                                    ...p,
                                    structureType: "trois étages",
                                  }))
                                }
                                className="accent-forest"
                              />
                              <span>Trois étages</span>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Boutons d'Actions  */}
                  <div className="pt-4 flex gap-3.5">
                    {/* Bouton de retour (affiché uniquement à partir de l'étape 2) */}
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="cursor-pointer flex-1 px-6 py-3.5 rounded-full font-semibold text-sm text-ink border border-line hover:border-forest hover:bg-forest/5 transition-colors"
                      >
                        Retour
                      </button>
                    )}

                    {/* Bouton suivant (affiché aux étapes 1 et 2) */}
                    {step < 3 ? (
                      <BlueButton type="button" onClick={handleNextStep}>
                        Continuer
                      </BlueButton>
                    ) : (
                      /* Bouton final de soumission à l'étape 3 */
                      <BlueButton type="submit" onClick={handleSubmit}>
                        Envoyer ma demande
                      </BlueButton>
                    )}
                  </div>
                </form>
              </>
            ) : (
              /* ECRAN DE SUCCÈS */
              <div className="bg-(--white) border border-(--line) rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col items-center text-center animate-step-in">
                <div className="w-15 h-15 rounded-full bg-(--sage) text-forest flex items-center justify-center mb-5">
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-medium mb-2.5">
                  Demande envoyée
                </h3>
                <p className="text-(--slate) text-sm sm:text-base max-w-[38ch] leading-relaxed mb-7">
                  Merci, votre demande a bien été reçue. Notre équipe l'étudie
                  et vous recontacte sous 48h ouvrées.
                </p>
                <BlueButton type="button" onClick={handleReset}>
                  Envoyer une nouvelle demande
                </BlueButton>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Devis;
