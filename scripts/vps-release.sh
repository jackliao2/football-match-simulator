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

npm ci
npm run build
cp -a public .next/standalone/
install -d -m 0755 .next/standalone/.next
cp -a .next/static .next/standalone/.next/
chown -R legendarymatch:legendarymatch .next/standalone
chmod 0755 /srv/apps/legendarymatch
systemctl restart legendarymatch
systemctl is-active legendarymatch nginx

echo "Rollback if needed: git reset --hard ${PREV} && re-run the build/copy/restart steps in docs/VPS_DEPLOYMENT.md"
