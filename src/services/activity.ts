import { supabase } from '../utils/supabase/client';
import { addActivity as dbAddActivity } from '../supabase/db/activity';

export async function updateActivity(activity: string, contentId?: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const activityData = {
    user_id: user.id,
    activity,
    content_id: contentId,
    created_at: new Date().toISOString(),
  };
  return await dbAddActivity(activityData);
}