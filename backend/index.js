import express from "express";
import serverless from 'serverless-http';
import cors from "cors";
import dotenv from "dotenv";
import supabase from "./config/supabase.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// === ROUTE TEST (Untuk Cek Server Jalan) ===
app.get('/', (req, res) => {
    res.send('Server TrueKicks dengan Supabase Berjalan! 🚀');
});

// === 1. ROUTE PRODUCTS (Semua Sepatu dari tabel 'products') ===
app.get('/api/products', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: true });
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 2. ROUTE SNEAKERS (Khusus tabel 'sneakers') ===
app.get('/api/sneakers', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('sneakers')
            .select('*')
            .order('id', { ascending: true });
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 3. ROUTE APPAREL (Khusus tabel 'apparel') ===
app.get('/api/apparel', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('apparel')
            .select('*')
            .order('id', { ascending: true });
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 4. ROUTE CATEGORIES (BARU: Untuk Navbar & Filter) ===
app.get('/api/categories', async (req, res) => {
    try {
        // Mengambil data dari tabel 'categories' yang sudah Anda buat
        const { data, error } = await supabase
            .from('categories') 
            .select('*'); // Ambil semua kolom (biasanya id, name)
        
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === 5. ROUTE REGISTER (Daftar User Baru) ===
app.post('/api/register', async (req, res) => {
    const { full_name, email, password } = req.body;

    try {
        // Cek apakah email sudah ada?
        const { data: existingUser } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: "Email sudah terdaftar!" });
        }

        // Simpan user baru
        const { data, error } = await supabase
            .from('users')
            .insert([{ full_name, email, password }]) 
            .select();

        if (error) throw error;

        res.status(201).json({ message: "Registrasi berhasil!", user: data[0] });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// === 6. ROUTE LOGIN (Masuk) ===
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cari user berdasarkan email dan password
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password) 
            .single();

        if (error || !user) {
            return res.status(401).json({ message: "Email atau Password salah!" });
        }

        // Jika ketemu, kirim data user
        res.json({ message: "Login berhasil!", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// === 7. ROUTE DETAIL PRODUK (DINAMIS) ===
app.get('/api/detail/:table/:id', async (req, res) => {
    const { table, id } = req.params;

    // Security: Hanya izinkan tabel tertentu
    const allowedTables = ['products', 'sneakers', 'apparel'];
    if (!allowedTables.includes(table)) {
        return res.status(400).json({ message: "Tabel tidak valid" });
    }

    try {
        // Mengambil semua kolom termasuk 'detail_images'
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        if (!data) return res.status(404).json({ message: "Produk tidak ditemukan" });

        // Logging untuk debugging
        console.log(`[API] Fetch ${table} ID ${id} | Images:`, data.detail_images ? data.detail_images.length : 0);

        res.json(data);
    } catch (error) {
        console.error("[API Error]:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// === 7. ROUTE ORDER / CHECKOUT (FIXED) ===
app.post('/api/orders', async (req, res) => {
    // Destructuring data dari frontend
    const { user_id, full_name, address, phone, total_price, items } = req.body; 

    try {
        // PERBAIKAN: Konversi tipe data secara eksplisit
        const parsed_user_id = parseInt(user_id);
        const parsed_total_price = parseFloat(total_price);
        
        // Cek data wajib
        if (isNaN(parsed_user_id) || !full_name || !address || !items || items.length === 0) {
            return res.status(400).json({ error: "Missing required order data." });
        }
        
        // Prepare Payload
        const orderPayload = {
            user_id: parsed_user_id, // Menggunakan integer/bigint yang sudah di-parse
            full_name: full_name,
            address: address, 
            phone: phone,
            total_price: parsed_total_price, // Menggunakan numeric yang sudah di-parse
            items: items, 
            status: 'Processing',
        };
        
        // Debugging final payload sebelum insert
        console.log("[Backend] Final Insert Payload:", orderPayload);

        const { data, error } = await supabase
            .from('orders')
            .insert(orderPayload)
            .select();

        if (error) throw error;

        res.status(201).json({ message: "Order berhasil dibuat!", order: data });

    } catch (error) {
        console.error("--- DATABASE INSERT FAILED ---");
        console.error("Error Detail:", error.message); 
        console.error("Payload received:", req.body);
        
        // Mengirimkan pesan error yang lebih informatif ke frontend
        res.status(500).json({ error: "DB Insert Failed: " + error.message });
    }
});

// === 9. ROUTE SALE PAGE (KHUSUS HALAMAN SALE - UPDATE MULTI-TABLE) ===
app.get('/api/sale', async (req, res) => {
    try {
        // 1. Ambil data sales beserta relasi ke ke-3 tabel produk
        const { data, error } = await supabase
            .from('sales')
            .select(`
                id, 
                discount_percent, 
                products (id, name, category, price, image_url, description),
                sneakers (id, name, category, price, image_url, description),
                apparel (id, name, category, price, image_url, description)
            `)
            .eq('active', true);
        
        if (error) throw error;

        // 2. Normalisasi Data (Penting!)
        // Karena 'sales' bisa terhubung ke products ATAU sneakers ATAU apparel,
        // kita harus cari mana yang tidak null dan menyatukannya.
        const formattedData = data.map(saleItem => {
            // Cek mana yang ada isinya
            const productData = saleItem.products || saleItem.sneakers || saleItem.apparel;

            if (!productData) return null; // Skip jika data produk tidak ditemukan

            return {
                id: saleItem.id, // ID Sale
                discount_percent: saleItem.discount_percent,
                // Kita masukkan data produk ke properti 'products' 
                // agar kode di Sale.jsx (const product = item.products) tetap jalan normal.
                products: productData 
            };
        }).filter(item => item !== null); // Hapus data kosong

        res.json(formattedData);

    } catch (error) {
        console.error("[API Sale Error]:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default serverless(app);