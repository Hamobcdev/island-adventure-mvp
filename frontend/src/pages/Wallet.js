import React from 'react';
import { Link } from 'react-router-dom';
import { useTonConnectUI } from '@tonconnect/ui-react';

const Wallet = () => {
  const [tonConnectUI] = useTonConnectUI();

  const handleConnect = async () => {
    try {
      await tonConnectUI.openModal();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Check console for details.');
    }
  };

  return (
    <div>
      <h1>Wallet</h1>
      <nav>
        <Link to="/home">Home</Link> | 
        <Link to="/ads">Ads</Link> | 
        <Link to="/wallet">Wallet</Link>
      </nav>
      <button onClick={handleConnect}>Connect Wallet</button>
      {tonConnectUI.connected && <p>Connected: {tonConnectUI.account?.address}</p>}
    </div>
  );
};

export default Wallet;