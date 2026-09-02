#!/usr/bin/env bash
set -euo pipefail

# TDYU only. Does not edit other nginx site files or other PM2 apps.
# Packing: exclude ONLY server/uploads (admin files).

APP=/opt/tdyu-endowment
ARCHIVE=/tmp/tdyu-endowment.tgz
ENVSRC=/tmp/tdyu.env

if [[ ! -f "$ARCHIVE" || ! -f "$ENVSRC" ]]; then
  echo "missing archive or env" >&2
  exit 1
fi

sudo mkdir -p "$APP"
sudo chown ubuntu:ubuntu "$APP"
tar -xzf "$ARCHIVE" -C "$APP"

install -m 600 "$ENVSRC" "$APP/.env"
install -m 600 "$ENVSRC" "$APP/server/.env"
rm -f "$ENVSRC"

mkdir -p "$APP/server/uploads"
chmod 755 "$APP/server/uploads"

cd "$APP"
npm ci --omit=dev
npx prisma generate --schema server/prisma/schema.prisma
npx prisma migrate deploy --schema server/prisma/schema.prisma
node server/prisma/seed.mjs

# Nginx: new site file only
sudo cp "$APP/deploy/nginx-tdyu.yuretta.uz.conf" /etc/nginx/sites-available/tdyu.yuretta.uz
sudo ln -sfn /etc/nginx/sites-available/tdyu.yuretta.uz /etc/nginx/sites-enabled/tdyu.yuretta.uz
sudo nginx -t
sudo systemctl reload nginx

# PM2: start or reload this app only
if pm2 describe tdyu-endowment >/dev/null 2>&1; then
  pm2 reload "$APP/ecosystem.config.cjs" --only tdyu-endowment --update-env
else
  pm2 start "$APP/ecosystem.config.cjs"
fi
pm2 save

# Do not expose API on LAN
sleep 2
ss -tlnp | grep 18787 || true
curl -fsS http://127.0.0.1:18787/api/health
echo
curl -sI -H "Host: tdyu.yuretta.uz" http://127.0.0.1/ | head -n 15

# Wipe local copies of secrets from /tmp
rm -f "$ARCHIVE"
echo "SETUP_OK"
