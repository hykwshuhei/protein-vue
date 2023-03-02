import { createClient } from "@supabase/supabase-js";
// import type { Database } from "../schema";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
  // {
  //   auth: {
  //     autoRefreshToken: false,
  //     persistSession: false,
  //     detectSessionInUrl: false
  //   }
  // }
);
