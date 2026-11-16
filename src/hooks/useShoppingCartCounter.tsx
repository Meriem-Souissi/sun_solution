"use client";

import { useState, useEffect } from "react";

const KEY = "panierSolaire";

export const useShoopingCartCount = () => {
  const [shoopingCartCount, setShoopingCartCount] = useState<number>(0);

  useEffect(() => {
    // Fonction pour calculer le nombre total d'articles
    const calculateCount = () => {
      try {
        const storedCart = localStorage.getItem(KEY);
        if (!storedCart) return 0;
        const parsed = JSON.parse(storedCart);
        if (!Array.isArray(parsed)) return 0;

        return parsed.reduce((sum, item) => {
          return sum + (parseInt(item.quantite, 10) || 0);
        }, 0);
      } catch (e) {
        return 0;
      }
    };

    // Initialisation au montage
    setShoopingCartCount(calculateCount());

    // Écouteur pour les changements dans le localStorage (autres onglets ou actions de la page)
    const handleStorageChange = () => {
      setShoopingCartCount(calculateCount());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("pageshow", handleStorageChange);

    // Fonction globale optionnelle si d'autres composants déclenchent un rafraîchissement manuel
    (window as any).refreshHeaderCart = () => {
      setShoopingCartCount(calculateCount());
    };

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("pageshow", handleStorageChange);
      delete (window as any).refreshHeaderCart;
    };
  }, []);

  return shoopingCartCount;
};
