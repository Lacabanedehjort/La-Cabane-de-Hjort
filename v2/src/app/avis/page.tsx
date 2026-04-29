"use client";

import { useEffect, useState } from "react";

interface Avis {
  nom: string;
  note: number;
  commentaire: string;
  date: string;
}

export default function AvisPage() {
  const [avis, setAvis] = useState<Avis[]>([]);
  const [envoi, setEnvoi] = useState<"idle" | "ok">("idle");

  useEffect(() => {
    const saved = localStorage.getItem("avis_v2");
    if (saved) setAvis(JSON.parse(saved));
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const nouvelAvis: Avis = {
      nom: (form.elements.namedItem("nom") as HTMLInputElement).value,
      note: parseInt((form.elements.namedItem("note") as HTMLSelectElement).value),
      commentaire: (form.elements.namedItem("commentaire") as HTMLTextAreaElement).value,
      date: new Date().toLocaleDateString("fr-FR"),
    };
    const updated = [nouvelAvis, ...avis];
    setAvis(updated);
    localStorage.setItem("avis_v2", JSON.stringify(updated));
    form.reset();
    setEnvoi("ok");
    setTimeout(() => setEnvoi("idle"), 3000);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-viking text-3xl text-bois font-bold mb-8 text-center">Avis clients</h1>

      {/* Formulaire */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="font-semibold text-bois mb-4">Laisser un avis</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="nom"
            type="text"
            required
            placeholder="Ton prénom"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bois"
          />
          <select
            name="note"
            required
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bois"
          >
            <option value="">Choisir une note</option>
            <option value="5">⭐⭐⭐⭐⭐ — Excellent</option>
            <option value="4">⭐⭐⭐⭐ — Très bien</option>
            <option value="3">⭐⭐⭐ — Bien</option>
            <option value="2">⭐⭐ — Moyen</option>
            <option value="1">⭐ — Déçu</option>
          </select>
          <textarea
            name="commentaire"
            required
            rows={4}
            placeholder="Ton avis sur les produits..."
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bois resize-none"
          />
          <button
            type="submit"
            className="bg-bois text-white py-2.5 rounded-lg hover:bg-bois-dark transition-colors font-semibold"
          >
            Publier mon avis
          </button>
          {envoi === "ok" && (
            <p className="text-green-600 text-sm text-center">Merci pour ton avis !</p>
          )}
        </form>
      </div>

      {/* Liste des avis */}
      {avis.length === 0 ? (
        <p className="text-center text-gray-500">Sois le premier à laisser un avis !</p>
      ) : (
        <div className="flex flex-col gap-4">
          {avis.map((a, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-semibold text-bois">{a.nom}</span>
                  <span className="ml-2 text-yellow-500">{"⭐".repeat(a.note)}</span>
                </div>
                <span className="text-xs text-gray-400">{a.date}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{a.commentaire}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
