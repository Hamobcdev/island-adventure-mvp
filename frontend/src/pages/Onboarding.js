import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles.css'; // Assuming this exists

const Onboarding = () => {
  const [nation, setNation] = useState('');
  const navigate = useNavigate();
  const telegramId = 'mockUser123'; // Replace with real Telegram ID logic later
  const nations = ['Fiji', 'Samoa', 'Tonga'];

  const handleSelect = async () => {
    try {
      const response = await axios.post('http://localhost:5000/setNation', {
        telegramId,
        homeNation: nation,
      });
      console.log('API Response:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Error setting nation:', error.message, error.response ? error.response.data : '');
      alert('Failed to start adventure. Check console for details.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Aloha! Pick Your Island</h1>
      <select
        onChange={(e) => setNation(e.target.value)}
        value={nation}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '20px', borderRadius: '5px' }}
      >
        <option value="">Select Nation</option>
        {nations.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      <br />
      <button
        onClick={handleSelect}
        disabled={!nation}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: nation ? '#4CAF50' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: nation ? 'pointer' : 'not-allowed',
        }}
      >
        Start Adventure
      </button>
    </div>
  );
};

export default Onboarding;