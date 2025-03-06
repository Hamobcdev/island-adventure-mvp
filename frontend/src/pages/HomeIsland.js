import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeIsland = () => {
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

  const handleClick = async () => {
    try {
      const response = await axios.post('https://island-adventure-mvp.onrender.com/click', { telegramId });
      setPoints(response.data.points);
    } catch (error) {
      console.error('Error clicking:', error.message, error.response ? error.response.data : '');
      alert('Failed to update points. Check console for details.');
    }
  };

  return (
    <div>
      <h1>Welcome to Your Island!</h1>
      <p>Points: {points}</p>
      <button onClick={handleClick}>Tap for 5 Points</button>
    </div>
  );
};

export default HomeIsland;