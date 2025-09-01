require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS para desenvolvimento e produção
const allowedOrigins = [
  'http://127.0.0.1:5500', // Live Server local
  'http://localhost:5500',
  'https://davy-santos.github.io' // GitHub Pages
];

app.use(cors({
  origin: function(origin, callback){
    // permite requisições sem origem (ex: Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1){
      return callback(new Error('CORS não permitido para essa origem'), false);
    }
    return callback(null, true);
  }
}));

// Sua rota de API
app.get('/clima', async (req, res) => {
  const cidade = req.query.q;
  const apiKey = process.env.API_KEY;

  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados da API' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
