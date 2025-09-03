import { supabase } from '../utils/supabase/client';

export async function getAllCommunityAchievements() {
  const { data, error } = await supabase
    .from('achievements')
    .select(`
      id,
      user_id,
      created_at,
      game_name,
      achievement_title,
      description,
      screenshot_url,
      likes_count,
      profiles ( username, avatar_url )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching community achievements:', error.message);
    return [];
  }
  return data;
}

export async function createAchievement(achievementData: {
  achievement_title: string;
  game_name: string;
  description: string;
  screenshot_url: string;
  user_id: string;
}) {
  // Ensure proper data structure for insertion
  const achievement = {
    achievement_title: achievementData.achievement_title,
    game_name: achievementData.game_name,
    description: achievementData.description || null,
    screenshot_url: achievementData.screenshot_url || null,
    user_id: achievementData.user_id
  };

  const { error } = await supabase.from("achievements").insert(achievement);

  if (error) {
    console.error("Error posting achievement:", error.message);
    return { success: false, error };
  }
  return { success: true };
}

export async function likeAchievement(achievementId: number, userId: string) {
  // First, insert the like
  const { error: insertError } = await supabase.from('achievement_likes').insert({ achievement_id: achievementId, user_id: userId });
  if (insertError) {
    console.error("Error liking achievement:", insertError.message);
    return { success: false, error: insertError };
  }
  
  // Then, increment the likes count in the achievements table
  const { error: updateError } = await supabase
    .rpc('increment_achievement_likes', { achievement_id: achievementId });
    
  if (updateError) {
    console.error("Error updating achievement likes count:", updateError.message);
  }
  
  return { success: true };
}

export async function unlikeAchievement(achievementId: number, userId: string) {
  // First, delete the like
  const { error: deleteError } = await supabase.from('achievement_likes').delete().match({ achievement_id: achievementId, user_id: userId });
  if (deleteError) {
    console.error("Error unliking achievement:", deleteError.message);
    return { success: false, error: deleteError };
  }
  
  // Then, decrement the likes count in the achievements table
  const { error: updateError } = await supabase
    .rpc('decrement_achievement_likes', { achievement_id: achievementId });
    
  if (updateError) {
    console.error("Error updating achievement likes count:", updateError.message);
  }
  
  return { success: true };
}

export async function getUserLikes(userId: string) {
  const { data, error } = await supabase
    .from('achievement_likes')
    .select('achievement_id')
    .eq('user_id', userId);

  if (error) {
    console.error("Error fetching user likes:", error.message);
    return [];
  }
  return data.map(like => like.achievement_id);
}