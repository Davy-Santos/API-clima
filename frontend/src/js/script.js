async function buscarCidade() {
    const cidade = document.getElementById("cidade").value;

   const baseURL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000/clima'
    : 'https://api-clima-k05f.onrender.com/clima';


    try {
        const response = await fetch(`${baseURL}?q=${cidade}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        const data = await response.json();

        const info = document.getElementById('info');
        info.innerHTML = `
            <h2>${data.location.name} - ${data.location.country}</h2>
            <p>Temperatura: ${data.current.temp_c}°C</p>
            <p>Condição: ${data.current.condition.text}</p>
            <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
            <p>Umidade: ${data.current.humidity}%</p>
            <p>Vento: ${data.current.wind_kph} km/h</p>
            <p>Horário local: ${data.location.localtime}</p>
            <p>Latitude: ${data.location.lat}</p>
            <p>Longitude: ${data.location.lon}</p>
            <p>Fuso horário: ${data.location.tz_id}</p>
            <p>Data de atualização: ${data.current.last_updated}</p>
            <p>Visibilidade: ${data.current.vis_km} km</p>
            <p>Pressão: ${data.current.pressure_mb} mb</p>
            <p>Grau de conforto: ${data.current.feelslike_c}°C</p>
        `;
    } catch (error) {
        console.error(error);
        document.getElementById('info').innerHTML = `<p style="color:red;">Erro ao buscar os dados da cidade.</p>`;
    }
}
