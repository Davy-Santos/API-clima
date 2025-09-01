// Mapa de tradução das condições
const condicoesPTBR = {
    "Clear": "Céu limpo",
    "Sunny": "Ensolarado",
    "Partly cloudy": "Parcialmente nublado",
    "Cloudy": "Nublado",
    "Overcast": "Céu encoberto",
    "Mist": "Neblina",
    "Patchy rain possible": "Possibilidade de chuva isolada",
    "Patchy snow possible": "Possibilidade de neve isolada",
    "Patchy sleet possible": "Possibilidade de granizo isolado",
    "Patchy freezing drizzle possible": "Possibilidade de garoa congelante isolada",
    "Thundery outbreaks possible": "Possibilidade de tempestade",
    "Blowing snow": "Neve soprando",
    "Blizzard": "Nevasca",
    "Fog": "Nevoeiro",
    "Freezing fog": "Nevoeiro congelante",
    "Patchy light drizzle": "Garoa leve isolada",
    "Light drizzle": "Garoa leve",
    "Freezing drizzle": "Garoa congelante",
    "Heavy freezing drizzle": "Garoa congelante intensa",
    "Patchy light rain": "Chuva leve isolada",
    "Light rain": "Chuva leve",
    "Moderate rain at times": "Chuva moderada em alguns momentos",
    "Moderate rain": "Chuva moderada",
    "Heavy rain at times": "Chuva forte em alguns momentos",
    "Heavy rain": "Chuva forte",
    "Light snow": "Neve leve",
    "Moderate snow": "Neve moderada",
    "Heavy snow": "Neve intensa",
    "Ice pellets": "Granizo",
    "Light rain shower": "Aguaceiro leve",
    "Moderate or heavy rain shower": "Aguaceiro moderado ou forte",
    "Torrential rain shower": "Aguaceiro torrencial",
    "Light sleet showers": "Granizo leve",
    "Moderate or heavy sleet showers": "Granizo moderado ou forte",
    "Light snow showers": "Nevasca leve",
    "Moderate or heavy snow showers": "Nevasca moderada ou forte",
    "Light showers of ice pellets": "Granizo leve isolado",
    "Moderate or heavy showers of ice pellets": "Granizo moderado ou forte isolado",
    "Patchy light rain with thunder": "Chuva leve isolada com trovões",
    "Moderate or heavy rain with thunder": "Chuva moderada ou forte com trovões",
    "Patchy light snow with thunder": "Neve leve isolada com trovões",
    "Moderate or heavy snow with thunder": "Neve moderada ou forte com trovões"
};

async function buscarCidade() {
    const cidade = document.getElementById("cidade").value;

    const baseURL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:3000/clima'
        : 'https://api-clima-k05f.onrender.com/clima';

    try {
        const response = await fetch(`${baseURL}?q=${cidade}`);
        if (!response.ok) throw new Error('Erro ao buscar dados da API');
        const data = await response.json();

        const info = document.getElementById('info');

        // Formatar data e hora local
        const localTime = new Date(data.location.localtime);
        const dia = String(localTime.getDate()).padStart(2, '0');
        const mes = String(localTime.getMonth() + 1).padStart(2, '0');
        const ano = localTime.getFullYear();
        const hora = String(localTime.getHours()).padStart(2, '0');
        const minutos = String(localTime.getMinutes()).padStart(2, '0');
        const localTimeFormat = `${dia}/${mes}/${ano} ${hora}:${minutos}`;

        // Traduzir condição
        const condicaoPT = condicoesPTBR[data.current.condition.text] || data.current.condition.text;

        info.innerHTML = `
            <h2>${data.location.name} - ${data.location.country}</h2>
            <p>Temperatura: ${data.current.temp_c}°C</p>
            <p>Condição: ${condicaoPT}</p>
            <img src="${data.current.condition.icon}" alt="${condicaoPT}">
            <p>Umidade: ${data.current.humidity}%</p>
            <p>Vento: ${data.current.wind_kph} km/h</p>
            <p>Horário local: ${localTimeFormat}</p>
            <p>Latitude: ${data.location.lat}</p>
            <p>Longitude: ${data.location.lon}</p>
            <p>Fuso horário: ${data.location.tz_id}</p>
            <p>Data de atualização: ${new Date(data.current.last_updated).toLocaleString('pt-BR')}</p>
            <p>Visibilidade: ${data.current.vis_km} km</p>
            <p>Pressão: ${data.current.pressure_mb} mb</p>
            <p>Grau de conforto: ${data.current.feelslike_c}°C</p>
        `;
    } catch (error) {
        console.error(error);
        document.getElementById('info').innerHTML = `<p style="color:red;">Erro ao buscar os dados da cidade.</p>`;
    }
}
