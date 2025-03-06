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
    <div style={{ 
      textAlign: 'center', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f0f0f0', 
      minHeight: '100vh' 
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Wallet</h1>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/home" style={{ margin: '0 10px', color: '#4CAF50', textDecoration: 'none' }}>Home</Link> | 
        <Link to="/ads" style={{ margin: '0 10px', color: '#4CAF50', textDecoration: 'none' }}>Ads</Link> | 
        <Link to="/wallet" style={{ margin: '0 10px', color: '#4CAF50', textDecoration: 'none' }}>Wallet</Link>
      </nav>
      <button 
        onClick={handleConnect} 
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer', 
          marginTop: '10px' 
        }}
      >
        Connect Wallet
      </button>
      {tonConnectUI.connected && <p style={{ fontSize: '18px', color: '#666' }}>Connected: {tonConnectUI.account?.address}</p>}
    </div>
  );
};

export default Wallet;