import React, { useState, useEffect } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import axios from 'axios';

const Wallet = () => {
  const [points, setPoints] = useState(0);
  const [nation, setNation] = useState('');
  const telegramId = 'mockUser123';

  useEffect(() => {
    axios.get(`http://localhost:5000/user/${telegramId}`).then((res) => {
      setPoints(res.data.points);
      setNation(res.data.homeNation);
    });
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Wallet - {nation || 'No Nation Selected'}</h1>
      <p>Points: {points}</p>
      <TonConnectButton />
      <p><a href="https://your-site.com/whitepaper.pdf">Read Whitepaper</a></p>
      <a href="/home">Back to Home</a>
    </div>
  );
};

export default Wallet;