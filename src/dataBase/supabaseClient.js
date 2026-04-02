import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_DATABASE_URL
const supabaseKey = import.meta.env.VITE_DATABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)