import { supabase } from '../../utils/supabase/client';

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data;
};

export const upsertProfile = async (profileData: any) => {
  const { data, error } = await supabase.from('profiles').upsert(profileData).select().single();
  if (error) throw new Error(error.message);
  return data;
};

export const updateProfile = async (userId: string, profileData: Partial<any>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...profileData, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
    
  if (error) throw new Error(error.message);
  return data;
};