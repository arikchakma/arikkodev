// import { useState } from 'react';
// import { ethers } from 'ethers';

// import { supabase } from '@/lib/supabase';

// export default function Dashboard() {
//   const [loginState, setLoginState] = useState();

//   async function checkUser() {
//     const { data } = await supabase.from('users').select('*');
//     console.log(data);
//   }

//   async function login() {
//     setLoginState('Connecting...');

//     // Guard - if metamask is not installed.
//     if (!window.ethereum) {
//       setLoginState('No Metamask!');
//       return;
//     }

//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     await provider.send('eth_requestAccounts', []);

//     const signer = provider.getSigner();
//     const walletAddress = await signer.getAddress();

//     let response = await fetch('/api/auth/nonce', {
//       method: 'POST',
//       body: JSON.stringify({
//         walletAddress
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     const { nonce } = await response.json();
//     const signature = await signer.signMessage(nonce);

//     response = await fetch('/api/auth/wallet', {
//       method: 'POST',
//       body: JSON.stringify({
//         walletAddress,
//         nonce,
//         signature
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     const { user, token } = await response.json();
//     console.log(user);
//     console.log(token);

//     await supabase.auth.setAuth(token);
//   }

//   return (
//     <div>
//       <h1>{loginState}</h1>
//       <button onClick={login}>Connect</button>
//       <button onClick={checkUser}>Check User</button>
//     </div>
//   );
// }

export default function Dashboard() {
  return <div>Dashboard</div>;
}
