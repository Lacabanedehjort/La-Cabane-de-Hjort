"use client";

import Image from "next/image";
import Link from "next/link";
import { usePanier } from "@/context/PanierContext";

export default function PanierPage() {
  const { items, retirer, total, fraisPort, totalFinal, count } = usePanier();

  if (count === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-6">🛒</p>
        <h1 className="font-viking text-2xl text-bois font-bold mb-4">Votre panier est vide</h1>
        <Link
          href="/produits"
          className="bg-bois text-white px-8 py-3 rounded-lg hover:bg-bois-dark transition-colors font-semibold"
        >
          Voir les produits
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-viking text-3xl text-bois font-bold mb-8">Mon panier</h1>

      <div className="flex flex-col gap-4 mb-8">
        {items.map(({ produit, quantite }) => (
          <div
            key={produit.slug}
            className="bg-white rounded-xl shadow p-4 flex gap-4 items-center"
          >
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-amber-50 flex-shrink-0">
              <Image
                src={produit.image}
                alt={produit.nom}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            <div className="flex-1">
              <p className="font-viking text-bois font-semibold">{produit.nom}</p>
              <p className="text-sm text-gray-500">
                {produit.prix} € × {quantite} = <strong>{produit.prix * quantite} €</strong>
              </p>
            </div>

            <button
              onClick={() => retirer(produit.slug)}
              className="text-red-400 hover:text-red-600 transition-colors text-sm"
            >
              Retirer
            </button>
          </div>
        ))}
      </div>

      {/* Récapitulatif */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Sous-total</span>
          <span>{total} €</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Frais de port</span>
          <span>{fraisPort === 0 ? "Gratuit 🎉" : `${fraisPort} €`}</span>
        </div>
        {fraisPort > 0 && (
          <p className="text-xs text-bois-light mb-4">
            Plus que {(50 - total).toFixed(2)} € pour bénéficier de la livraison gratuite !
          </p>
        )}
        <div className="flex justify-between font-bold text-lg text-bois border-t pt-4">
          <span>Total</span>
          <span>{totalFinal} €</span>
        </div>

        <Link
          href="/commande"
          className="block mt-6 bg-bois text-white text-center px-8 py-3 rounded-lg hover:bg-bois-dark transition-colors font-semibold text-lg"
        >
          Commander →
        </Link>
      </div>
    </div>
  );
}
