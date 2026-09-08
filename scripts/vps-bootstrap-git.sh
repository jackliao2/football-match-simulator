#!/usr/bin/env bash
# One-time conversion of /srv/apps/legendarymatch into a GitHub checkout.
# Generates a read-only deploy key if missing. Print the public key, add it
# with `gh repo deploy-key add`, then re-run this script.
set -euo pipefail

APP=/srv/apps/legendarymatch
KEY=/root/.ssh/legendarymatch-github
REMOTE=git@github.com:jackliao2/football-match-simulator.git
export GIT_SSH_COMMAND="ssh -i ${KEY} -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"

if [[ ! -f "${KEY}" ]]; then
  ssh-keygen -t ed25519 -f "${KEY}" -N "" -C "legendarymatch-vps-deploy"
  chmod 0600 "${KEY}"
  echo "Add this deploy key (read-only) on GitHub, then re-run:"
  echo "  gh repo deploy-key add ${KEY}.pub --title legendarymatch-vps --repo jackliao2/football-match-simulator"
  echo
  cat "${KEY}.pub"
  exit 2
fi

if [[ -d "${APP}/.git" ]]; then
  echo "${APP} already has a git checkout."
  git -C "${APP}" remote -v
  exit 0
fi

TMP="$(mktemp -d /tmp/legendarymatch-git.XXXXXX)"
trap 'rm -rf "${TMP}"' EXIT
git clone --depth 50 "${REMOTE}" "${TMP}"
rsync -a "${TMP}/.git/" "${APP}/.git/"
git -C "${APP}" reset --hard origin/main
git -C "${APP}" remote set-url origin "${REMOTE}"
echo "Git checkout ready at ${APP} @ $(git -C "${APP}" rev-parse --short HEAD)"
echo "Untracked build dirs (.next, node_modules) were left in place."
