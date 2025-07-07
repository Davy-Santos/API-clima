require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = process.env.CHAVE_API;

app.get('/clima', async (req, res) => {
    const cidade = req.query.q;

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cidade}&lang=pt`);
        const data = await response.json();
        res.json(data);
    } catch (erro) {
        res.status(500).json({ error: 'Erro ao buscar dados da API' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
