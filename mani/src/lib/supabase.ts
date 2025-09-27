import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// Use environment variables for configuration
// Add these to your .env.local file or deployment environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hhsghmptodqamwqovtrc.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhoc2dobXB0b2RxYW13cW92dHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzQxNzMsImV4cCI6MjA2MjQ1MDE3M30.iRzAx9SJQof08FVyLBgBEWgXGO1neUIcVH3gmPtg4_A';

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey); 