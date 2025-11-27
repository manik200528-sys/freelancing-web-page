import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// Use environment variables for configuration
// Add these to your .env.local file or deployment environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://joyomfjgenanxmvjzndu.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpveW9tZmpnZW5hbnhtdmp6bmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjIzNjEsImV4cCI6MjA3OTgzODM2MX0.A9OwIXLlGfWoeGoTXU0PjdpLycdj7NNKxAx1Lf0Tn5E';

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey); 