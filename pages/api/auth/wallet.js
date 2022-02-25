// import { ethers } from 'ethers';
// import jwt from 'jsonwebtoken';
// import { supabase } from '@/lib/supabase';

// export default async function wallet(req, res) {
//   try {
//     const { walletAddress, nonce, signature } = req.body;

//     const signerAddress = ethers.utils.verifyMessage(nonce, signature);

//     if (signerAddress !== walletAddress) {
//       throw new Error({ message: 'Wrong signature!' });
//     }

//     const { data: user, error } = await supabase
//       .from('users')
//       .select('*')
//       .eq('walletAddress', walletAddress)
//       .eq('nonce', nonce)
//       .single();

//     const token = jwt.sign(
//       {
//         aud: 'authenticated',
//         exp: Math.floor(Date.now() / 1000 + 60 * 60),
//         sub: user.id,
//         user_metadata: {
//           id: user.id
//         },
//         role: 'authenticated'
//       },
//       process.env.SUPABASE_JWT_SECRET
//     );

//     res.status(200).json({ user, token });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// }
