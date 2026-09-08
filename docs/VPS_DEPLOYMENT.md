# LegendaryMatch production deployment

Last verified: 2026-09-08

LegendaryMatch is self-hosted on a RackNerd VPS. Vercel is no longer used for
this project and the former Vercel project has been deleted.

## Production architecture

```text
Visitor
  -> Cloudflare DNS/CDN/proxy
  -> RackNerd VPS (Nginx on 80/443)
  -> Next.js standalone server (127.0.0.1:3000)
```

| Item | Value |
| --- | --- |
| Production URL | `https://legendarymatch.com` |
| VPS IPv4 | `198.44.31.27` |
| SSH user | `root` |
| SSH port | `22` |
| Operating system | Ubuntu 24.04 LTS |
| Runtime | Node.js 22 |
| Reverse proxy | Nginx |
| Process manager | systemd |
| CDN and authoritative DNS | Cloudflare |

Do not add the root password, API keys, Cloudflare credentials, or certificate
private keys to this repository. The root password should be rotated because it
was previously shared in chat. SSH key authentication should replace password
authentication when practical.

## DNS

Cloudflare is authoritative for `legendarymatch.com`.

| Type | Name | Target | Proxy |
| --- | --- | --- | --- |
| A | `@` | `198.44.31.27` | Proxied |
| CNAME | `www` | `legendarymatch.com` | Proxied |

Keep the existing Namecheap email-forwarding MX records, SPF TXT record, and
Google site-verification TXT record. Mail records must remain DNS-only.

Cloudflare SSL/TLS mode must be **Full (strict)**. Do not use Flexible mode.

HTML is not in Cloudflare’s default cacheable file list, so a **targeted Cache
Rule** is required. Without it, every page request reaches the VPS even when
Next.js sends `CDN-Cache-Control`. Create one rule:

- When hostname equals `legendarymatch.com` or `www.legendarymatch.com`
- And URI Path does not start with `/api`, `/match`, or `/simulate`
- Then Eligible for cache, Edge TTL 5 minutes, respect origin cache-control

Do not add a blanket `Cache Everything` rule that includes `/api` or `/match`.
Create the rule in the Cloudflare dashboard; this repo does not store a
Cloudflare API token.

## Server layout

| Purpose | Path or unit |
| --- | --- |
| Application source/build | `/srv/apps/legendarymatch` |
| Standalone runtime | `/srv/apps/legendarymatch/.next/standalone` |
| Production environment | `/etc/legendarymatch.env` |
| systemd unit | `/etc/systemd/system/legendarymatch.service` |
| Nginx site | `/etc/nginx/sites-available/legendarymatch` |
| Nginx enabled link | `/etc/nginx/sites-enabled/legendarymatch` |
| Shared proxy settings | `/etc/nginx/snippets/proxy-common.conf` |
| TLS certificate | `/etc/letsencrypt/live/legendarymatch.com/fullchain.pem` |
| TLS private key | `/etc/letsencrypt/live/legendarymatch.com/privkey.pem` |

The `legendarymatch` service runs as the unprivileged `legendarymatch` system
user. Node listens only on `127.0.0.1:3000`; only Nginx is public.

## Production environment

Secrets and runtime configuration live in `/etc/legendarymatch.env`, owned by
`root:legendarymatch` with mode `0640`. The deployed configuration includes:

- `AI_API_KEY`
- `AI_BASE_URL=https://ark.cn-beijing.volces.com/api/v3`
- `AI_MODEL=ep-20260223214004-c89q2`
- `AI_DISABLE_THINKING=true`
- the AI rate-limit, daily quota, and cache settings documented in `.env.example`
- `AI_QUOTA_STORE_PATH=/var/lib/legendarymatch/ai-quota.json`
- the canonical `NEXT_PUBLIC_*` site metadata

