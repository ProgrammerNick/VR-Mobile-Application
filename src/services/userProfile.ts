import { supabase } from '../utils/supabase/client';

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error.message);
    return null;
  }
  return data;
}

export async function updateProfile(userId: string, profileData: { username?: string; avatar_url?: string }) {
  const { error } = await supabase
    .from('profiles')
    .update({
      ...profileData,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  if (error) {
    console.error('Error updating profile:', error.message);
    return { success: false, error };
  }
  return { success: true };
}

export async function createProfile(userId: string, username: string, avatar_url?: string) {
  const { error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      username,
      avatar_url,
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error creating profile:', error.message);
    return { success: false, error };
  }
  return { success: true };
}