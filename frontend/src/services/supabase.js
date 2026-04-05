import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tfduozhotqovygjsqfbv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmZHVvemhvdHFvdnlnanNxZmJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNjg4NjcsImV4cCI6MjA4NzY0NDg2N30.DNwCEYglmSY2oaHtFgRmnRw7ra5gUcGk3P3t-7jArc0';

export const supabase = createClient(supabaseUrl, supabaseKey);