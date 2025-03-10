import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const HomeIsland = () => {
  const [points, setPoints] = useState(0);
  const [homeNation, setHomeNation] = useState('');
  const telegramId = 'mockUser123';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${telegramId}`);
        setPoints(response.data.points);
        setHomeNation(response.data.homeNation);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [telegramId]);

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/click', { telegramId });
      setPoints(response.data.points);
    } catch (error) {
      console.error('Error clicking:', error);
    }
  };

  const nationStyles = {
    Fiji: {
      backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/bg-1.jpg')",
      color: '#006400',
      nameIcon: '/fiji-name.png',
    },
    Samoa: {
      backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/bg-2.jpg')",
      color: '#8B4513',
      nameIcon: '/samoa-name.png',
    },
    Tonga: {
      backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/bg-3.jpg')",
      color: '#8A360F',
      nameIcon: '/tonga-name.png',
    },
  };

  const currentStyle = nationStyles[homeNation] || {
    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/bg-1.jpg')",
    color: '#333',
    nameIcon: null,
  };

  return (
    <div
      className={`home-island ${homeNation ? homeNation.toLowerCase() : ''}`}
      style={{
        backgroundImage: currentStyle.backgroundImage,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {currentStyle.nameIcon ? (
        <img
          src={currentStyle.nameIcon}
          alt={`${homeNation} name`}
          style={{ width: '200px', marginBottom: '20px' }}
          onError={() => console.error(`${homeNation} icon not found`)}
        />
      ) : (
        <p style={{ color: currentStyle.color }}>No icon for {homeNation}</p>
      )}
      <h1
        style={{
          fontFamily: "'Pacifico', cursive",
          color: currentStyle.color,
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
        }}
      >
        Welcome to {homeNation || 'Your Island'}
      </h1>
      <p
        style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: '24px',
          color: currentStyle.color,
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
        }}
      >
        Points: {points}
      </p>
      <button
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: currentStyle.color,
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: "'Roboto', sans-serif"
        }}
      >
        Click Me
      </button>
    </div>
  );
};

export default HomeIsland;