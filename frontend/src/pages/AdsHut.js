import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdsHut = () => {
  const [points, setPoints] = useState(0);
  const [nation, setNation] = useState(''); // Added to store homeNation
  const telegramId = 'mockUser123';

  useEffect(() => {
    axios.get(`https://island-adventure-mvp.onrender.com/setNation${telegramId}`).then((res) => {
      setPoints(res.data.points);
      setNation(res.data.homeNation); // Set homeNation from response
    });
  }, []);

  const handleWatchAd = async () => {
    const res = await axios.post('https://island-adventure-mvp.onrender.com/setNation/watchAd', { telegramId });
    setPoints(res.data.points);
    alert(`Ad watched in ${nation || 'your nation'}! +10 Points`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Ads Hut - {nation || 'No Nation Selected'}</h1>
      <p>Points: {points}</p>
      <button onClick={handleWatchAd}>Watch Ad</button>
      <br />
      <a href="/home">Back to Home</a>
    </div>
  );
};

export default AdsHut;