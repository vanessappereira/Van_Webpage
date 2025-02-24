async function getImagemPrecipitacao(precipitaProb) {
  // Convert into double
  const doublePrecipitacao = parseFloat(precipitaProb);

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

async function fetchMeteorologia(districtId, districtName) {
  const apiURL = `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${districtId}.json`;
  const response = await fetch(apiURL);
  const dataForecast = await response.json();

  let meteoHTML = '<table class="table">';
  for (const item of dataForecast.data) {
    const imageSrc = await getImagemPrecipitacao(item.precipitaProb);

    meteoHTML += `
        <tr >
            <td>Data:<br>${item.forecastDate}</td>
            <td><img src="../public/images/${imageSrc}" height="45" alt="Weather Image"></td>
            <td>Min Temperatura:<br>${item.tMin}°C</td>
            <td>Max Temperatura:<br>${item.tMax}°C</td>
        </tr>`;
  }
  meteoHTML += "</table>";
  document.getElementById(
    "previsao"
  ).innerHTML += `<h5 class="active">Distrito de ${districtName}</h5>${meteoHTML}`;
}

async function obterPrevisao() {
  const url = "https://api.ipma.pt/open-data/distrits-islands.json";

  try {
    const response = await fetch(url);

    // Check if the response is okay (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const dataAPI = await response.json();
    const dataLocalDistrict = dataAPI.data;

    const titleId = document.getElementById("title").textContent;

    /* Almeida, Castelo Rodrigo, Linhares da Beira e Marialva pertencem ao distrito da Guarda;
     * Monsanto pertence ao distrito de Castelo Branco. */
    let forecast;

    if (
      ["Almeida", "Castelo Rodrigo", "Linhares da Beira", "Marialva "].includes(
        titleId
      )
    ) {
      forecast = dataLocalDistrict.find(
        (district) => district.local === "Guarda"
      );
    } else if (titleId === "Monsanto") {
      forecast = dataLocalDistrict.find(
        (district) => district.local === "Castelo Branco"
      );
    }

    if (forecast) {
      const selectedValue = forecast.local;
      const idValue = forecast.globalIdLocal;
      await fetchMeteorologia(idValue, selectedValue);
    } else {
      document.getElementById("previsao").innerHTML +=
        '<p class="text-danger">Local não encontrado.</p>';
    }
  } catch (error) {
    console.log(error);
    document.getElementById("previsao").innerHTML +=
      '<p class="text-danger">Erro a encontrar meteorologia!</p>';
  }
}
window.onload = obterPrevisao; // Fetch distritos no reload
