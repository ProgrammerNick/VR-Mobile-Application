import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { createClient } from '@supabase/supabase-js'
import * as kv from '../src/supabase/functions/server/kv_store.tsx'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))
app.use('*', logger(console.log))

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

// Helper function to verify user authentication
async function verifyUser(c: any) {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return { user: null, error: 'No authorization header provided' };
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      return { user: null, error: 'No access token provided' };
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      console.log('User verification error:', error);
      return { user: null, error: 'Invalid access token' };
    }

    return { user, error: null };
  } catch (error) {
    console.log('Error in verifyUser:', error);
    return { user: null, error: 'Authentication error' };
  }
}

// Helper function to handle errors consistently
function handleError(error: any, message: string, status: number = 500) {
  console.log(`${message}:`, error);
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Auth routes
app.post('/signup', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: `Signup failed: ${error.message}` }, 400);
    }

    // Initialize user profile in KV store
    await kv.set(`user:${data.user.id}:profile`, {
      id: data.user.id,
      name,
      email,
      level: 1,
      experiencesPlayed: 0,
      totalPlayTime: 0,
      achievements: [],
      createdAt: new Date().toISOString()
    });

    return c.json({ user: data.user, message: 'User created successfully' });
  } catch (error) {
    return handleError(error, 'Failed to create user account', 500);
  }
});

// User profile routes
app.get('/profile', async (c) => {
  const { user, error } = await verifyUser(c);
  if (!user) {
    return c.json({ error: `Authorization error while fetching profile: ${error}` }, 401);
  }

  try {
    const profile = await kv.get(`user:${user.id}:profile`);
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404);
    }

    return c.json({ profile });
  } catch (error) {
    return handleError(error, 'Failed to fetch profile', 500);
  }
});

app.put('/profile', async (c) => {
  const { user, error } = await verifyUser(c);
  if (!user) {
    return c.json({ error: `Authorization error while updating profile: ${error}` }, 401);
  }

  try {
    const updates = await c.req.json().catch(() => ({}));
    const existingProfile = await kv.get(`user:${user.id}:profile`);
    
    const updatedProfile = {
      ...existingProfile,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`user:${user.id}:profile`, updatedProfile);
    return c.json({ profile: updatedProfile });
  } catch (error) {
    return handleError(error, 'Failed to update profile', 500);
  }
});

// VR Content routes
app.get('/content', async (c) => {
  try {
    // Get all VR content from KV store
    const contentKeys = await kv.getByPrefix('content:');
    const content = contentKeys || [];

    return c.json({ content });
  } catch (error) {
    return handleError(error, 'Failed to fetch content', 500);
  }
});

app.post('/content/purchase', async (c) => {
  const { user, error } = await verifyUser(c);
  if (!user) {
    return c.json({ error: `Authorization error during content purchase: ${error}` }, 401);
  }

  try {
    const body = await c.req.json().catch(() => ({}));
    const { contentId, price } = body;
    
    if (!contentId || price === undefined) {
      return c.json({ error: 'Content ID and price are required' }, 400);
    }
    
    // Get user's purchased content
    const purchasedContent = await kv.get(`user:${user.id}:purchases`) || [];
    
    // Check if already purchased
    if (purchasedContent.includes(contentId)) {
      return c.json({ error: 'Content already purchased' }, 400);
    }

    // Add to purchased content
    purchasedContent.push(contentId);
    await kv.set(`user:${user.id}:purchases`, purchasedContent);

    // Record purchase transaction
    await kv.set(`purchase:${user.id}:${contentId}:${Date.now()}`, {
      userId: user.id,
      contentId,
      price,
      timestamp: new Date().toISOString()
    });

    return c.json({ message: 'Content purchased successfully', contentId });
  } catch (error) {
    return handleError(error, 'Failed to process purchase', 500);
  }
});

app.get('/purchases', async (c) => {
  const { user, error } = await verifyUser(c);
  if (!user) {
    return c.json({ error: `Authorization error while fetching purchases: ${error}` }, 401);
  }

  try {
    const purchases = await kv.get(`user:${user.id}:purchases`) || [];
    return c.json({ purchases });
  } catch (error) {
    return handleError(error, 'Failed to fetch purchases', 500);
  }
});

// Friends and Social routes
app.post('/friends/add', async (c) => {
  const { user, error } = await verifyUser(c);
  if (!user) {
    return c.json({ error: `Authorization error while adding friend: ${error}` }, 401);
  }

  try {
    const body = await c.req.json().catch(() => ({}));
    const { friendEmail } = body;
    
    if (!friendEmail) {
      return c.json({ error: 'Friend email is required' }, 400);
    }
    
    // Find friend by email
    const friendKeys = await kv.getByPrefix('user:');
    const friendProfile = friendKeys?.find(profile => 
      profile && profile.email === friendEmail
    );

    if (!friendProfile) {
      return c.json({ error: 'User not found' }, 404);
    }

    // Get current friends list
    const friends = await kv.get(`user:${user.id}:friends`) || [];
    
    // Check if already friends
    if (friends.includes(friendProfile.id)) {
      return c.json({ error: 'Already friends' }, 400);
    }

    // Add friend to both users' friend lists
    friends.push(friendProfile.id);
    await kv.set(`user:${user.id}:friends`, friends);

    const friendsFriends = await kv.get(`user:${friendProfile.id}:friends`) || [];
    friendsFriends.push(user.id);
    await kv.set(`user:${friendProfile.id}:friends`, friendsFriends);

    return c.json({ message: 'Friend added successfully', friend: friendProfile });
  } catch (error) {
    return handleError(error, 'Failed to add friend', 500);
  }
});

app.get('/friends', async (c) => {
  const { user, error } = await verifyUser(c);
  if (!user) {
    return c.json({ error: `Authorization error while fetching friends: ${error}` }, 401);
  }

  try {
    const friendIds = await kv.get(`user:${user.id}:friends`) || [];
    
    // Get friend profiles
    const friendProfiles = [] as any;
    for (const friendId of friendIds) {
      const profile = await kv.get(`user:${friendId}:profile`);
      if (profile) {
        // Get friend's current activity
        const activity = await kv.get(`user:${friendId}:activity`);
        friendProfiles.push({
          ...profile,
          currentActivity: activity
        });
      }
    }

    return c.json({ friends: friendProfiles });
  } catch (error) {
    return handleError(error, 'Failed to fetch friends', 500);
  }
});

// User activity tracking
app.post('/activity', async (c) => {
  const { user, error } = await verifyUser(c);
  if (!user) {
    return c.json({ error: `Authorization error while updating activity: ${error}` }, 401);
  }

  try {
    const body = await c.req.json().catch(() => ({}));
    const { activity, contentId } = body;
    
    if (!activity) {
      return c.json({ error: 'Activity is required' }, 400);
    }
    
    const activityData = {
      activity,
      contentId: contentId || null,
      timestamp: new Date().toISOString()
    };

    await kv.set(`user:${user.id}:activity`, activityData);
    
    // Also store in activity history
    const activityHistory = await kv.get(`user:${user.id}:activity_history`) || [];
    activityHistory.unshift(activityData);
    
    // Keep only last 50 activities
    if (activityHistory.length > 50) {
      activityHistory.splice(50);
    }
    
    await kv.set(`user:${user.id}:activity_history`, activityHistory);

    return c.json({ message: 'Activity updated successfully' });
  } catch (error) {
    return handleError(error, 'Failed to update activity', 500);
  }
});

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Global error handler
app.onError((err, c) => {
  console.log('Global error handler:', err);
  return c.json({ error: 'Internal server error occurred' }, 500);
});

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)