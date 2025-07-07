require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;
const API_KEY = process.env.CHAVE_API;

app.use(cors()); // Permite requisições do front-end

app.get('/clima', async (req, res) => {
    const cidade = req.query.q;

    try {
        const apiResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cidade}&lang=pt`);
        const data = await apiResponse.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar dados da API.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
