# TDYU — yangi Lightsail server (master reja)

**Live host (2026-09):**
- Public IPv4: `3.79.57.253`
- Private IPv4: `172.26.11.220`
- Public IPv6: `2a05:d014:1091:2d00:768b:8b11:2d63:34ae`
- SSH: `ubuntu@3.79.57.253`
- Kalit: `%USERPROFILE%\.ssh\lightsail_tdyu.pem`
- RAM ~1 GB + swap 2G; Docker yo‘q

**Eski host:**
- `52.59.209.166` — boshqa PM2 saqlansin; TDYU tozalash: `cleanup-old-tdyu.sh`

## Stack (yangi)

```
/opt/tdyu-fresh          ← git clone
/opt/tdyu-endowment      ← Express + .env + prisma + uploads
/opt/tdyu-endowment/next ← Next standalone
PM2 tdyu-endowment :18787
PM2 tdyu-next      :13000
Nginx :80 (SSL = DNS dan keyin certbot)
```

## Holat

- [x] Bootstrap (Node 20, nginx, pm2, swap, ufw)
- [x] Clone + build + PM2
- [x] `.env` + SQLite + uploads (localdan; eski SSH yopiq edi)
- [x] Health: next/api/nginx **200**
- [ ] DNS A → `3.79.57.253`
- [ ] Certbot SSL
- [ ] Eski TDYU tozalash (SSH ochilganda)

## Foydalanuvchi qiladi

1. DNS: `tdyu.yuretta.uz` + `tdyu.yuritta.uz` A → `3.79.57.253`
2. Keyin: `sudo certbot --nginx -d tdyu.yuretta.uz -d tdyu.yuritta.uz`
3. Eski server ochilsa: `bash cleanup-old-tdyu.sh`
