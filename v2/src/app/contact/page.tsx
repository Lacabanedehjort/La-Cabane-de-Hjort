"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import type { Metadata } from "next";

export default function ContactPage() {
  const [envoi, setEnvoi] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnvoi("loading");

    const form = e.currentTarget;
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setEnvoi("ok");
      form.reset();
    } catch {
      setEnvoi("error");
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h1 className="font-viking text-3xl text-bois font-bold mb-8 text-center">Contact</h1>

      {envoi === "ok" ? (
        <div className="text-center py-12">
          <p className="text-5xl mb-4">📨</p>
          <p className="text-bois font-semibold">Message envoyé ! Je te réponds dès que possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ton nom</label>
            <input
              name="nom"
              type="text"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bois"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ton email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bois"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bois resize-none"
            />
          </div>

          {envoi === "error" && (
            <p className="text-red-500 text-sm">Erreur lors de l&apos;envoi, réessaie.</p>
          )}

          <button
            type="submit"
            disabled={envoi === "loading"}
            className="bg-bois text-white py-3 rounded-lg hover:bg-bois-dark transition-colors font-semibold disabled:opacity-60"
          >
            {envoi === "loading" ? "Envoi..." : "Envoyer le message"}
          </button>
        </form>
      )}
    </div>
  );
}
