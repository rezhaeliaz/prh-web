# Panduan Lengkap Deploy Website ke VPS Mandiri (Self-Hosted)
**Padjadjaran Suites Resort & Convention Hotel Bogor**

Dokumen ini adalah panduan langkah demi langkah untuk memindahkan dan menjalankan website baru serta Payload CMS di Virtual Private Server (VPS) milik Anda sendiri (DigitalOcean, Linode, Niagahoster, Biznet, IDCloudHost, dll) tanpa biaya langganan platform pihak ketiga (*zero vendor lock-in*).

---

## 1. Rekomendasi Spesifikasi VPS
* **OS:** Ubuntu 22.04 LTS / Ubuntu 24.04 LTS
* **CPU:** Minimal 2 vCPU (Disarankan 2 - 4 vCPU untuk traffic tinggi MICE/Event)
* **RAM:** Minimal 2 GB (Disarankan 4 GB RAM)
* **Storage:** 40 GB - 80 GB SSD / NVMe (cukup untuk galeri foto dan database)

---

## 2. Persiapan Server VPS Baru

Login ke VPS Anda via SSH terminal:
```bash
ssh root@IP_VPS_ANDA
```

Update package sistem dan install Docker & Docker Compose:
```bash
# Update Ubuntu
sudo apt update && sudo apt upgrade -y

# Install dependensi dasar
sudo apt install -y curl git ufw nginx certbot python3-certbot-nginx

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Aktifkan Docker service
sudo systemctl enable --now docker
```

---

## 3. Clone Repository & Konfigurasi Lingkungan (.env)

Masuk ke direktori web dan clone kode website:
```bash
cd /var/www
git clone https://github.com/USERNAME_ANDA/PRH-Web.git padjadjaransuites
cd padjadjaransuites

# Salin file konfigurasi lingkungan
cp .env.example .env
nano .env
```

Sesuaikan nilai-nilai penting di file `.env`:
```env
PAYLOAD_SECRET=buat_string_acak_panjang_dan_rahasia_di_sini
DATABASE_URI=postgresql://postgres:padjadjaran_secret_db_2026@postgres:5432/padjadjaran_db
NEXT_PUBLIC_SERVER_URL=https://padjadjaransuitesresort.com

# Kredensial Midtrans Production
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=Mid-client-xxxxxxxxxxxx
MIDTRANS_SERVER_KEY=Mid-server-xxxxxxxxxxxx
MIDTRANS_IS_PRODUCTION=true

# Akun Admin Pertama
ADMIN_INITIAL_EMAIL=admin@padjadjaransuitesresort.com
ADMIN_INITIAL_PASSWORD=PasswordKuatSuperAdmin2026!
```

---

## 4. Menjalankan Aplikasi dengan Docker Compose

Jalankan Next.js 16, Payload CMS v3, dan PostgreSQL dalam satu perintah:
```bash
docker compose up -d --build
```

Periksa status container yang sedang berjalan:
```bash
docker compose ps
```
Aplikasi website dan CMS kini berjalan pada port `3000` di server Anda.

Jalankan inisialisasi data (seeding) otomatis:
```bash
curl http://localhost:3000/api/seed
```

---

## 5. Konfigurasi Domain & Nginx Reverse Proxy (SSL HTTPS Gratis)

Buat file konfigurasi Nginx untuk domain hotel Anda:
```bash
sudo nano /etc/nginx/sites-available/padjadjaransuites.conf
```

Tempel konfigurasi berikut:
```nginx
server {
    server_name padjadjaransuitesresort.com www.padjadjaransuitesresort.com;

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Aktifkan konfigurasi Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/padjadjaransuites.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Pasang sertifikat SSL gratis Let's Encrypt:
```bash
sudo certbot --nginx -d padjadjaransuitesresort.com -d www.padjadjaransuitesresort.com
```

---

## 6. Konfigurasi Midtrans Webhook (Produksi)

1. Buka [Dashboard Midtrans](https://dashboard.midtrans.com/)
2. Masuk ke menu **Settings** -> **Configuration**
3. Masukkan **Payment Notification URL**:
   `https://padjadjaransuitesresort.com/api/midtrans/notification`
4. Pastikan opsi **Finish Redirect URL** diarahkan ke:
   `https://padjadjaransuitesresort.com/booking?status=finish`
5. Simpan pengaturan (*Save*).

---

## 7. Pemeliharaan & Backup Database

### Backup Database PostgreSQL:
```bash
docker exec -t $(docker compose ps -q postgres) pg_dump -U postgres padjadjaran_db > /backup/padjadjaran_$(date +%F).sql
```

### Backup Folder Media (Foto/Video yang Diupload Staf):
```bash
tar -czvf /backup/media_$(date +%F).tar.gz /var/lib/docker/volumes/padjadjaransuites_media_uploads/_data
```

### Update Website saat ada Perubahan Kode Baru:
```bash
cd /var/www/padjadjaransuites
git pull origin main
docker compose up -d --build
```
