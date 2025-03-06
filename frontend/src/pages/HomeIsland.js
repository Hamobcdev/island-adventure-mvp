import './styles.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomeIsland = () => {
  const [points, setPoints] = useState(0);
  const telegramId = 'mockUser123';

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(`https://island-adventure-mvp.onrender.com/user/${telegramId}`);
        console.log('Fetched points:', response.data.points);
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
      console.log('Click response:', response.data.points);
      setPoints(response.data.points);
    } catch (error) {
      console.error('Error clicking:', error.message, error.response ? error.response.data : '');
      alert('Failed to update points. Check console for details.');
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
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Welcome to Your Island!</h1>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/home" style={{ margin: '0 10px', color: '#4CAF50', textDecoration: 'none' }}>Home</Link> | 
        <Link to="/ads" style={{ margin: '0 10px', color: '#4CAF50', textDecoration: 'none' }}>Ads</Link> | 
        <Link to="/wallet" style={{ margin: '0 10px', color: '#4CAF50', textDecoration: 'none' }}>Wallet</Link>
      </nav>
      <p style={{ fontSize: '18px', color: '#666' }}>Points: {points}</p>
      <button 
        onClick={handleClick} 
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
        Tap for 5 Points
      </button>
    </div>
  );
};

export default HomeIsland;