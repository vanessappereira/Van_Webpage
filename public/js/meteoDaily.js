async function getImagemPrecipitacao(precipitaProb) {
  const doublePrecipitacao = parseFloat(precipitaProb);
  console.log(doublePrecipitacao);

  if (doublePrecipitacao === 0) {
    return "sol.png";
  } else if (doublePrecipitacao <= 30) {
    return "nublado.png";
  } else if (doublePrecipitacao <= 70) {
    return "aguaceiros.png";
  } else {
    return "chuva.png";
  }
}
async function generateWeatherHTML(weatherData, districtName) {
  let meteoHTML = '<table class="table">';
  for (const item of weatherData) {
    const imageSrc = await getImagemPrecipitacao(item.precipitaProb);
    meteoHTML += `
      <tr>
        <td><img src="/public/images/${imageSrc}" height="45" alt="Weather Image"></td>
        <td>Min Temperature:<br>${item.tMin}°C</td>
        <td>Max Temperature:<br>${item.tMax}°C</td>
      </tr>`;
  }
  meteoHTML += "</table>";
  return `<h5 style="font-weight: bolder;">Distrito de ${districtName}</h5>${meteoHTML}`;
}

async function fetchDistrictData() {
  const url = "https://api.ipma.pt/open-data/distrits-islands.json";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const dataAPI = await response.json();
  return dataAPI.data;
}
async function fetchWeatherData(globalIdLocal) {
  const forecastToday=0; //0 - Today; 1 - Tomorrow; 2 - After Tomorrow
  const dailyUrl = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/hp-daily-forecast-day${forecastToday}.json`;
  const response = await fetch(dailyUrl);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const dataAPI = await response.json();
  // Filter the weather data for the specific globalIdLocal
  return dataAPI.data.filter((item) => item.globalIdLocal === globalIdLocal);
}
async function obterMeteoDiaria() {
  try {
    const dataLocalDistrict = await fetchDistrictData();
    const districtIDs = {};
    const districtNames = {};

    dataLocalDistrict.forEach((district) => {
      if (district.local === "Guarda") {
        districtIDs.guarda = district.globalIdLocal;
        districtNames.guarda = district.local;
      } else if (district.local === "Castelo Branco") {
        districtIDs.casteloBranco = district.globalIdLocal;
        districtNames.casteloBranco = district.local;
      }else if (district.local === "Lisboa") {
        districtIDs.lisboa = district.globalIdLocal;
        districtNames.lisboa = district.local;
      }
    });
    console.log("Guarda global ID: " + districtIDs.guarda);
    console.log("Castelo Branco global ID: " + districtIDs.casteloBranco);
    console.log("Lisboa global ID: " + districtIDs.lisboa);

    // Fetch weather data for Guarda
    const weatherDataGuarda = await fetchWeatherData(districtIDs.guarda);
    const weatherHTMLGuarda = await generateWeatherHTML(weatherDataGuarda, districtNames.guarda);

    // Fetch weather data for Castelo Branco
    const weatherDataCasteloBranco = await fetchWeatherData(districtIDs.casteloBranco);
    const weatherHTMLCasteloBranco = await generateWeatherHTML(weatherDataCasteloBranco, districtNames.casteloBranco);

    // Fetch weather data for Lisboa
    const weatherDataLisboa = await fetchWeatherData(districtIDs.lisboa);
    const weatherHTMLLisboa = await generateWeatherHTML(weatherDataLisboa, districtNames.lisboa);

    // Display the weather data for both districts
    document.getElementById("weatherDisplay").innerHTML += weatherHTMLGuarda;
    document.getElementById("weatherDisplay").innerHTML += weatherHTMLCasteloBranco;
    document.getElementById("weatherDisplay").innerHTML += weatherHTMLLisboa;


  } catch (error) {
    console.error(error);
    document.getElementById("weatherDisplay").innerHTML +=
      '<p class="text-danger">Erro a encontrar meteorologia!</p>';
  }
}

window.onload = obterMeteoDiaria;
