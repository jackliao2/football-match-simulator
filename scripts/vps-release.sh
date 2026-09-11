#!/usr/bin/env bash
# Run on the RackNerd VPS as root after GitHub deploy-key access is in place.
# Never overwrites /etc/legendarymatch.env.
set -euo pipefail

APP=/srv/apps/legendarymatch
KEY=/root/.ssh/legendarymatch-github
export GIT_SSH_COMMAND="ssh -i ${KEY} -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=1536}"

if [[ ! -d "${APP}/.git" ]]; then
  echo "Missing ${APP}/.git. Run scripts/vps-bootstrap-git.sh first." >&2
  exit 1
fi
if [[ ! -f /etc/legendarymatch.env ]]; then
  echo "Refusing to build: /etc/legendarymatch.env is missing." >&2
  exit 1
fi

cd "${APP}"
PREV="$(git rev-parse --short HEAD)"
git fetch --prune origin
git reset --hard origin/main
NEXT="$(git rev-parse --short HEAD)"
echo "Release ${PREV} -> ${NEXT}"

KEEP=/var/lib/legendarymatch/next-static
install -d -m 0755 "${KEEP}"
# Copy hashes that are still being served before `next build` wipes `.next`.
if [[ -d .next/standalone/.next/static ]]; then
  cp -a .next/standalone/.next/static/. "${KEEP}/"
fi

npm ci
npm run build
cp -a public .next/standalone/
install -d -m 0755 .next/standalone/.next/static
# Hashed chunks from the previous build must stay on disk: Cloudflare can still
# serve HTML that points at them for a few minutes after this restart.
if [[ -n "$(find "${KEEP}" -mindepth 1 -print -quit 2>/dev/null)" ]]; then
  cp -a "${KEEP}/." .next/standalone/.next/static/
fi
cp -a .next/static/. .next/standalone/.next/static/
cp -a .next/static/. "${KEEP}/"
find "${KEEP}" -type f -mtime +14 -delete
find "${KEEP}" -type d -empty -delete 2>/dev/null || true
chown -R legendarymatch:legendarymatch .next/standalone
chmod 0755 /srv/apps/legendarymatch
systemctl restart legendarymatch
systemctl is-active legendarymatch nginx

echo "Rollback if needed: git reset --hard ${PREV} && re-run the build/copy/restart steps in docs/VPS_DEPLOYMENT.md"
