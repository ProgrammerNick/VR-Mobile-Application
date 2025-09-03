import { supabase } from '../utils/supabase/client';
import { getAllGames, getPurchases as dbGetPurchases, addPurchase as dbAddPurchase } from '../supabase/db/content';

export async function getContent() {
  const games = await getAllGames();
  return { content: games };
}

export async function purchaseContent(contentId: number, price: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  return await dbAddPurchase(user.id, contentId, price);
}

export async function getPurchases() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const purchases = await dbGetPurchases(user.id);
  return { purchases: purchases };
}