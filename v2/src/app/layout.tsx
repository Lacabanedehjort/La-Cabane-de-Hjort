import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PanierProvider } from "@/context/PanierContext";

export const metadata: Metadata = {
  title: {
    default: "La Cabane de Hjort — Créations artisanales viking",
    template: "%s | La Cabane de Hjort",
  },
  description:
    "Boutique artisanale de créations en bois gravé à thème viking et médiéval : porte-clefs, plateaux, dessous de verre, marque-pages.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen bg-amber-50 text-gray-800">
        <PanierProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PanierProvider>
      </body>
    </html>
  );
}
