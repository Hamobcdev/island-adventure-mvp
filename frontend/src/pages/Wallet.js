import React, { useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import '../styles.css';

const Wallet = () => {
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(''); // Mock address for local dev

  useEffect(() => {
    setIsConnected(tonConnectUI.connected);
    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      setIsConnected(!!wallet);
      if (wallet) setWalletAddress(wallet.account?.address || 'mockAddress123');
    });
    return () => unsubscribe();
  }, [tonConnectUI]);

  const handleConnect = async () => {
    if (isConnected) {
      await tonConnectUI.disconnect();
      console.log('Wallet disconnected');
      setWalletAddress('');
    } else {
      try {
        // Mock connection locally if not deployed
        if (window.location.hostname === 'localhost') {
          setIsConnected(true);
          setWalletAddress('mockAddress123');
          console.log('Mock wallet connected locally');
        } else {
          await tonConnectUI.connectWallet();
          console.log('Wallet connected');
        }
      } catch (error) {
        console.error('Connection error:', error);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Wallet</h1>
      <button
        onClick={handleConnect}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: isConnected ? '#FF5733' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
      </button>
      {isConnected && (
        <p style={{ marginTop: '20px', color: '#333' }}>
          Wallet Address: {walletAddress}
        </p>
      )}
      {window.location.hostname === 'localhost' && !isConnected && (
        <p style={{ marginTop: '20px', color: '#666' }}>
          Local mock mode: Click "Connect Wallet" to simulate connection.
        </p>
      )}
    </div>
  );
};

export default Wallet;