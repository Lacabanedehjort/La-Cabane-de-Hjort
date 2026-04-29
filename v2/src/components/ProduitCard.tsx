"use client";

import Image from "next/image";
import Link from "next/link";
import { usePanier } from "@/context/PanierContext";
import type { Produit } from "@/data/produits";

export default function ProduitCard({ produit }: { produit: Produit }) {
  const { ajouter } = usePanier();
  const enStock = produit.stock > 0;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition-shadow flex flex-col overflow-hidden">
      <Link href={`/produits/${produit.slug}`}>
        <div className="relative h-48 w-full bg-amber-50">
          <Image
            src={produit.image}
            alt={produit.nom}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <Link href={`/produits/${produit.slug}`}>
          <h3 className="font-viking text-bois font-semibold hover:text-bois-dark transition-colors">
            {produit.nom}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm flex-1 line-clamp-2">{produit.description}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-bois font-bold text-lg">{produit.prix} €</span>

          {enStock ? (
            <button
              onClick={() => ajouter(produit)}
              className="bg-bois text-white px-3 py-1.5 rounded text-sm hover:bg-bois-dark transition-colors"
            >
              Ajouter au panier
            </button>
          ) : (
            <span className="text-gray-400 text-sm italic">Indisponible</span>
          )}
        </div>
      </div>
    </div>
  );
}
