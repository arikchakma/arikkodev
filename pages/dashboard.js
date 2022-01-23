import { useState } from 'react';
import Container from '@/components/Container';
import { ethers } from 'ethers';

export default function Dashboard() {
  const [loginState, setLoginState] = useState();

  async function login() {
    setLoginState('Connecting...');

    // Guard - if metamask is not installed.
    if (!window.ethereum) {
      setLoginState('No Metamask!');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();
    // const signature = await signer.signMessage('Hello World');

    const response = await fetch('/api/auth/nonce', {
      method: 'POST',
      body: JSON.stringify({
        walletAddress
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(walletAddress, data);
  }

  return (
    <div>
      <h1>{loginState}</h1>
      <button onClick={login}>Connect</button>
    </div>
  );
}
