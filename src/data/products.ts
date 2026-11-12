import { Product } from "./../types/product";

export const PRODUCTS: Product[] = [
  {
    id: "jonsol-550",
    title: "JONSOL 550 W (Demi-cellules)",
    category: "Panneaux solaires",
    description:
      "Le panneau solaire JONSOL JSM144-550 (série 182, technologie demi-cellules monocristallines) est un module photovoltaïque de haute puissance conçu pour les installations résidentielles et commerciales.",
    features: [
      "Technologie Half-Cut Monocristallin",
      "Rendement élevé même par faible ensoleillement",
    ],
    image: "/images/equipements/jonsol.jpg",
    techSheetUrl: "/fiches-techniques/fiche technique Jonsol.pdf",
    badge: { label: "Top Vente", variant: "gold" },
    calculator: "/calculateurs/panneaux",
    models: [],
  },
  {
    id: "sungrow-sg320hx",
    title: "Onduleur SUNGROW Multi-MPPT",
    category: "Onduleurs réseau",
    description:
      "L'onduleur chaîne multi-MPPT Sungrow SG320HX-20 est conçu pour les grands parcs photovoltaïques et les systèmes solaires industriels en 1500 Vdc.",
    features: [
      "Multiples traqueurs MPPT indépendants",
      "Protection IP66 ultra-résistante",
    ],
    image: "/images/equipements/sungrow.jpg",
    techSheetUrl: "/fiches-techniques/Fiche Onduleur.pdf",
    badge: { label: "Pro & Industriel", variant: "navy" },
    calculator: "/calculateurs/onduleur",
    models: [{ name: "Sungrow SG320HX-20", power: 320 }],
  },
  {
    id: "huawei-sun2000-2-4-6",
    title: "Onduleur Huawei SUN2000 (2-3-4-4.6)",
    category: "Onduleurs triphasés",
    description:
      "La série Huawei SUN2000-2/3/4/5/6KTL-L1 est une gamme d'onduleurs solaires triphasés de raccordement au réseau pour les installations résidentielles et tertiaires.",
    features: [
      "Sécurité active avec protection AFCI",
      "Rendement élevé et gestion intelligente",
    ],
    image: "/images/equipements/onduleur HWAWEI 2000-2KTL.L1.jpg",
    techSheetUrl: "/fiches-techniques/SUN2000-6KTL-L1.pdf",
    badge: { label: "Résidentiel & Tertiaire", variant: "light" },
    calculator: "/calculateurs/onduleur",
    models: [
      { name: "Huawei SUN2000 (2 kW)", power: 2 },
      { name: "Huawei SUN2000 (3 kW)", power: 3 },
      { name: "Huawei SUN2000 (4 kW)", power: 4 },
      { name: "Huawei SUN2000 (4.6 kW)", power: 4.6 },
    ],
  },
  {
    id: "huawei-sun2000-6-10",
    title: "Onduleur Huawei SUN2000 (6-8-10)",
    category: "Onduleurs triphasés",
    description:
      "La série Huawei SUN2000-3/4/5/6/8/10KTL-M1 est une gamme d'onduleurs solaires conçue pour les installations photovoltaïques résidentielles ou petites installations tertiaires.",
    features: ["Rendement maximal élevé", "Protections contre les surtensions"],
    image: "/images/equipements/onduleur HWAWEI 2000-2KTL.L1.jpg",
    techSheetUrl: "/fiches-techniques/SUN2000-6KTL-M1.pdf",
    badge: { label: "Résidentiel & Tertiaire", variant: "light" },
    calculator: "/calculateurs/onduleur",
    models: [
      { name: "Huawei SUN2000 (6 kW)", power: 6 },
      { name: "Huawei SUN2000 (8 kW)", power: 8 },
      { name: "Huawei SUN2000 (10 kW)", power: 10 },
    ],
  },
  {
    id: "huawei-sun2000-12-25",
    title: "Onduleur Huawei SUN2000 (12~25)",
    category: "Onduleurs triphasés",
    description:
      "La série Huawei SUN2000-12~25KTL-M5 est une gamme d'onduleurs solaires conçue pour les installations solaires résidentielles de grande puissance, commerciales et industrielles.",
    features: [
      "Supervision intelligente à distance",
      "Technologie MPPT pour optimiser la production",
    ],
    image: "/images/equipements/onduleur HWAWEI 2000-12ktl-m5.jpg",
    techSheetUrl: "/fiches-techniques/sun2000-12-15-17-20-25ktl-m5.pdf",
    badge: { label: "Résidentiel & Tertiaire", variant: "light" },
    calculator: "/calculateurs/onduleur",
    models: [
      { name: "Huawei SUN2000 (12 kW)", power: 12 },
      { name: "Huawei SUN2000 (15 kW)", power: 15 },
      { name: "Huawei SUN2000 (17 kW)", power: 17 },
      { name: "Huawei SUN2000 (20 kW)", power: 20 },
      { name: "Huawei SUN2000 (25 kW)", power: 25 },
    ],
  },
  {
    id: "huawei-sun2000-30-40",
    title: "Onduleur Huawei SUN2000 (30-40)",
    category: "Onduleurs triphasés",
    description:
      "La gamme Huawei SUN2000 (30–40 kW) regroupe des onduleurs triphasés adaptés aux installations photovoltaïques de moyenne et grande puissance, notamment dans les secteurs commercial et industriel.",
    features: ["Sécurité renforcée", "Conception robuste"],
    image: "/images/equipements/onduleur HWAWEI 2000-30ktl-m3.jpg",
    techSheetUrl: "/fiches-techniques/SUN2000-30-40-50KTL.pdf",
    badge: { label: "Résidentiel & Tertiaire", variant: "light" },
    calculator: "/calculateurs/onduleur",
    models: [
      { name: "Huawei SUN2000 (30 kW)", power: 30 },
      { name: "Huawei SUN2000 (40 kW)", power: 40 },
      { name: "Huawei SUN2000 (50 kW)", power: 50 },
    ],
  },
  {
    id: "sungrow-emu-200a",
    title: "EMU 200A (Energy Management Unit)",
    category: "Gestion & Pilotage",
    description:
      "Sungrow EMU200A est une unité de gestion de l'énergie (Energy Management Unit) conçue par Sungrow pour les centrales photovoltaïques commerciales et de grande envergure.",
    features: [
      "Régulation et contrôle avancés du réseau",
      "Optimisé pour centrales commerciales et grands parcs",
    ],
    image: "/images/equipements/EMU200A.jpg",
    techSheetUrl: "/fiches-techniques/EMU200A.pdf",
    badge: { label: "Gestion d'Énergie", variant: "light" },
    models: [],
  },
  {
    id: "com-100e",
    title: "COM 100E (Boîtier de communication)",
    category: "Boîtiers Intelligents",
    description:
      "Le COM100E de Sungrow est un boîtier de communication intelligent conçu pour la supervision, la collecte de données et la gestion à distance des centrales solaires photovoltaïques.",
    features: [
      "Supervision et suivi en temps réel",
      "Collecte de données et diagnostic à distance",
    ],
    image: "/images/equipements/com.jpg",
    techSheetUrl: "/fiches-techniques/Datasheet COM100E.pdf",
    badge: { label: "Communication", variant: "navy" },
    models: [],
  },
  {
    id: "huawei-luna2000",
    title: "Huawei LUNA2000",
    category: "Stockage & Batteries",
    description:
      "La batterie Huawei LUNA2000 est un système de stockage d'énergie modulaire au lithium-fer-phosphate (LiFePO4) conçu pour les installations photovoltaïques résidentielles et commerciales.",
    features: [
      "Technologie LiFePO4 sécurisée",
      "Architecture modulaire évolutive",
    ],
    image: "/images/equipements/batterie Huawei LUNA2000.jpg",
    techSheetUrl: "/fiches-techniques/luna fiche technique.pdf",
    badge: { label: "Stockage Énergétique", variant: "light" },
    models: [],
  },
  {
    id: "gd100-pv-2-50",
    title: "INVT GD100-PV (2~50 HP)",
    category: "Variateurs solaires",
    description:
      "La gamme INVT GD100-PV propose des variateurs dédiés au pompage solaire, optimisant l'énergie photovoltaïque et garantissant un fonctionnnement fiable des motopompes.",
    features: [
      "Technologie MPPT: optimisation de l'énergie solaire jusqu'à 99%.",
      "Démarrage automatique: fonctionnement adapté à l'ensoleillement disponible.",
    ],
    image: "/images/equipements/invt GD100-PV.jpg",
    techSheetUrl: "/fiches-techniques/VARIATEUR VF DATASHEET.pdf",
    badge: { label: "Top vente", variant: "gold" },
    calculator: "/calculateurs/variateur",
    models: [],
  },
];
