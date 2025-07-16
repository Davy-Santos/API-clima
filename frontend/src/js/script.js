async function buscarCidade(){
    let cidade = document.getElementById("cidade").value;
    const response = await fetch(`/clima?q=${cidade}`);
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
}
