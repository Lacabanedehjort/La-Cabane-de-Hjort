"use client";

import Link from "next/link";
import Image from "next/image";
import { usePanier } from "@/context/PanierContext";

export default function Navbar() {
  const { count } = usePanier();

  return (
    <header className="bg-bois text-white">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/Design1.svg" alt="Logo" width={40} height={58} />
          <span className="font-viking text-xl font-bold">La Cabane de Hjort</span>
        </Link>

        <ul className="flex flex-wrap gap-4 text-sm items-center">
          <li><Link href="/" className="hover:text-bois-light transition-colors">Accueil</Link></li>
          <li><Link href="/produits" className="hover:text-bois-light transition-colors">Nos produits</Link></li>
          <li><Link href="/avis" className="hover:text-bois-light transition-colors">Avis</Link></li>
          <li><Link href="/contact" className="hover:text-bois-light transition-colors">Contact</Link></li>
          <li>
            <Link
              href="/panier"
              className="relative flex items-center gap-1 bg-bois-dark px-3 py-1.5 rounded hover:bg-bois-light transition-colors"
            >
              🛒
              {count > 0 && (
                <span className="bg-white text-bois text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
