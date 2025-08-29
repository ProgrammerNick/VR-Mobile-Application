import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { createClient } from '@supabase/supabase-js'
import * as kv from './kv_store.tsx'

const app = new Hono()

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
  return Response.json({ error: message }, { status });
}

// Auth routes
app.post('/make-server-342abf80/signup', async (c) => {
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
app.get('/make-server-342abf80/profile', async (c) => {
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

app.put('/make-server-342abf80/profile', async (c) => {
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
app.get('/make-server-342abf80/content', async (c) => {
  try {
    // Get all VR content from KV store
    const contentKeys = await kv.getByPrefix('content:');
    const content = contentKeys || [];

    return c.json({ content });
  } catch (error) {
    return handleError(error, 'Failed to fetch content', 500);
  }
});

app.post('/make-server-342abf80/content/purchase', async (c) => {
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

app.get('/make-server-342abf80/purchases', async (c) => {
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
app.post('/make-server-342abf80/friends/add', async (c) => {
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

app.get('/make-server-342abf80/friends', async (c) => {
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
app.post('/make-server-342abf80/activity', async (c) => {
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

// Initialize sample VR content and demo user on server start
async function initializeData() {
  try {
    // Initialize sample VR content
    const sampleContent = [
      {
        id: '1',
        title: 'Cyberpunk City 2077',
        description: 'Explore a neon-lit futuristic metropolis with flying cars and towering skyscrapers.',
        category: 'Adventure',
        price: 12.99,
        duration: '45 min',
        rating: 4.8,
        thumbnail: 'https://images.unsplash.com/photo-1636036704268-017faa3b6557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBlbnZpcm9ubWVudCUyMG5lb258ZW58MXx8fHwxNzU2MzU3MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '2',
        title: 'Space Station Alpha',
        description: 'Experience life aboard an international space station with zero gravity physics.',
        category: 'Simulation',
        price: 9.99,
        duration: '30 min',
        rating: 4.6,
        thumbnail: 'https://images.unsplash.com/photo-1634893661513-d6d1f579fc63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwc3BhY2UlMjBlbnZpcm9ubWVudHxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '3',
        title: 'Ancient Rome VR',
        description: 'Walk through the Roman Forum and Colosseum in their full glory.',
        category: 'Education',
        price: 14.99,
        duration: '60 min',
        rating: 4.9,
        thumbnail: 'https://images.unsplash.com/photo-1547930206-82ac0a7aa08d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjB3b3JsZHxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '4',
        title: 'VR Tutorial Island',
        description: 'Learn the basics of VR interaction in this beginner-friendly experience.',
        category: 'Tutorial',
        duration: '15 min',
        rating: 4.3,
        thumbnail: 'https://images.unsplash.com/photo-1547930206-82ac0a7aa08d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjB3b3JsZHxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      }
    ];

    for (const content of sampleContent) {
      const existing = await kv.get(`content:${content.id}`);
      if (!existing) {
        await kv.set(`content:${content.id}`, content);
      }
    }

    // Create demo user if it doesn't exist
    const demoUserEmail = 'demo@vrcompanion.app';
    const demoUserExists = await kv.get('demo:user:created');
    
    if (!demoUserExists) {
      try {
        const { data, error } = await supabase.auth.admin.createUser({
          email: demoUserEmail,
          password: 'demo123456',
          user_metadata: { name: 'Demo User' },
          email_confirm: true
        });

        if (!error && data.user) {
          // Initialize demo user profile
          await kv.set(`user:${data.user.id}:profile`, {
            id: data.user.id,
            name: 'Demo User',
            email: demoUserEmail,
            level: 5,
            experiencesPlayed: 12,
            totalPlayTime: 24,
            achievements: ['Explorer', 'Social Butterfly'],
            createdAt: new Date().toISOString()
          });

          // Add some demo purchases
          await kv.set(`user:${data.user.id}:purchases`, ['1', '4']);
          
          // Mark demo user as created
          await kv.set('demo:user:created', true);
          
          console.log('Demo user created successfully:', demoUserEmail);
        }
      } catch (error) {
        console.log('Demo user might already exist or error creating:', error);
      }
    }

    console.log('Data initialization completed');
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

// Health check
app.get('/make-server-342abf80/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Global error handler
app.onError((err, c) => {
  console.log('Global error handler:', err);
  return c.json({ error: 'Internal server error occurred' }, 500);
});

// Initialize data on server start
initializeData().catch(console.error);