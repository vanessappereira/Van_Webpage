/* =========================
   WEATHER ICONS
========================= */

function getImagemPrecipitacao(precipitaProb) {
  const valor = parseFloat(precipitaProb);

  if (valor === 0) return "sol.png";
  if (valor <= 30) return "nublado.png";
  if (valor <= 70) return "aguaceiros.png";
  return "chuva.png";
}

/* =========================
   HTML GENERATOR
========================= */

async function generateWeatherHTML(weatherData, districtName) {
  let html = `<h3 class="previsao-titulo">Distrito de ${districtName}</h3>`;

  for (const item of weatherData) {
    const imageSrc = await getImagemPrecipitacao(item.precipitaProb);

    html += `
      <div class="weather-row">
        <img src="images/weather/${imageSrc}" height="45" alt="Tempo">
        <div class="weather-text">
          <strong>Mín:</strong> ${item.tMin}°C<br>
          <strong>Máx:</strong> ${item.tMax}°C
        </div>
      </div>
    `;
  }

  return html;
}

/* =========================
   IPMA FETCHES
========================= */

async function fetchDistrictData() {
  const response = await fetch(
    "https://api.ipma.pt/open-data/distrits-islands.json"
  );

  if (!response.ok) {
    throw new Error("Erro a obter distritos IPMA");
  }

  const data = await response.json();
  return data.data;
}

async function fetchWeatherData(globalIdLocal) {
  const forecastToday = 0;
  const url = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/hp-daily-forecast-day${forecastToday}.json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro a obter previsão diária IPMA");
  }

  const data = await response.json();
  return data.data.filter(
    item => item.globalIdLocal === globalIdLocal
  );
}

/* =========================
   MAIN CONTROLLER
========================= */

async function obterMeteoDiaria(distritosPretendidos) {
  try {
    const districts = await fetchDistrictData();
    const weatherContainer = document.getElementById("weatherDisplay");

    weatherContainer.innerHTML = "";

    for (const distritoNome of distritosPretendidos) {
      const distrito = districts.find(
        d => d.local === distritoNome
      );

      if (!distrito) continue;

      const weatherData = await fetchWeatherData(distrito.globalIdLocal);
      const html = await generateWeatherHTML(weatherData, distrito.local);

      weatherContainer.innerHTML += html;
    }

  } catch (error) {
    console.error(error);
    document.getElementById("weatherDisplay").innerHTML =
      "<p>Erro a carregar meteorologia.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  obterMeteoDiaria(["Guarda", "Castelo Branco", "Lisboa"]);
});
