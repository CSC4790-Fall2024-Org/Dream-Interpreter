import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slaxbnfmvswlyrzuydde.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsYXhibmZtdnN3bHlyenV5ZGRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3MDEwNzYsImV4cCI6MjA0NTI3NzA3Nn0.EjRS55ougX6mW97cvvcvdq3Z0MZBwsVH0qhjGmFxDNI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
