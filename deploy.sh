#!/bin/bash
# Déploie le contenu de ce dossier vers GitHub Pages (cameleon-ds/trinergy).
# A lancer depuis ce même dossier (ou double-cliquer après un premier chmod +x deploy.sh).
set -e
cd "$(dirname "$0")"
git add -A
git commit -m "Mise à jour du site $(date '+%Y-%m-%d %H:%M')" || echo "Rien à commiter."
git push origin main
echo "Déployé. Le site sera visible sur https://cameleon-ds.github.io/trinergy/ dans 1-2 minutes (Ctrl+Maj+R pour forcer le rafraîchissement)."
