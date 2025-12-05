# TrueKicks 👟

TrueKicks adalah platform e-commerce modern yang dikhususkan untuk penjualan sneakers dan pakaian (apparel). Proyek ini dibangun dengan arsitektur monorepo yang memisahkan **frontend** dan **backend**, memberikan pengalaman belanja yang responsif dan manajemen data yang efisien menggunakan Supabase.

## 🌟 Fitur Utama

* **Autentikasi Pengguna**: Login dan pendaftaran pengguna (terintegrasi dengan Supabase Auth).
* **Katalog Produk**: Penjelajahan produk berdasarkan kategori (Sneakers, Apparel, Sale).
* **Detail Produk**: Tampilan mendalam untuk setiap item.
* **Manajemen Keranjang (Cart)**: Menambah, menghapus, dan melihat item belanja (menggunakan Context API).
* **Wishlist**: Menyimpan item favorit pengguna (menggunakan Context API).
* **Checkout**: Alur proses pembayaran.
* **Manajemen Profil**: Halaman profil pengguna.
* **Desain Responsif**: Antarmuka yang ramah seluler menggunakan Tailwind CSS.

## 🛠️ Teknologi yang Digunakan

### Frontend
* **React.js**: Library UI utama.
* **Vite**: Build tool yang cepat untuk pengembangan frontend.
* **Tailwind CSS**: Framework utility-first CSS untuk styling.
* **Context API**: Manajemen state global (Cart & Wishlist).

### Backend & Database
* **Node.js**: Runtime environment untuk server.
* **Express.js**: Framework web untuk API.
* **Supabase**: Backend-as-a-Service (BaaS) untuk Database (PostgreSQL), Autentikasi, dan Storage.

### Deployment
* **Vercel**: Konfigurasi deployment tersedia (`vercel.json`).

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:
* [Node.js](https://nodejs.org/) (Versi LTS direkomendasikan)
* [npm](https://www.npmjs.com/)

## 🚀 Instalasi dan Penggunaan

Proyek ini terdiri dari dua bagian utama: `frontend` dan `backend`. Anda perlu menjalankan keduanya (atau mengonfigurasinya) agar aplikasi berjalan penuh.

### 1. Clone Repository

```
git clone [https://github.com/username-anda/truekicks.git](https://github.com/username-anda/truekicks.git)
cd truekicks
```
### 2. Konfigurasi Backend
```
cd backend
npm install
```
Buat file .env di dalam folder backend dan isi kredensial Supabase Anda:
```
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```
Jalankan server backend:
```
npm start
```
### 3. Konfigurasi Frontend
Buka terminal baru, masuk ke folder frontend dan instal dependensi:
```
cd frontend
npm install
```
Buat file .env di dalam folder frontend:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
# Sesuaikan endpoint API jika frontend memanggil backend lokal
VITE_API_URL=http://localhost:5000
```
Jalankan server pengembangan frontend:
```
npm run dev
```
