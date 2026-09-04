#!/usr/bin/env bash
# TDYU live deploy. Run ON the server as ubuntu.
# Does not touch other PM2 apps, Docker, or host :80/:443.
set -euo pipefail

SRC=/opt/tdyu-fresh
LIVE=/opt/tdyu-endowment
NEXT_LIVE="$LIVE/next"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=512}"

if [[ "$(id -un)" != "ubuntu" ]]; then
  echo "Run as ubuntu" >&2
  exit 1
fi

if [[ ! -d "$SRC/.git" ]]; then
  echo "Missing git clone at $SRC — clone https://github.com/Avazov03/TDYU-Endowment-Fund.git there" >&2
  exit 1
fi

echo "==> git pull $SRC"
cd "$SRC"
git fetch origin
git reset --hard origin/main

# Next public UI
echo "==> npm ci + next build (RAM-limited)"
cd "$SRC/web"
npm ci
npx next build

echo "==> copy standalone -> $NEXT_LIVE"
mkdir -p "$NEXT_LIVE"
rm -rf "$NEXT_LIVE/.next"
cp -a "$SRC/web/.next/standalone/." "$NEXT_LIVE/"
mkdir -p "$NEXT_LIVE/.next"
cp -a "$SRC/web/.next/static" "$NEXT_LIVE/.next/static"
rm -rf "$NEXT_LIVE/public"
cp -a "$SRC/web/public" "$NEXT_LIVE/public"

echo "==> pm2 restart tdyu-next"
pm2 restart tdyu-next --update-env

# Express API if server tree changed vs last deployed copy (always sync server src, keep live .env)
if [[ -d "$SRC/server" ]]; then
  echo "==> sync Express server (keep $LIVE/.env)"
  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete \
      --exclude uploads \
      --exclude .env \
      --exclude 'prisma/*.db' \
      --exclude 'prisma/*.db-journal' \
      "$SRC/server/" "$LIVE/server/"
  else
    cp -a "$SRC/server/." "$LIVE/server/"
  fi
  cd "$LIVE"
  if [[ -f package-lock.json ]]; then
    npm ci --omit=dev || npm ci
  fi
  npx prisma migrate deploy --schema server/prisma/schema.prisma
  npx prisma generate --schema server/prisma/schema.prisma
  echo "==> CMS seed (empty tables only)"
  node server/scripts/seed-cms.mjs || true
  pm2 restart tdyu-endowment --update-env
fi

sleep 2
echo "==> health"
curl -sS -o /dev/null -w "next /uz %{http_code}\n" http://127.0.0.1:13000/uz
curl -sS -o /dev/null -w "api /api/health %{http_code}\n" http://127.0.0.1:18787/api/health || true
echo "DEPLOY_OK"
