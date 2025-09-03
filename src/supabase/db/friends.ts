import { supabase } from '../../utils/supabase/client';

export const getFriends = async (userId: string) => {
  const { data: friendRelations, error: relationError } = await supabase
    .from('friends')
    .select('user_one_id, user_two_id')
    .or(`user_one_id.eq.${userId},user_two_id.eq.${userId}`)
    .eq('status', 'accepted');

  if (relationError) throw new Error(relationError.message);
  if (!friendRelations || friendRelations.length === 0) return [];

  const friendIds = friendRelations.map(relation =>
    relation.user_one_id === userId ? relation.user_two_id : relation.user_one_id
  );

  const { data: friends, error: profilesError } = await supabase
    .from('profiles')
    .select('id, username, avatar_url')
    .in('id', friendIds);

  if (profilesError) throw new Error(profilesError.message);

  return friends;
};

export const addFriend = async (userId1: string, userId2: string) => {
  const { data, error } = await supabase.from('friends').insert({ user_one_id: userId1, user_two_id: userId2, status: 'pending' });
  if (error) throw new Error(error.message);
  return data;
};