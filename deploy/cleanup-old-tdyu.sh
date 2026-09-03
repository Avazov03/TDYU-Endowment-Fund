#!/usr/bin/env bash
# Run ON OLD server (52.59.209.166) as ubuntu — ONLY removes TDYU.
# Does NOT touch daromad-bot, send, tsul-endowment-api, or other nginx sites.
set -euo pipefail

echo "==> stop TDYU pm2 only"
pm2 delete tdyu-next tdyu-endowment 2>/dev/null || true
pm2 save || true

echo "==> remove TDYU nginx vhost"
sudo rm -f /etc/nginx/sites-enabled/tdyu.yuretta.uz
sudo rm -f /etc/nginx/sites-available/tdyu.yuretta.uz
sudo nginx -t && sudo systemctl reload nginx || true

echo "==> remove TDYU dirs"
sudo rm -rf /opt/tdyu-fresh /opt/tdyu-endowment

echo "OLD_TDYU_CLEANED"
