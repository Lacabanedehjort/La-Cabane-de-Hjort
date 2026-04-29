"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePanier } from "@/context/PanierContext";
import emailjs from "@emailjs/browser";

export default function CommandePage() {
  const { items, total, fraisPort, totalFinal, vider, count } = usePanier();
  const router = useRouter();
  const [envoi, setEnvoi] = useState<"idle" | "loading" | "ok" | "error">("idle");

  if (count === 0) {
    router.replace("/panier");
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnvoi("loading");

    const form = e.currentTarget;
    const nom = (form.elements.namedItem("nom") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const adresse = (form.elements.namedItem("adresse") as HTMLInputElement).value;

    const details = items
      .map((i) => `${i.produit.nom} x${i.quantite} — ${i.produit.prix * i.quantite} €`)
      .join("\n");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_COMMANDE!,
        { nom, email, adresse, commande: details, total: `${totalFinal} €`, frais_port: `${fraisPort} €` },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      vider();
      setEnvoi("ok");
    } catch {
      setEnvoi("error");
    }
  }

  if (envoi === "ok") {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-4">✅</p>
        <h1 className="font-viking text-2xl text-bois font-bold mb-4">Commande envoyée !</h1>
        <p className="text-gray-600 mb-8">
          Merci ! Ta commande a bien été reçue. Tu recevras une confirmation par email.
        </p>
        <a
          href="/"
          className="bg-bois text-white px-8 py-3 rounded-lg hover:bg-bois-dark transition-colors font-semibold"
        >
          Retour à l&apos;accueil
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-viking text-3xl text-bois font-bold mb-8">Finaliser la commande</h1>

      {/* Récap */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="font-semibold mb-4 text-bois">Récapitulatif</h2>
        <ul className="text-sm text-gray-600 space-y-1 mb-4">
          {items.map(({ produit, quantite }) => (
            <li key={produit.slug} className="flex justify-between">
              <span>{produit.nom} × {quantite}</span>
              <span>{produit.prix * quantite} €</span>
            </li>
          ))}
        </ul>
        <div className="border-t pt-3 flex justify-between text-sm text-gray-600">
          <span>Frais de port</span>
          <span>{fraisPort === 0 ? "Gratuit" : `${fraisPort} €`}</span>
        </div>
        <div className="flex justify-between font-bold text-bois text-lg mt-2">
          <span>Total</span>
          <span>{totalFinal} €</span>
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        <h2 className="font-semibold text-bois">Vos coordonnées</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
          <input
            name="nom"
            type="text"
            required
            placeholder="Jean Dupont"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bois"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="jean@exemple.fr"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bois"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse de livraison</label>
          <textarea
            name="adresse"
            required
            rows={3}
            placeholder="12 rue des Vikings, 75001 Paris"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bois resize-none"
          />
        </div>

        {envoi === "error" && (
          <p className="text-red-500 text-sm">
            Erreur lors de l&apos;envoi. Vérifie ta connexion et réessaie.
          </p>
        )}

        <button
          type="submit"
          disabled={envoi === "loading"}
          className="bg-bois text-white px-8 py-3 rounded-lg hover:bg-bois-dark transition-colors font-semibold text-lg disabled:opacity-60"
        >
          {envoi === "loading" ? "Envoi en cours..." : "Valider la commande →"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Le paiement se fait à la réception — virement ou espèces selon accord.
        </p>
      </form>
    </div>
  );
}
