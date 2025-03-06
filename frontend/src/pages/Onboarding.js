import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Onboarding = () => {
  const [nation, setNation] = useState('');
  const navigate = useNavigate();
  const nations = ['Fiji', 'Samoa', 'Tonga'];

  const handleSelect = async () => {
    const telegramId = 'mockUser123';
    try {
      const response = await axios.post('https://island-adventure-mvp.onrender.com/setNation', { telegramId, homeNation: nation });
      console.log('API Response:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Error setting nation:', error.message, error.response ? error.response.data : '');
      alert('Failed to start adventure. Check console for details.');
    }
  };

  return (
    <div>
      <h1>Aloha! Pick Your Island</h1>
      <select onChange={(e) => setNation(e.target.value)} value={nation}>
        <option value="">Select Nation</option>
        {nations.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      <button onClick={handleSelect} disabled={!nation}>Start Adventure</button>
    </div>
  );
};

export default Onboarding;