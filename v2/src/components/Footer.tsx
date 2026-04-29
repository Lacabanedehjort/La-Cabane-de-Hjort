import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bois-dark text-white text-sm mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap justify-between gap-4">
        <p>© {new Date().getFullYear()} La Cabane de Hjort — Tous droits réservés</p>
        <div className="flex gap-4">
          <Link href="/mentions-legales" className="hover:text-bois-light transition-colors">
            Mentions légales
          </Link>
          <Link href="/cgv" className="hover:text-bois-light transition-colors">
            CGV
          </Link>
          <Link href="/contact" className="hover:text-bois-light transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
