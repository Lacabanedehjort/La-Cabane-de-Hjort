"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduit, produits } from "@/data/produits";
import { usePanier } from "@/context/PanierContext";
import Link from "next/link";

export function generateStaticParams() {
  return produits.map((p) => ({ slug: p.slug }));
}

export default function FicheProduit({ params }: { params: { slug: string } }) {
  const produit = getProduit(params.slug);
  if (!produit) notFound();

  const { ajouter } = usePanier();
  const enStock = produit.stock > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/produits" className="text-bois hover:underline text-sm mb-6 inline-block">
        ← Retour aux produits
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative h-80 md:h-[420px] rounded-xl overflow-hidden bg-amber-100">
          <Image
            src={produit.image}
            alt={produit.nom}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Infos */}
        <div className="flex flex-col gap-4">
          <span className="text-sm text-bois-light uppercase tracking-wider font-semibold">
            {produit.categorie.replace(/-/g, " ")}
          </span>
          <h1 className="font-viking text-3xl text-bois font-bold">{produit.nom}</h1>
          <p className="text-gray-600 leading-relaxed">{produit.description}</p>

          <p className="text-3xl font-bold text-bois">{produit.prix} €</p>

          <p className="text-sm text-gray-500">
            {enStock ? (
              <span className="text-green-600 font-semibold">✓ En stock</span>
            ) : (
              <span className="text-red-500 font-semibold">✗ Hors stock</span>
            )}
          </p>

          {enStock ? (
            <button
              onClick={() => ajouter(produit)}
              className="bg-bois text-white px-8 py-3 rounded-lg hover:bg-bois-dark transition-colors font-semibold text-lg"
            >
              Ajouter au panier
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-300 text-gray-500 px-8 py-3 rounded-lg cursor-not-allowed font-semibold text-lg"
            >
              Indisponible
            </button>
          )}

          <div className="bg-amber-50 border border-bois/20 rounded-lg p-4 text-sm text-gray-600 mt-2">
            <p>🚚 Livraison offerte dès 50 € d&apos;achat</p>
            <p>📦 Frais de port : 5 € en dessous de 50 €</p>
            <p>🪵 Gravure laser sur bois naturel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
