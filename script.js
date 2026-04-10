function ajouterAuPanier(nom, prix) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];

    panier.push({ nom: nom, prix: prix });

    localStorage.setItem("panier", JSON.stringify(panier));

    updateCartCount(); // 🔥 met à jour le compteur
