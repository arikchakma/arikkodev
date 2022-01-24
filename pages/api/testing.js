import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('testing')
    .insert([{ name: 'Suhasinee' }]);

  res.status(200).json({ data, error });
}
