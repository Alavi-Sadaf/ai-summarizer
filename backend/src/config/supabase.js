const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_url_here') {
    console.warn('⚠️ Supabase credentials are missing or default. DB connection will fail.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
