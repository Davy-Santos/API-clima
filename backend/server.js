require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Detecta se está em produção ou local
const isProduction = process.env.NODE_ENV === 'production';

// 🔹 Configuração de CORS
const allowedOrigins = isProduction
  ? ['https://davy-santos.github.io']          // produção
  : ['http://localhost:5500']; // teste local

app.use(cors({
  origin: function(origin, callback){
    // permite requisições sem origin (ex: Postman)
    if(!origin) return callback(null, true); 
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200
}));

// 🔹 Rota da API
app.get('/clima', async (req, res) => {
  const cidade = req.query.q;
  const apiKey = process.env.API_KEY;

  if (!cidade) {
    return res.status(400).json({ error: 'Parâmetro "q" (cidade) é obrigatório.' });
  }

  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados da API externa');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro ao buscar dados da API' });
  }
});

// 🔹 Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} (${isProduction ? 'produção' : 'desenvolvimento'})`);
});
