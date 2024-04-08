import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ucmsrzpvukrjclkmoklc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjbXNyenB2dWtyamNsa21va2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxMTY5NzksImV4cCI6MjAyMjY5Mjk3OX0.ySceXNOaf99v6agZyjUMj3x9wIYKQMZeQMowFXx6hZ4';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
