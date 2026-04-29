import Link from "next/link";
import ProduitCard from "@/components/ProduitCard";
import { produits } from "@/data/produits";

export default function HomePage() {
  const nouveautes = produits.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="bg-bois text-white py-24 px-4 text-center">
        <h1 className="font-viking text-4xl md:text-5xl font-bold mb-4">
          La Cabane de Hjort
        </h1>
        <p className="text-lg text-bois-light max-w-xl mx-auto mb-8">
          Créations artisanales en bois gravé — univers viking et médiéval,
          faites à la main avec passion.
        </p>
        <Link
          href="/produits"
          className="bg-white text-bois font-bold px-8 py-3 rounded-lg hover:bg-amber-100 transition-colors"
        >
          Découvrir la boutique
        </Link>
      </section>

      {/* Catégories */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-viking text-2xl text-bois font-bold mb-8 text-center">
          Nos créations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { slug: "porte-clefs", label: "Porte-clefs", emoji: "🗝️" },
            { slug: "plateaux", label: "Plateaux", emoji: "🪵" },
            { slug: "dessous-de-verre", label: "Dessous de verre", emoji: "🍺" },
            { slug: "marque-pages", label: "Marque-pages", emoji: "📖" },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/produits?categorie=${cat.slug}`}
              className="bg-white rounded-xl p-6 text-center shadow hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl mb-2">{cat.emoji}</div>
              <p className="font-viking text-bois font-semibold">{cat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Nouveautés */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="font-viking text-2xl text-bois font-bold mb-8 text-center">
          Nouveautés
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nouveautes.map((p) => (
            <ProduitCard key={p.slug} produit={p} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/produits"
            className="bg-bois text-white px-8 py-3 rounded-lg hover:bg-bois-dark transition-colors font-semibold"
          >
            Voir tous les produits
          </Link>
        </div>
      </section>

      {/* À propos */}
      <section id="apropos" className="bg-bois-dark text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-viking text-2xl font-bold mb-4">À propos</h2>
          <p className="text-bois-light leading-relaxed">
            Chaque pièce est unique et fabriquée artisanalement par gravure laser
            sur bois naturel. L&apos;univers viking et médiéval est ma passion depuis
            toujours — je la partage avec vous à travers ces créations soignées,
            idéales pour offrir ou pour soi.
          </p>
        </div>
      </section>
    </>
  );
}
