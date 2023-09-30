import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = (import.meta as ImportMeta).env.VITE_SUPABASE_API_URL;
const supabaseKey = (import.meta as ImportMeta).env.VITE_SUPABASE_ANON_KEY;

export const supaClient = createClient<Database>(supabaseUrl, supabaseKey);
// supaClient
//   .from('user_profiles')
//   .select('*')
//   .then(({ data }) => {});
