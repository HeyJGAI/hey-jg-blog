import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    // This will show up loudly in the browser console instead of failing silently,
    // so a missing Netlify env var is easy to diagnose.
    console.error(
        'Missing Supabase config. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY ' +
        '(in a local .env file for dev, and in Netlify site settings for production).'
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
