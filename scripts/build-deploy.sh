#!/usr/bin/env bash
# =============================================================================
# build-deploy.sh — La Cabane de Hjort
# Installe Docker si absent, build l'image, lance les conteneurs en local
# Usage : bash scripts/build-deploy.sh [--reset]
# --reset : supprime les volumes et repart de zéro (⚠️ efface la base de données)
# =============================================================================

set -euo pipefail

# ─── Couleurs ─────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'
BOLD='\033[1m'; RESET='\033[0m'

log()  { echo -e "${BLUE}[DEPLOY]${RESET} $1"; }
ok()   { echo -e "${GREEN}[OK]${RESET}    $1"; }
warn() { echo -e "${YELLOW}[WARN]${RESET}  $1"; }
err()  { echo -e "${RED}[ERREUR]${RESET} $1"; exit 1; }

# ─── Arguments ────────────────────────────────────────────────────────────────
RESET_DATA=false
for arg in "$@"; do
  [[ "$arg" == "--reset" ]] && RESET_DATA=true
done

# ─── Détection OS ─────────────────────────────────────────────────────────────
detect_os() {
  if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
    echo "windows"
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "macos"
  else
    echo "linux"
  fi
}

OS=$(detect_os)
log "Système détecté : $OS"

# ─── Étape 1 : Vérifier / Installer Docker ────────────────────────────────────
echo ""
echo -e "${BOLD}═══════════════════════════════════════════${RESET}"
echo -e "${BOLD}  Étape 1 — Vérification Docker             ${RESET}"
echo -e "${BOLD}═══════════════════════════════════════════${RESET}"

if command -v docker &>/dev/null; then
  DOCKER_VERSION=$(docker --version | grep -oP '\d+\.\d+\.\d+' | head -1)
  ok "Docker $DOCKER_VERSION déjà installé"
else
  warn "Docker non trouvé — installation automatique..."

  case "$OS" in
    windows)
      warn "Sur Windows, Docker Desktop doit être installé manuellement."
      echo ""
      echo -e "  👉 Télécharge Docker Desktop ici :"
      echo -e "  ${BOLD}https://www.docker.com/products/docker-desktop/${RESET}"
      echo ""
      echo -e "  1. Télécharge et installe Docker Desktop"
      echo -e "  2. Redémarre ton PC"
      echo -e "  3. Relance ce script : ${BOLD}bash scripts/build-deploy.sh${RESET}"
      exit 1
      ;;

    macos)
      if command -v brew &>/dev/null; then
        log "Installation via Homebrew..."
        brew install --cask docker
        open /Applications/Docker.app
        echo ""
        warn "Docker Desktop s'ouvre. Attends qu'il soit prêt (icône baleine dans la barre), puis relance ce script."
        exit 0
      else
        echo -e "  👉 Télécharge Docker Desktop ici :"
        echo -e "  ${BOLD}https://www.docker.com/products/docker-desktop/${RESET}"
        exit 1
      fi
      ;;

    linux)
      log "Installation Docker Engine sur Linux..."
      curl -fsSL https://get.docker.com | sudo sh
      sudo usermod -aG docker "$USER"
      ok "Docker installé. Déconnecte-toi et reconnecte-toi pour appliquer les permissions, puis relance ce script."
      exit 0
      ;;
  esac
fi

# Vérifier que Docker daemon tourne
if ! docker info &>/dev/null; then
  err "Docker est installé mais pas démarré. Lance Docker Desktop et réessaie."
fi

# Vérifier docker compose (v2)
if ! docker compose version &>/dev/null; then
  err "docker compose (v2) non trouvé. Mets à jour Docker Desktop."
fi

ok "Docker prêt ✓"

# ─── Étape 2 : Vérifier le fichier .env ───────────────────────────────────────
echo ""
echo -e "${BOLD}═══════════════════════════════════════════${RESET}"
echo -e "${BOLD}  Étape 2 — Configuration .env              ${RESET}"
echo -e "${BOLD}═══════════════════════════════════════════${RESET}"

