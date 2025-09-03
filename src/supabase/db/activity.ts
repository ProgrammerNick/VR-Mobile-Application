import { supabase } from '../../utils/supabase/client';

export const addActivity = async (activityData: any) => {
  const { data, error } = await supabase.from('user_activity').insert(activityData);
  if (error) throw new Error(error.message);
  return data;
};