const renderApiUrl = " https://api-clima-tg9l.onrender.com";

async function buscarCidade() {
    const cidade = document.getElementById('cidade').value;

    try {
        const response = await fetch(`${renderApiUrl}?q=${encodeURIComponent(cidade)}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById('info').innerHTML = `<p style="color: red;">Erro: ${data.error.message}</p>`;
        } else {
            document.getElementById('info').innerHTML = `
                <h2>${data.location.name.toUpperCase()}</h2>
                <p>Temperatura: ${data.current.temp_c}°C</p>
                <p>Condição: ${data.current.condition.text}</p>
                <img src="${data.current.condition.icon}" alt="Ícone do tempo">
            `;
        }
    } catch (erro) {
        document.getElementById('info').innerHTML = `<p style="color: red;">Erro ao buscar os dados: ${erro.message}</p>`;
    }
}
