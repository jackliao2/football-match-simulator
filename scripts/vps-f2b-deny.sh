#!/usr/bin/env bash
# Ban or unban an IP in Nginx (not iptables). Origin sits behind Cloudflare,
# so packet-filter bans would hit edge addresses or do nothing.
set -euo pipefail

CMD="${1:-}"
IP="${2:-}"
FILE=/etc/nginx/snippets/fail2ban-deny.conf
CF=/etc/nginx/conf.d/cloudflare-realip.conf

if [[ "${CMD}" != "ban" && "${CMD}" != "unban" ]]; then
  echo "usage: $0 ban|unban <ip>" >&2
  exit 1
fi
if [[ -z "${IP}" ]]; then
  echo "missing ip" >&2
  exit 1
fi

install -d -m 0755 "$(dirname "${FILE}")"
touch "${FILE}"
chmod 0644 "${FILE}"

if [[ "${CMD}" == "ban" ]]; then
  python3 - "${IP}" "${CF}" <<'PY'
import ipaddress
import sys
from pathlib import Path

ip = ipaddress.ip_address(sys.argv[1])
cf = Path(sys.argv[2])
if cf.exists():
    for line in cf.read_text().splitlines():
        line = line.strip()
        if not line.startswith("set_real_ip_from"):
            continue
        cidr = line.split()[1].rstrip(";")
        if ip in ipaddress.ip_network(cidr, strict=False):
            raise SystemExit(f"refusing to deny Cloudflare edge {ip}")
PY
  if grep -Fxq "deny ${IP};" "${FILE}"; then
    exit 0
  fi
  echo "deny ${IP};" >> "${FILE}"
  if nginx -t >/dev/null 2>&1; then
    nginx -s reload
  else
    sed -i "/^deny ${IP};$/d" "${FILE}"
    echo "nginx -t failed after deny ${IP}" >&2
    exit 1
  fi
  exit 0
fi

if grep -Fxq "deny ${IP};" "${FILE}"; then
  sed -i "/^deny ${IP};$/d" "${FILE}"
  nginx -t >/dev/null 2>&1 && nginx -s reload
fi
