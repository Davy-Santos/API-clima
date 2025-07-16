require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '..')));

// Configurar CORS apenas se quiser acessar de fora
// app.use(cors({ origin: 'https://seusite.com' }));

// Rota da API
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

// Rota fallback para SPA (opcional)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
