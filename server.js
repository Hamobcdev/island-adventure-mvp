const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = [
  'https://island-adventure-p464zfreg-synergy-blockchain-pacific.vercel.app', // Production
  'http://localhost:3000', // Local development
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
app.use(express.json());

let users = {};

app.post('/click', (req, res) => {
  const { telegramId } = req.body;
  users[telegramId] = users[telegramId] || { homeNation: '', points: 0 };
  users[telegramId].points += 5;
  res.json({ points: users[telegramId].points });
});

app.post('/watchAd', (req, res) => {
  const { telegramId } = req.body;
  users[telegramId] = users[telegramId] || { homeNation: '', points: 0 };
  users[telegramId].points += 10;
  res.json({ points: users[telegramId].points });
});

app.get('/user/:telegramId', (req, res) => {
  const { telegramId } = req.params;
  const user = users[telegramId] || { homeNation: '', points: 0 };
  res.json(user);
});

app.post('/setNation', (req, res) => {
  const { telegramId, homeNation } = req.body;
  if (!telegramId || !homeNation) {
    return res.status(400).json({ error: 'telegramId and homeNation are required' });
  }
  users[telegramId] = users[telegramId] || { homeNation: '', points: 0 };
  users[telegramId].homeNation = homeNation;
  res.json({ homeNation: users[telegramId].homeNation, points: users[telegramId].points });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
