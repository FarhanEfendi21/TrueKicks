import { createClient } from '@supabase/supabase-js';

// Di Vite, kita mengakses environment variables menggunakan import.meta.env
// Dan variabelnya HARUS diawali dengan VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);