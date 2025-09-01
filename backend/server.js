const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'https://davy-santos.github.io'],
  optionsSuccessStatus: 200
}));

// Servir a pasta frontend como estática (css e js)
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

// Rota da API
app.get('/clima', async (req, res) => {
  const cidade = req.query.q;
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados da API' });
  }
});

// Fallback SPA: index.html na raiz
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
