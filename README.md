# VR/AR Companion App for Meta

This is a VR/AR companion application built with React, Vite, and Hono for Meta devices.

## Deployment Options

This project supports multiple deployment targets:

### 1. Vercel Deployment (Recommended)

This project is configured for deployment to Vercel with both frontend and backend components:

1. The React frontend is built with Vite and served as static files
2. The backend API is implemented with Hono and runs as Vercel serverless functions

#### Prerequisites

- A Vercel account
- A Supabase account with a project set up

#### Environment Variables

Create a `.env.local` file in the root of your project with the following variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

You can use `.env.template` as a starting point:
```bash
cp .env.template .env.local
```

Then fill in your actual Supabase credentials in the `.env.local` file.

For Vercel deployment, you'll need to add these environment variables in your Vercel project settings:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

#### Deployment Steps

1. Push your code to a GitHub repository
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect this as a Vite project
4. Add the required environment variables in your Vercel project settings
5. Deploy!

### 2. Supabase Edge Functions (Alternative)

The project also includes Supabase Edge Functions in `src/supabase/functions/server/` which can be deployed directly to Supabase.

## Project Structure

- `src/` - React frontend code
- `api/` - Hono serverless functions for Vercel deployment
- `src/supabase/functions/server/` - Supabase Edge Functions (alternative deployment target)

## API Endpoints

After deployment, your API will be available at:
- `/api/signup` - User registration
- `/api/profile` - User profile management
- `/api/content` - VR content listing
- `/api/content/purchase` - Content purchase
- `/api/purchases` - User purchases
- `/api/friends` - Friend management
- `/api/activity` - Activity tracking
- `/api/health` - Health check

## Development

To run locally:
```bash
npm install
npm run dev
```

To build for production:
```bash
npm run build
```