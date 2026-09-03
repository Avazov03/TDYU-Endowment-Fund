#!/usr/bin/env bash
# Bootstrap TDYU on a fresh Ubuntu Lightsail host. Run as ubuntu.
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

echo "==> swap 2G (RAM ~1GB)"
if [[ ! -f /swapfile ]]; then
  sudo fallocate -l 2G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi
free -m

echo "==> apt packages"
sudo apt-get update -y
sudo apt-get install -y nginx curl git ca-certificates build-essential ufw

echo "==> Node 20"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
node -v
npm -v

echo "==> pm2"
sudo npm install -g pm2

echo "==> dirs"
sudo mkdir -p /opt/tdyu-fresh /opt/tdyu-endowment
sudo chown -R ubuntu:ubuntu /opt/tdyu-fresh /opt/tdyu-endowment

if [[ ! -d /opt/tdyu-fresh/.git ]]; then
  echo "==> git clone"
  git clone https://github.com/Avazov03/TDYU-Endowment-Fund.git /opt/tdyu-fresh
else
  echo "==> git pull"
  cd /opt/tdyu-fresh
  git fetch origin
  git reset --hard origin/main
fi

echo "==> firewall"
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable || true

echo "BOOTSTRAP_OK"
