/* =====================================================
   WEATHER ICONS
===================================================== */
function getImagemPrecipitacao(precipitaProb) {
  const valor = parseFloat(precipitaProb);

  if (valor === 0) return "sol.png";
  if (valor <= 30) return "nublado.png";
  if (valor <= 70) return "aguaceiros.png";
  return "chuva.png";
}

/* =====================================================
   FETCH METEOROLOGIA POR DISTRITO
===================================================== */
async function fetchMeteorologia(districtId, districtName) {
  const apiURL = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${districtId}.json`;
  const response = await fetch(apiURL);
  const dataForecast = await response.json();

  let meteoHTML = `<h4 class="previsao-titulo">Distrito de ${districtName}</h4>`;
  meteoHTML += `<table class="table">`;

  for (const item of dataForecast.data) {
    const imageSrc = getImagemPrecipitacao(item.precipitaProb);

    meteoHTML += `
            <tr>
                <td>Data:<br>${item.forecastDate}</td>
                <td><img src="../../images/weather/${imageSrc}" height="45" alt="Weather Image"></td>
                <td>Min Temperatura:<br>${item.tMin}°C</td>
                <td>Max Temperatura:<br>${item.tMax}°C</td>
            </tr>
        `;
  }

  meteoHTML += `</table>`;
  document.getElementById("previsao").innerHTML += meteoHTML;
}

/* =====================================================
   MAIN CONTROLLER
===================================================== */
async function obterPrevisao() {
  const url = "https://api.ipma.pt/open-data/distrits-islands.json";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const dataAPI = await response.json();
    const distritos = dataAPI.data;

    const titleId = document.getElementById("title").textContent;
    let forecast;

    /* Mapeamento das aldeias → distrito */
    const aldeiasGuarda = ["Almeida", "Castelo Rodrigo", "Linhares da Beira", "Marialva"];

    if (aldeiasGuarda.includes(titleId)) {
      forecast = distritos.find(d => d.local === "Guarda");
    } else if (titleId === "Monsanto") {
      forecast = distritos.find(d => d.local === "Castelo Branco");
    }

    if (forecast) {
      await fetchMeteorologia(forecast.globalIdLocal, forecast.local);
    } else {
      document.getElementById("previsao").innerHTML +=
        `<p class="text-danger">Local não encontrado.</p>`;
    }

  } catch (error) {
    console.error(error);
    document.getElementById("previsao").innerHTML +=
      `<p class="text-danger">Erro a encontrar meteorologia!</p>`;
  }
}

/* =====================================================
   INIT
===================================================== */
document.addEventListener("DOMContentLoaded", obterPrevisao);
