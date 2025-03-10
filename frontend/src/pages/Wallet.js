import React, { useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import '../styles.css';

const Wallet = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [motif] = useState('/motifs/maori-tattoo-border.jpg');

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
      setIsConnected(false);
    } else {
      try {
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

  const handleTransaction = async () => {
    if (window.location.hostname === 'localhost') {
      console.log('Mock transaction sent locally');
      return { success: true, message: 'Mock transaction completed' };
    } else if (isConnected) {
      try {
        const transaction = {
          validUntil: Math.floor(Date.now() / 1000) + 60,
          messages: [{ address: 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c', amount: '1000000' }],
        };
        const result = await tonConnectUI.sendTransaction(transaction);
        console.log('Transaction sent:', result);
        return result;
      } catch (error) {
        console.error('Transaction error:', error);
        throw error;
      }
    } else {
      throw new Error('Wallet not connected');
    }
  };

  return (
    <div
      className="wallet"
      style={{
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/bg-2.jpg')",
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={motif} alt="Maori Tattoo Border" style={{ width: '150px', marginBottom: '20px' }} />
      <h1 style={{ fontFamily: "'Pacifico', cursive", color: '#006400', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)' }}>
        Wallet
      </h1>
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
          marginBottom: '10px',
        }}
      >
        {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
      </button>
      {isConnected && (
        <div>
          <p style={{ color: '#006400', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)' }}>
            Wallet Address: {walletAddress}
          </p>
          <button
            onClick={handleTransaction}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Send Mock Transaction
          </button>
        </div>
      )}
      {window.location.hostname === 'localhost' && !isConnected && (
        <p style={{ color: '#666' }}>Local mock mode: Click "Connect Wallet" to simulate.</p>
      )}
    </div>
  );
};

export default Wallet;
