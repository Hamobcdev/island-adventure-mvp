import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdsHut = () => {
  const [points, setPoints] = useState(0);
  const telegramId = 'mockUser123';

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(`https://island-adventure-mvp.onrender.com/user/${telegramId}`);
        setPoints(response.data.points);
      } catch (error) {
        console.error('Error fetching points:', error.message, error.response ? error.response.data : '');
        alert('Failed to load points. Check console for details.');
      }
    };
    fetchPoints();
  }, [telegramId]);

  const handleWatchAd = async () => {
    try {
      const response = await axios.post('https://island-adventure-mvp.onrender.com/watchAd', { telegramId });
      setPoints(response.data.points);
    } catch (error) {
      console.error('Error watching ad:', error.message, error.response ? error.response.data : '');
      alert('Failed to update points. Check console for details.');
    }
  };

  return (
    <div>
      <h1>Ads Hut</h1>
      <p>Points: {points}</p>
      <button onClick={handleWatchAd}>Watch Ad for 10 Points</button>
    </div>
  );
};

export default AdsHut;