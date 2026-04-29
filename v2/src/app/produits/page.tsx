import ProduitCard from "@/components/ProduitCard";
import { produits, categories } from "@/data/produits";
import type { Categorie } from "@/data/produits";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nos produits",
  description:
    "Tous les produits artisanaux de La Cabane de Hjort : porte-clefs, plateaux, dessous de verre et marque-pages vikings.",
};

interface Props {
  searchParams: { categorie?: string };
}

export default function ProduitsPage({ searchParams }: Props) {
  const categorieActive = searchParams.categorie as Categorie | undefined;
  const produitsFiltres = categorieActive
    ? produits.filter((p) => p.categorie === categorieActive)
    : produits;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-viking text-3xl text-bois font-bold mb-8 text-center">
        Nos produits
      </h1>

      {/* Filtres catégories */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        <Link
          href="/produits"
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            !categorieActive
              ? "bg-bois text-white"
              : "bg-white text-bois border border-bois hover:bg-bois hover:text-white"
          }`}
        >
          Tous
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/produits?categorie=${cat.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              categorieActive === cat.slug
                ? "bg-bois text-white"
                : "bg-white text-bois border border-bois hover:bg-bois hover:text-white"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {produitsFiltres.map((p) => (
          <ProduitCard key={p.slug} produit={p} />
        ))}
      </div>

      {produitsFiltres.length === 0 && (
        <p className="text-center text-gray-500 py-16">
          Aucun produit dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  );
}
