"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Produit } from "@/data/produits";

export interface PanierItem {
  produit: Produit;
  quantite: number;
}

interface PanierContextType {
  items: PanierItem[];
  ajouter: (produit: Produit) => void;
  retirer: (slug: string) => void;
  vider: () => void;
  total: number;
  fraisPort: number;
  totalFinal: number;
  count: number;
}

const PanierContext = createContext<PanierContextType | null>(null);

export function PanierProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<PanierItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("panier_v2");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("panier_v2", JSON.stringify(items));
  }, [items]);

  const ajouter = (produit: Produit) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.produit.slug === produit.slug);
      if (existing) {
        return prev.map((i) =>
          i.produit.slug === produit.slug
            ? { ...i, quantite: i.quantite + 1 }
            : i
        );
      }
      return [...prev, { produit, quantite: 1 }];
    });
  };

  const retirer = (slug: string) => {
    setItems((prev) => prev.filter((i) => i.produit.slug !== slug));
  };

  const vider = () => setItems([]);

  const total = items.reduce(
    (acc, i) => acc + i.produit.prix * i.quantite,
    0
  );
  const fraisPort = total >= 50 ? 0 : 5;
  const totalFinal = total + fraisPort;
  const count = items.reduce((acc, i) => acc + i.quantite, 0);

  return (
    <PanierContext.Provider
      value={{ items, ajouter, retirer, vider, total, fraisPort, totalFinal, count }}
    >
      {children}
    </PanierContext.Provider>
  );
}

export function usePanier() {
  const ctx = useContext(PanierContext);
  if (!ctx) throw new Error("usePanier doit être utilisé dans PanierProvider");
  return ctx;
}
