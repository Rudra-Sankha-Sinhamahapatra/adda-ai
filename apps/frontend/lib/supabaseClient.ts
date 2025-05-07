import { createClient } from '@supabase/supabase-js';
import { config } from '@/config/config';

export const supabase = createClient(
  config.supabase.url,
  config.supabase.anonKey,
);

export const supabaseAdmin = createClient(
    config.supabase.url,
    config.supabase.serviceRoleKey,
)