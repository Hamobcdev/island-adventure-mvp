import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

const Onboarding = () => {
  const [selectedNation, setSelectedNation] = useState('');
  const [telegramId] = useState('mockUser123');

  const handleNationChange = (event) => {
    setSelectedNation(event.target.value);
  };

  const handleStartAdventure = async () => {
    if (selectedNation && telegramId) {
      try {
        await axios.post('http://localhost:5000/setNation', { telegramId, homeNation: selectedNation });
        window.location.href = '/home';
      } catch (error) {
        console.error('Error setting nation:', error);
      }
    }
  };

  return (
    <div
      className="onboarding"
      style={{
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/onboarding-bg-logo.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)',
      }}
    >
      <h1 style={{ fontFamily: "'Pacifico', cursive", fontSize: '36px' }}>
        Synergy Blockchain Pacific DAO Onboarding
      </h1>
      <p style={{ fontFamily: "'Roboto', sans-serif", marginBottom: '20px' }}>
        Welcome! Choose your island nation to begin your adventure.
      </p>
      <select value={selectedNation} onChange={handleNationChange} style={{ padding: '10px', marginBottom: '20px' }}>
        <option value="">Select Nation</option>
        <option value="Fiji">Fiji</option>
        <option value="Samoa">Samoa</option>
        <option value="Tonga">Tonga</option>
      </select>
      <button
        onClick={handleStartAdventure}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#40E0D0',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        Start Adventure
      </button>
      <div style={{ marginTop: '20px' }}>
        <a href="https://example.com/whitepaper" target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', marginRight: '15px' }}>
          Whitepaper
        </a>
        <a href="https://example.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF' }}>
          Terms of Use
        </a>
      </div>
      <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
        (Signup page coming soon - to be linked to database later)
      </p>
    </div>
  );
};

export default Onboarding;