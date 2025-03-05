import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Onboarding = () => {
  const [nation, setNation] = useState('');
  const navigate = useNavigate();
  const nations = ['Fiji', 'Samoa', 'Tonga'];

  const handleSelect = async () => {
    const telegramId = 'mockUser123';
    await axios.post('https://island-adventure-mvp.onrender.com/setNation', { telegramId, homeNation: nation });
    navigate('/home');
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