The API key itself is intentionally not recorded here. After changing public
`NEXT_PUBLIC_*` variables, rebuild the application because Next.js embeds them
at build time. After changing server-only variables, restart the service.

```bash
systemctl restart legendarymatch
systemctl status legendarymatch --no-pager
```

## Deployment procedure

Run the local quality gate before every production deployment:

```powershell
npm run check
```

The project uses `output: "standalone"` in `next.config.ts`. Build on the Linux
VPS rather than copying a Windows `.next` directory.

### GitHub checkout (preferred)

After the one-time bootstrap below, `/srv/apps/legendarymatch` is a checkout of
`git@github.com:jackliao2/football-match-simulator.git`. The VPS authenticates
with a **read-only** GitHub deploy key at `/root/.ssh/legendarymatch-github`.
That private key must never be committed. Until bootstrap succeeds, use the
tarball fallback.

One-time bootstrap (prints the public key the first time; add it on GitHub,
then re-run):

```bash
bash /srv/apps/legendarymatch/scripts/vps-bootstrap-git.sh
# from the operator machine, after copying the printed .pub line:
# gh repo deploy-key add legendarymatch-github.pub --title legendarymatch-vps --repo jackliao2/football-match-simulator
```

Normal release after `git push origin main`:

```bash
ssh -i $HOME/.ssh/id_ed25519 root@198.44.31.27 bash /srv/apps/legendarymatch/scripts/vps-release.sh
```

The release script fetches `origin/main`, `git reset --hard`, runs `npm ci` and
`npm run build`, copies `public` and `.next/static` into the standalone tree,
and restarts `legendarymatch`. It never writes `/etc/legendarymatch.env`.

After the first release that includes `scripts/vps-ops-apply.sh`, run it once
(it is idempotent) so hashed `/_next/static/` assets are served from disk,
`/etc/legendarymatch.env` plus Nginx/systemd unit files are backed up daily to
`/var/backups/legendarymatch` (14-day retention, mode `0700`; env copies are
`0600`), Cloudflare visitor IPs are restored from `CF-Connecting-IP`, and
Fail2ban jails Nginx scanner paths with an Nginx `deny` list (iptables would
either ban Cloudflare edge addresses or do nothing):

```bash
ssh -i $HOME/.ssh/id_ed25519 -o IdentitiesOnly=yes root@198.44.31.27 bash /srv/apps/legendarymatch/scripts/vps-ops-apply.sh
```

Do not copy `/var/backups/legendarymatch` into Git.

Rollback to a previous SHA, then rebuild:

```bash
cd /srv/apps/legendarymatch
git reset --hard <sha>
# then the npm ci / build / copy / chown / restart steps below
```

### Tarball fallback

If GitHub is unreachable, upload the source while excluding `.git`, `.next`,
`node_modules`, `.vercel`, local environment files, reports, and temporary
archives. On the VPS:

```bash
cd /srv/apps/legendarymatch
npm ci
npm run build
cp -a public .next/standalone/
install -d -m 0755 .next/standalone/.next
cp -a .next/static .next/standalone/.next/
chown -R legendarymatch:legendarymatch .next/standalone
systemctl restart legendarymatch
nginx -t
systemctl reload nginx
```

Never overwrite `/etc/legendarymatch.env` during a code deployment.

Create `/var/lib/legendarymatch` owned by `legendarymatch` if the daily AI
quota file is missing:

```bash
install -d -o legendarymatch -g legendarymatch -m 0750 /var/lib/legendarymatch
```

The Node process must be able to write `ai-quota.json` there. Do not put that
file in Git.

## Verification

Check the service and origin locally on the VPS:

```bash
systemctl is-active legendarymatch nginx fail2ban
curl -I -H 'Host: legendarymatch.com' http://127.0.0.1/
journalctl -u legendarymatch -n 100 --no-pager
```

Check the public Cloudflare path:

```bash
curl -I https://legendarymatch.com/
curl -I https://www.legendarymatch.com/
curl -I https://legendarymatch.com/simulate
```

