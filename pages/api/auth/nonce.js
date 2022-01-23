import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  const { walletAddress } = req.body;
  const nonce = uuidv4();

  let { data, error } = await supabase
    .from('users')
    .select('nonce')
    .eq('walletAddress', walletAddress);

  if (data.length > 0) {
    // 1. Update nonce
    let { data, error } = await supabase
      .from('users')
      .update({ nonce })
      .match({ walletAddress });
  } else {
    // 2. Create user record and nonce
    let { data, error } = await supabase
      .from('users')
      .insert({ nonce, walletAddress });
  }

  console.log(data, error);

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json({ nonce });
  }
}
