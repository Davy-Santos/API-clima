# TestAPI

Este é um projeto full stack simples composto por um **backend em Node.js/Express** e um **frontend estático**, com o objetivo de demonstrar o consumo de APIs externas e o uso do CORS para integração com uma aplicação hospedada no GitHub Pages.

============================================

## 🗂 Estrutura do Projeto

testAPI/
├── backend/ # Servidor Express
│ ├── server.js # Código principal do backend
│ ├── package.json # Dependências e scripts
│ ├── .env # Variáveis de ambiente
│ └── ...
└── frontend/
└── src/
├── css/
│ ├── reset.css
│ └── style.css
└── js/
└── script.js

============================================

## 🚀 Funcionalidades

- Servidor Express com suporte a CORS
- Integração com APIs externas via `node-fetch`
- Servidor de arquivos estáticos
- Separação entre frontend e backend
- Suporte a variáveis de ambiente com `dotenv`

============================================

## ⚙️ Como Executar Localmente

### 1. Backend

terminal bash
cd backend
npm install
npm start
Certifique-se de ter o arquivo .env com a variável PORT (opcional) e outras que sua lógica possa exigir.

###2. Frontend

O frontend estático pode ser hospedado separadamente (como no GitHub Pages) ou servir localmente com alguma ferramenta como Live Server, ou integrado via GitHub Actions.

🌐 CORS
O backend está configurado para permitir requisições apenas do domínio:

https://davy-santos.github.io
Para mudar isso, edite o bloco:

"const corsOptions = {
  origin: 'https://davy-santos.github.io',
  optionsSuccessStatus: 200
};"

📦 Dependências Principais
-express
-cors
-dotenv
-node-fetch

📁 Deploy
-Frontend: recomendado via GitHub Pages.
-Backend: pode ser hospedado no Render, Railway, ou Vercel com suporte a Node.js.

🧑‍💻 Autor
Davy Santos

