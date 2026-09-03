# TDYU production deploy

Live URL: https://tdyu.yuretta.uz/uz

## Nima qayerda

| | Path / process |
|--|----------------|
| Git manba | `/opt/tdyu-fresh` (`origin/main`) |
| Express + `.env` | `/opt/tdyu-endowment` — PM2 `tdyu-endowment` — `:18787` |
| Next standalone | `/opt/tdyu-endowment/next` — PM2 `tdyu-next` — `:13000` |
| Nginx | `tdyu.yuretta.uz` / `tdyu.yuritta.uz` — `/` `/admin` → Next; `/api` `/uploads` → Express |

`/opt/tdyu-endowment` **git repo emas**. U yerga `git pull` qilmang.

## Agent (Windows)

SSH kalit: `%USERPROFILE%\.ssh\yuritta_tdyu` (repoda yo‘q).

```text
ssh -i %USERPROFILE%\.ssh\yuritta_tdyu ubuntu@52.59.209.166 "bash /opt/tdyu-fresh/deploy/deploy-live.sh"
```

Agar skript hali clone ichida yo‘q bo‘lsa: avval GitHub’ga push, keyin:

```text
ssh ... "cd /opt/tdyu-fresh && git fetch origin && git reset --hard origin/main && bash deploy/deploy-live.sh"
```

## Skript nima qiladi

1. `/opt/tdyu-fresh` ni `origin/main` ga tenglashtiradi  
2. `web/` da `npm ci` + `next build` (`NODE_OPTIONS=--max-old-space-size=512`)  
3. Standalone + `public` ni `/opt/tdyu-endowment/next` ga yozadi  
4. `pm2 restart tdyu-next`  
5. `server/` ni live Express papkasiga sync (`.env` va `uploads` saqlanadi) + `tdyu-endowment` restart  

Boshqa PM2, Docker, 80/443 — **tegmaslik**.

## Tekshiruv

- `curl -sI http://127.0.0.1:13000/uz` → 200  
- Brauzer: https://tdyu.yuretta.uz/uz  

## RAM

Host ~1 GB. Build paytida boshqa og‘ir jarayon ochmang.
