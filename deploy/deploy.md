# AES — VPS Deploy Runbook (Hostinger + PM2 + Nginx + Let's Encrypt)

Deploys the Next.js 14 standalone build to `aes-designstudio.com`.

- App lives at `/var/www/aes`, runs as a Node standalone server on `127.0.0.1:3000` under PM2.
- Nginx terminates TLS and reverse-proxies to it.

## 0. Prerequisites (once per VPS)

```bash
# SSH in as a sudo user, then install Node 20 via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
nvm install 20 && nvm alias default 20

# PM2 + certbot + nginx
npm i -g pm2
sudo apt-get update && sudo apt-get install -y nginx certbot python3-certbot-nginx
```

## 1. First deploy

```bash
sudo mkdir -p /var/www/aes && sudo chown -R "$USER" /var/www/aes
git clone <REPO_URL> /var/www/aes
cd /var/www/aes

npm ci
NEXT_PUBLIC_SITE_URL=https://aes-designstudio.com npm run build

# output: standalone does NOT copy static assets or public/ into the standalone dir — do it manually:
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup        # run the command it prints (sets PM2 to start on boot)
```

Verify locally on the box: `curl -s http://127.0.0.1:3000 | grep -i "<title>"`.

## 2. Nginx + TLS

```bash
sudo cp deploy/nginx-aes.conf /etc/nginx/sites-available/aes-designstudio.com
sudo ln -s /etc/nginx/sites-available/aes-designstudio.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Issue + install the certificate (also wires the HTTP->HTTPS redirect):
sudo certbot --nginx -d aes-designstudio.com -d www.aes-designstudio.com
```

## 3. DNS

In Hostinger hPanel → Domains → DNS zone, point the domain at the VPS:

- `A` record `@` → `<VPS_IPv4>`
- `A` record `www` → `<VPS_IPv4>`

Wait for propagation, then browse to https://aes-designstudio.com.

## 4. Redeploy (each release)

```bash
cd /var/www/aes
git pull
npm ci
NEXT_PUBLIC_SITE_URL=https://aes-designstudio.com npm run build
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
pm2 reload aes-web
```

## Notes

- Env: `deploy/ecosystem.config.cjs` sets `NEXT_PUBLIC_SITE_URL`, `PORT=3000`, `HOSTNAME=127.0.0.1`. Change the domain in one place if it moves.
- Logs: `pm2 logs aes-web`. Status: `pm2 status`. Restart: `pm2 restart aes-web`.
- The standalone server only binds loopback; Nginx is the public entry point.
