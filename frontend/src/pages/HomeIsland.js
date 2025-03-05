import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeIsland = () => {
  const [points, setPoints] = useState(0);
  const [nation, setNation] = useState(''); // Added to store homeNation
  const telegramId = 'mockUser123';

  useEffect(() => {
    axios.get(`http://localhost:5000/user/${telegramId}`).then((res) => {
      setPoints(res.data.points);
      setNation(res.data.homeNation); // Set homeNation from response
    });
  }, []);

  const handleClick = async () => {
    const res = await axios.post('http://localhost:5000/click', { telegramId });
    setPoints(res.data.points);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Home Island - {nation || 'No Nation Selected'}</h1>
      <p>Points: {points}</p>
      <button onClick={handleClick}>Tap Coconut Tree</button>
      <br />
      <a href="/ads">Visit Ads Hut</a> | <a href="/wallet">Wallet</a>
    </div>
  );
};

export default HomeIsland;