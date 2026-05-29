# Google Sheets Integration Setup Guide

## 📋 Panduan Konfigurasi Google Sheets untuk Survey CERITA

Berikut adalah langkah-langkah lengkap untuk menghubungkan form survei Anda ke Google Sheets.

---

## 1️⃣ Setup Google Cloud Console (Service Account)

### Langkah A: Buat Google Cloud Project
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Klik "Create Project" di bagian atas
3. Masukkan nama project: `cerita-survey`
4. Klik "Create"
5. Tunggu sampai project dibuat (±1-2 menit)

### Langkah B: Aktifkan Google Sheets API
1. Di menu navigasi, pilih "APIs & Services" → "Library"
2. Cari `Google Sheets API`
3. Klik dan tekan tombol "Enable"
4. Tunggu sampai API aktif

### Langkah C: Buat Service Account
1. Di menu navigasi, pilih "APIs & Services" → "Credentials"
2. Klik tombol "+ Create Credentials" → pilih "Service Account"
3. Isi form:
   - Service account name: `cerita-survey-bot`
   - Service account ID: (auto-filled, biarkan default)
   - Description: `Bot untuk mengumpulkan data survei CERITA`
4. Klik "Create and Continue"
5. Di halaman "Grant this service account access to project", pilih role:
   - Search: `Basic Editor` atau `Editor`
   - Klik "Continue"
6. Klik "Done"

### Langkah D: Buat JSON Key
1. Di halaman "Credentials", cari service account yang baru dibuat (`cerita-survey-bot`)
2. Klik service account tersebut
3. Buka tab "Keys"
4. Klik "Add Key" → "Create new key"
5. Pilih tipe "JSON"
6. Klik "Create"
7. File JSON akan otomatis ter-download (simpan dengan aman!)

---

## 2️⃣ Setup Google Sheets

### Langkah A: Buat Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.google.com/)
2. Klik "Create new spreadsheet"
3. Beri nama: `CERITA Survey Responses`
4. Klik "Create"

### Langkah B: Bagikan dengan Service Account
1. Di spreadsheet, klik tombol "Share" (atas kanan)
2. Di kolom email, masukkan email service account (format: `cerita-survey-bot@PROJECT_ID.iam.gserviceaccount.com`)
   - Bisa ditemukan di file JSON yang di-download: field `client_email`
3. Pilih permission "Editor"
4. Klik "Share"

### Langkah C: Copy Sheet ID
1. Di URL spreadsheet, cari string seperti:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_INI/edit
   ```
2. Salin `SHEET_ID_INI` (bagian panjang antara `/d/` dan `/edit`)

---

## 3️⃣ Setup Environment Variables (.env.local)

### File: `.env.local` (di root project)

Buat atau edit file `.env.local` di root direktori proyek:

```env
# Google Sheets Integration
GOOGLE_SERVICE_ACCOUNT_EMAIL=cerita-survey-bot@YOUR-PROJECT-ID.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...[COPY DARI FILE JSON]...H8zzMzuGAWj8=\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=YOUR_SHEET_ID_HERE
```

### Cara Mendapatkan Nilai:

1. **GOOGLE_SERVICE_ACCOUNT_EMAIL**
   - Dari file JSON yang di-download: field `client_email`
   - Contoh: `cerita-survey-bot@cerita-survey-123.iam.gserviceaccount.com`

2. **GOOGLE_PRIVATE_KEY**
   - Dari file JSON yang di-download: field `private_key`
   - **PENTING**: Ganti semua newline (`\n`) yang ada di dalam string dengan escape sequence `\n`
   - Jangan lupa bungkus dengan double quotes (`"..."`)
   - Contoh:
     ```env
     GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BA...\n-----END PRIVATE KEY-----\n"
     ```

3. **GOOGLE_SHEET_ID**
   - Dari URL spreadsheet (lihat Langkah 2C di atas)
   - Contoh: `1a2b3c4d5e6f7g8h9i0jk1l2m3n4o5p6q7r8s9t0u`

---

## ⚠️ Tips Penting

- ✅ **Jangan commit `.env.local` ke repository!** Tambahkan ke `.gitignore`
- ✅ File JSON service account sangat rahasia (key untuk akses API)
- ✅ Pastikan private key di-escape dengan benar (newline menjadi `\n`)
- ✅ Test koneksi: Buka form survei dan coba submit - data harus masuk ke sheet

---

## 🔍 Debugging

### Error: "Invalid private key"
- Periksa escape sequence newline di `.env.local`
- Private key harus dimulai dengan `-----BEGIN PRIVATE KEY-----` dan diakhiri dengan `-----END PRIVATE KEY-----`

### Error: "Spreadsheet not found"
- Pastikan GOOGLE_SHEET_ID benar
- Pastikan spreadsheet sudah di-share dengan service account

### Error: "Permission denied"
- Cek apakah service account sudah di-add sebagai editor di spreadsheet
- Cek role service account di Google Cloud Console

---

## 📊 Verifikasi Hasil

Setelah form berhasil di-submit:
1. Buka spreadsheet `CERITA Survey Responses`
2. Data baru harus muncul sebagai baris baru dengan timestamp
3. Kolom-kolom: Timestamp | Nama/Inisial | Rentang Usia | Tingkat Pemahaman | Kritik & Saran

---

## 🚀 Selanjutnya

Setelah setup selesai, form survei Anda siap mengumpulkan data secara otomatis ke Google Sheets!
