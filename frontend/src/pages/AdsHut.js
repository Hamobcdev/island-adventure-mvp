import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

const AdsHut = () => {
  const [points, setPoints] = useState(0);
  const telegramId = 'mockUser123';
  const backgrounds = [
    '/ads-bg-1.avif', // Beach bar
    '/ads-bg-2.avif', // Pirate ship
    '/ads-bg-3.jpg',  // Beach hut bungalow
    '/ads-bg-4.jpg',  // Sea beach landscape
  ];
  const [currentBg, setCurrentBg] = useState(backgrounds[0]);

  const handleWatchAd = async () => {
    try {
      const response = await axios.post('http://localhost:5000/watchAd', { telegramId });
      setPoints(response.data.points);
      setCurrentBg(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
    } catch (error) {
      console.error('Error watching ad:', error);
    }
  };

  return (
    <div
      className="ads-hut"
      style={{
        backgroundImage: `url(${currentBg})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1
        style={{
          fontFamily: "'Pacifico', cursive",
          color: '#FFFFFF',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        }}
      >
        Ads Hut
      </h1>
      <p
        style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: '24px',
          color: '#FFFFFF',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        }}
      >
        Points: {points}
      </p>
      <button
        onClick={handleWatchAd}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#FF6347', // Tomato red
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontFamily: "'Pacifico', cursive",
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
        onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
      >
        Watch Ads
      </button>
      <button
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#32CD32', // Lime green
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontFamily: "'Pacifico', cursive",
          marginTop: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
        onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
      >
        Get Points
      </button>
    </div>
  );
};

export default AdsHut;