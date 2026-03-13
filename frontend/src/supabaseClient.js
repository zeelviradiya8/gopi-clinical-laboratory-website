import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ubdlksenxsvbjhrkzzoz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViZGxrc2VueHN2Ympocmt6em96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMjI3NzAsImV4cCI6MjA4ODg5ODc3MH0.Oe_KTfwtoQVJRcvA6DHOCFGFxqe_Zff05vbVzvk7QTE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
