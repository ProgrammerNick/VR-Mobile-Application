import { supabase } from '../../utils/supabase/client';

export const getAllGames = async () => {
  const { data, error } = await supabase.from('games').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const getPurchases = async (userId: string) => {
  const { data, error } = await supabase.from('user_purchases').select('game_id').eq('user_id', userId);
  if (error) throw new Error(error.message);
  return data.map(p => p.game_id);
};

export const addPurchase = async (userId: string, gameId: number, price: number) => {
  const { data, error } = await supabase.from('user_purchases').insert({ user_id: userId, game_id: gameId, price: price });
  if (error) throw new Error(error.message);
  return data;
};