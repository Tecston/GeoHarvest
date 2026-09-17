import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

function validPublicConfiguration() {
  if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey.startsWith('tu_')) return false;
  try {
    const url = new URL(supabaseUrl);
    return url.protocol === 'https:' || (url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname));
  } catch { return false; }
}

export const isSupabaseConfigured = validPublicConfiguration();

// Auth is optional. No client or network request is created for an unconfigured demo.
// Supabase uses its supported browser storage; sessions stay on this origin.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true },
    })
  : null;
