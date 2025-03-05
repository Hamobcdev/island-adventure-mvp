const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
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
  users[telegramId] = users[telegramId] || { homeNation: '', points: 0 };
  users[telegramId].homeNation = homeNation;
  res.json({ homeNation: users[telegramId].homeNation, points: users[telegramId].points });
});

app.listen(5000, () => console.log('Backend updated'));
