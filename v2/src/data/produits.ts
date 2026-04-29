export type Categorie =
  | "porte-clefs"
  | "plateaux"
  | "dessous-de-verre"
  | "marque-pages";

export interface Produit {
  slug: string;
  nom: string;
  description: string;
  prix: number;
  stock: number;
  categorie: Categorie;
  image: string;
}

export const produits: Produit[] = [
  // ── Porte-clefs ──────────────────────────────────────────────────────────
  {
    slug: "porte-clef-mjolnir-corbeau",
    nom: "Porte-clef Mjolnir Corbeau",
    description: "Mjolnir orné d'un corbeau d'Odin, gravé au laser sur bois.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_mjolnir_corbeau.jpg",
  },
  {
    slug: "porte-clef-mjolnir-thurisaz",
    nom: "Porte-clef Mjolnir Thurisaz",
    description: "Mjolnir avec rune Thurisaz gravée, protection et force.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_mjolnir_thurisaz.jpg",
  },
  {
    slug: "porte-clef-mjolnir-eclair",
    nom: "Porte-clef Mjolnir Éclair",
    description: "Mjolnir traversé d'un éclair, symbole du tonnerre de Thor.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_mjolnir_éclair.jpg",
  },
  {
    slug: "porte-clef-aegishjalmur",
    nom: "Porte-clef Ægishjalmr",
    description: "Le casque de terreur, symbole de protection absolue.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_aegishjalmur.jpg",
  },
  {
    slug: "porte-clef-valknut",
    nom: "Porte-clef Valknut",
    description: "Les trois triangles entrelacés d'Odin, symbole de mort et renaissance.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_valknut.jpg",
  },
  {
    slug: "porte-clef-yggdrasil",
    nom: "Porte-clef Yggdrasil",
    description: "L'arbre monde nordique aux neuf royaumes, finement gravé.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_yggdrasil.jpg",
  },
  {
    slug: "porte-clef-dragon",
    nom: "Porte-clef Dragon",
    description: "Dragon nordique stylisé, emblème de puissance.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_dragon.jpg",
  },
  {
    slug: "porte-clef-valkirie",
    nom: "Porte-clef Valkyrie",
    description: "Valkyrie aux ailes déployées, gardienne des guerriers tombés.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_valkirie.jpg",
  },
  {
    slug: "porte-clef-triple-corne-odin",
    nom: "Porte-clef Triple Corne d'Odin",
    description: "Symbole de la sagesse et du mead de la poésie.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_triple_corne_d'odin.jpg",
  },
  {
    slug: "porte-clef-noeud-bouclier",
    nom: "Porte-clef Nœud de Bouclier",
    description: "Entrelacs celtique symbolisant la protection au combat.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_noeud_de_bouclier.jpg",
  },
  {
    slug: "porte-clef-noeud-dara",
    nom: "Porte-clef Nœud de Dara",
    description: "Nœud celtique en forme de racines de chêne, force et longévité.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_noeud_de_dara.jpg",
  },
  {
    slug: "porte-clef-noeud-dara-decoupe",
    nom: "Porte-clef Nœud de Dara Découpé",
    description: "Version ajourée du nœud de Dara, légère et élégante.",
    prix: 9,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_noeud_de_dara_découpé.jpg",
  },
  {
    slug: "porte-clef-noeud-salomon",
    nom: "Porte-clef Nœud de Salomon",
    description: "Symbole de sagesse et d'équilibre, nœud médiéval.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_noeud_de_salomon.jpg",
  },
  {
    slug: "porte-clef-noeud-salomon-decoupe",
    nom: "Porte-clef Nœud de Salomon Découpé",
    description: "Version ajourée du nœud de Salomon.",
    prix: 9,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_noeud_de_salomon_découpé.jpg",
  },
  {
    slug: "porte-clef-croix-celte",
    nom: "Porte-clef Croix Celte",
    description: "Croix celtique traditionnelle avec entrelacs.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_croix_celte.jpg",
  },
  {
    slug: "porte-clef-croix-celte-decoupee",
    nom: "Porte-clef Croix Celte Découpée",
    description: "Croix celte ajourée, très détaillée.",
    prix: 9,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_croix_celte_découpée.jpg",
  },
  {
    slug: "porte-clef-croix-templiere-decoupee",
    nom: "Porte-clef Croix Templière Découpée",
    description: "Croix pattée des Templiers, finement découpée.",
    prix: 9,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_croix_templière_découpée.jpg",
  },
  {
    slug: "porte-clef-crucifix-fleuri",
    nom: "Porte-clef Crucifix Fleuri",
    description: "Croix médiévale ornée de motifs floraux.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_crucifix_fleuri.jpg",
  },
  {
    slug: "porte-clef-crucifix-simple",
    nom: "Porte-clef Crucifix Simple",
    description: "Crucifix épuré, classique et élégant.",
    prix: 7,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_crucifix_simple.jpg",
  },
  {
    slug: "porte-clef-phoenix-en-vol",
    nom: "Porte-clef Phœnix en Vol",
    description: "Phœnix aux ailes déployées, renaissance et immortalité.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_phoenix_en_vol.jpg",
  },
  {
    slug: "porte-clef-phoenix-posant",
    nom: "Porte-clef Phœnix Posant",
    description: "Phœnix au repos, majestueux.",
    prix: 8,
    stock: 10,
    categorie: "porte-clefs",
    image: "/images/Porte-clef_phoenix_posant.jpg",
  },
  // ── Plateaux ─────────────────────────────────────────────────────────────
  {
    slug: "plateau-vegvisir",
    nom: "Plateau Vegvisir",
    description: "Plateau en bois orné du Vegvisir, boussole magique des Vikings.",
    prix: 25,
    stock: 5,
    categorie: "plateaux",
    image: "/images/Plateau_Vegvisir.jpg",
  },
  {
    slug: "plateau-drakkar",
    nom: "Plateau Drakkar",
    description: "Drakkar viking gravé au laser sur plateau en bois massif.",
    prix: 25,
    stock: 5,
    categorie: "plateaux",
    image: "/images/Plateau_drakkar.jpg",
  },
  {
    slug: "plateau-runique",
    nom: "Plateau Runique",
    description: "Plateau entouré de runes de l'alphabet Futhark.",
    prix: 25,
    stock: 5,
    categorie: "plateaux",
    image: "/images/Plateau_runique.jpg",
  },
  {
    slug: "plateau-viking",
    nom: "Plateau Viking",
    description: "Motifs vikings traditionnels sur plateau décoratif.",
    prix: 25,
    stock: 5,
    categorie: "plateaux",
    image: "/images/Plateau_viking.jpg",
  },
  // ── Dessous de verre ─────────────────────────────────────────────────────
  {
    slug: "dessous-verre-aegishjalmur",
    nom: "Dessous de Verre Ægishjalmr",
    description: "Casque de terreur gravé sur dessous de verre en bois.",
    prix: 6,
    stock: 15,
    categorie: "dessous-de-verre",
    image: "/images/Dessous_verre_aegishjalmur.jpg",
  },
  {
    slug: "dessous-verre-dragon",
    nom: "Dessous de Verre Dragon",
    description: "Dragon nordique gravé, protège ta table avec style.",
    prix: 6,
    stock: 15,
    categorie: "dessous-de-verre",
    image: "/images/Dessous_verre_dragon.jpg",
  },
  {
    slug: "dessous-verre-loup",
    nom: "Dessous de Verre Loup",
    description: "Loup de Fenrir gravé sur bois, force et instinct.",
    prix: 6,
    stock: 15,
    categorie: "dessous-de-verre",
    image: "/images/Dessous_verre_loup.jpg",
  },
  {
    slug: "dessous-verre-mjolnir",
    nom: "Dessous de Verre Mjolnir",
    description: "Marteau de Thor gravé, protection pour ta table.",
    prix: 6,
    stock: 15,
    categorie: "dessous-de-verre",
    image: "/images/Dessous_verre_mjolnir.jpg",
  },
  {
    slug: "dessous-verre-yggdrasil",
    nom: "Dessous de Verre Yggdrasil",
    description: "L'arbre monde gravé en détail sur bois naturel.",
    prix: 6,
    stock: 15,
    categorie: "dessous-de-verre",
    image: "/images/Dessous_verre_yggdrasil.jpg",
  },
  // ── Marque-pages ─────────────────────────────────────────────────────────
  {
    slug: "marque-page-drakkar",
    nom: "Marque-page Drakkar",
    description: "Marque-page en bois gravé avec drakkar viking, idéal pour les lecteurs.",
    prix: 5,
    stock: 20,
    categorie: "marque-pages",
    image: "/images/Marque_page_drakkar.jpg",
  },
];

export function getProduit(slug: string): Produit | undefined {
  return produits.find((p) => p.slug === slug);
}

export function getProduitsByCategorie(cat: Categorie): Produit[] {
  return produits.filter((p) => p.categorie === cat);
}

export const categories: { slug: Categorie; label: string }[] = [
  { slug: "porte-clefs", label: "Porte-clefs" },
  { slug: "plateaux", label: "Plateaux" },
  { slug: "dessous-de-verre", label: "Dessous de verre" },
  { slug: "marque-pages", label: "Marque-pages" },
];
