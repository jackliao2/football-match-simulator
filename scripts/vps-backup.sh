#!/usr/bin/env bash
# Daily config backup on the RackNerd VPS. Never copies application secrets
# into Git. Env files are mode 600 inside /var/backups/legendarymatch.
set -euo pipefail

DEST="${BACKUP_DIR:-/var/backups/legendarymatch}"
KEEP_DAYS="${BACKUP_KEEP_DAYS:-14}"
STAMP="$(date -u +%Y%m%d)"
DIR="${DEST}/${STAMP}"

install -d -m 0700 "${DEST}"
install -d -m 0700 "${DIR}"

if [[ -f /etc/legendarymatch.env ]]; then
  install -m 0600 /etc/legendarymatch.env "${DIR}/legendarymatch.env"
fi
if [[ -f /etc/nginx/sites-available/legendarymatch ]]; then
  install -m 0640 /etc/nginx/sites-available/legendarymatch "${DIR}/nginx-site"
fi
if [[ -f /etc/nginx/snippets/proxy-common.conf ]]; then
  install -m 0640 /etc/nginx/snippets/proxy-common.conf "${DIR}/proxy-common.conf"
fi
if [[ -f /etc/systemd/system/legendarymatch.service ]]; then
  install -m 0640 /etc/systemd/system/legendarymatch.service "${DIR}/legendarymatch.service"
fi

find "${DEST}" -mindepth 1 -maxdepth 1 -type d -mtime "+${KEEP_DAYS}" -exec rm -rf {} +
echo "Backup ${DIR}"