Expected results:

- root domain: HTTP `200`, `CDN-Cache-Control` present, `Strict-Transport-Security` present
- `www`: HTTP `308` redirect to `https://legendarymatch.com/`
- response header: `Server: cloudflare`
- `/simulate`: HTTP `200` and `Cache-Control: private, no-store`
- `/es`: `<html lang="es"`

The AI path accepts `POST /api/commentary` with a valid `matchId`. A successful
uncached production test returns HTTP `200`, JSON `source: "ai"`, and an
`X-AI-Cache` response header. Avoid repeated live tests because they consume AI
quota.

## Operations

```bash
# Service status and logs
systemctl status legendarymatch --no-pager
journalctl -u legendarymatch -f

# Restart the application
systemctl restart legendarymatch

# Validate and reload Nginx
nginx -t
systemctl reload nginx

# Certificate status and renewal timer
certbot certificates
systemctl status certbot.timer --no-pager

# Firewall and SSH protection
ufw status verbose
fail2ban-client status sshd
fail2ban-client status nginx-scanner

# Config backups (env, Nginx site, systemd unit)
ls -l /var/backups/legendarymatch
tail /var/log/legendarymatch-backup.log
```

The firewall permits SSH, HTTP, and HTTPS from anywhere. Port 80 must stay
reachable for Let’s Encrypt HTTP-01 renewals; locking 80/443 to Cloudflare IPs
would break Certbot on this host. Cloudflare’s orange-cloud proxy still hides
the origin from ordinary visitors. Fail2ban jails `sshd` and `nginx-scanner`
(probe paths such as `/wp-admin` and `*.php`). Scanner bans are Nginx `deny`
lines for restored visitor IPs, not iptables drops, because the TCP peer is
still Cloudflare. Automatic Ubuntu
security updates, Fail2ban, Nginx, the application service, and the Certbot
renewal timer are enabled at boot.

Nginx sets `Strict-Transport-Security` on the HTTPS vhost and rewrites
`<html lang="en"` to `es` / `pt-BR` on `/es` and `/pt-br` so crawlers see the
correct language on first HTML without dynamizing the Next.js root layout.
Hashed `/_next/static/` files are aliased from the standalone build on disk
with a one-year expiry so Node does not proxy every chunk. The static location
uses `expires` rather than `add_header` so the vhost HSTS header is inherited.

The application tree at `/srv/apps/legendarymatch` is `755` and not world-writable.
SSH to this host uses the `jackl-vps` ed25519 key on the operator machine;
do not store the root password in the repo.

This is a multi-site host, so unattended upgrades are explicitly forbidden from
rebooting it automatically. The override lives at
`/etc/apt/apt.conf.d/52unattended-local` and sets both
`Unattended-Upgrade::Automatic-Reboot` and
`Unattended-Upgrade::Automatic-Reboot-WithUsers` to `false`. Security updates
continue installing automatically; schedule kernel-required reboots manually in
a maintenance window and verify every hosted site afterward.

## Recovery

If a new deployment fails before the service restart, the currently running
process continues serving the previous in-memory build. Note the previous SHA
from the release script output, `git reset --hard` to it, rebuild, and restart.

If the service fails after restart:

1. Inspect `journalctl -u legendarymatch -n 100 --no-pager`.
2. Verify `/etc/legendarymatch.env` still exists and has mode `0640`.
3. Verify `.next/standalone/server.js`, `.next/standalone/public`, and
   `.next/standalone/.next/static` exist.
4. Run `systemctl restart legendarymatch` and test `127.0.0.1:3000`.
5. Run `nginx -t` before reloading Nginx.

Cloudflare DNS can be set temporarily to DNS-only for origin troubleshooting,
but doing so exposes the VPS IP and requires a publicly trusted origin
certificate. Restore the proxied setting afterward.
