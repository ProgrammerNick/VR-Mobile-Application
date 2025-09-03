# Supabase Configuration Fix

The error you're experiencing is due to an invalid Supabase API key. Here's how to fix it:

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the "Project URL" and "anon" key from the Project API keys section
4. Update your `.env.local` file with these correct values:

```env
VITE_SUPABASE_URL=your_actual_project_url_here
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

Make sure the anon key is a complete JWT token that looks like:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Note that the key should be a single continuous line without any line breaks or formatting issues.