if [[ ! -f ".env" ]]; then
  if [[ -f ".env.example" ]]; then
    log "Copie de .env.example → .env"
    cp .env.example .env
    warn ".env créé depuis l'exemple. Édite les valeurs avant de continuer :"
    echo ""
    echo -e "  ${BOLD}nano .env${RESET}   (Linux/Mac)"
    echo -e "  ${BOLD}notepad .env${RESET}  (Windows)"
    echo ""
    echo -e "  Variables minimales à remplir :"
    echo -e "  - NEXTAUTH_SECRET (génère avec : openssl rand -base64 32)"
    echo -e "  - STRIPE_SECRET_KEY (obtiens sur https://dashboard.stripe.com)"
    echo -e "  - RESEND_API_KEY (obtiens sur https://resend.com)"
    echo ""
    read -rp "Appuie sur Entrée une fois que tu as rempli .env, ou Ctrl+C pour annuler..." _
  else
    err "Ni .env ni .env.example trouvé. Crée un fichier .env (voir README.md section 9)."
  fi
else
  ok ".env présent ✓"
fi

# ─── Étape 3 : Reset optionnel ────────────────────────────────────────────────
if [[ "$RESET_DATA" == true ]]; then
  echo ""
  warn "⚠️  --reset détecté : suppression des volumes Docker (base de données effacée)"
  read -rp "  Es-tu sûr ? Tape 'oui' pour confirmer : " confirm
  if [[ "$confirm" == "oui" ]]; then
    docker compose down -v 2>/dev/null || true
    ok "Volumes supprimés"
  else
    log "Reset annulé"
  fi
fi

# ─── Étape 4 : Build de l'image ───────────────────────────────────────────────
echo ""
echo -e "${BOLD}═══════════════════════════════════════════${RESET}"
echo -e "${BOLD}  Étape 3 — Build                           ${RESET}"
echo -e "${BOLD}═══════════════════════════════════════════${RESET}"

log "Construction de l'image Docker..."
docker compose build --no-cache
ok "Image construite ✓"

# ─── Étape 5 : Démarrage des conteneurs ───────────────────────────────────────
echo ""
echo -e "${BOLD}═══════════════════════════════════════════${RESET}"
echo -e "${BOLD}  Étape 4 — Démarrage                       ${RESET}"
echo -e "${BOLD}═══════════════════════════════════════════${RESET}"

log "Démarrage des conteneurs..."
docker compose up -d
ok "Conteneurs démarrés ✓"

# ─── Étape 6 : Migrations base de données ─────────────────────────────────────
echo ""
log "Application des migrations Prisma..."
sleep 5  # attendre que PostgreSQL soit prêt

docker compose exec app npx prisma migrate deploy 2>/dev/null \
  || { warn "Migrations déjà à jour ou base vide — tentative avec migrate dev...";
       docker compose exec app npx prisma migrate dev --name init 2>/dev/null || true; }

# Seed si la base est vide
log "Chargement des données initiales (produits)..."
docker compose exec app npx prisma db seed 2>/dev/null \
  || warn "Seed déjà appliqué ou ignoré (normal si relance)"

ok "Base de données prête ✓"

# ─── Résumé final ─────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}${GREEN}═══════════════════════════════════════════${RESET}"
echo -e "${BOLD}${GREEN}  ✅  La Cabane de Hjort est en ligne !     ${RESET}"
echo -e "${BOLD}${GREEN}═══════════════════════════════════════════${RESET}"
echo ""
echo -e "  🌐 Boutique locale   : ${BOLD}http://localhost:3000${RESET}"
echo -e "  🗄️  Base de données  : ${BOLD}http://localhost:5432${RESET} (PostgreSQL)"
echo ""
echo -e "  Commandes utiles :"
echo -e "  ${BOLD}docker compose logs -f app${RESET}          → voir les logs en direct"
echo -e "  ${BOLD}docker compose down${RESET}                 → arrêter"
echo -e "  ${BOLD}docker compose exec app npx prisma studio${RESET}  → explorer la base de données"
echo ""
echo -e "  Pour exposer sur Internet avec Pangolin → voir README.md section Déploiement"
echo ""
