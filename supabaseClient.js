const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://gvezselivzzzrzzdemnc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2ZXpzZWxpdnp6enJ6emRlbW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NjQxMzMsImV4cCI6MjAzMjA0MDEzM30.Nql3OlIpNQyTgpxhesKAHvjWPmxHbZN3_eHSpG93MSA";
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);