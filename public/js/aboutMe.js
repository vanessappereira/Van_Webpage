// Function to fetch data from API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}

// Helper function to create a list from an array
function createList(items, itemTemplate) {
  return items.map(itemTemplate).join('');
}

// Function to load languages section
function loadLanguages(section) {
  const containerLanguages = document.createElement('div');
  containerLanguages.classList.add('container-languages');

  if (section.idiomas) {
    containerLanguages.innerHTML += `
      <div>
        <h3 class="languages">Idiomas</h3>
        <ul>
          ${createList(section.idiomas, idioma => `<li class="language-list">${idioma.lingua} - ${idioma.nivel}</li>`)}
        </ul>
      </div>
    `;
  }

  if (section.linguagens) {
    containerLanguages.innerHTML += `
      <div>
        <h3 class="languages">Linguagens de Programação</h3>
        <ul>
          ${createList(section.linguagens, lingua => `<li class="language-list">${lingua.linguagem} - ${lingua.nivel}</li>`)}
        </ul>
      </div>
    `;
  }

  return containerLanguages;
}

// Function to load courses section
function loadCourses(section) {
  if (!section.cursos) return '';

  return `
    <ul>
      ${createList(section.cursos, curso => {
    const cursosList = Array.isArray(curso.curso) ? curso.curso.join('<br>') : curso.curso;
    return `
          <li class="about-list">
            <strong>${curso.instituicao}</strong> - ${curso.periodo}
            <p class="exp-info">${cursosList}</p>
          </li>
        `;
  })}
    </ul>
  `;
}

// Function to load professional experience section
function loadExperiences(section) {
  if (!section) return '';
  return `
    <ul>
      ${createList(section, exp => {
    const funcoesList = createList(exp.funcoes || [], funcao => `<li class="exp-info">${funcao}</li>`);
    return `
          <li class="exp-pro">
            <p><strong>Empresa:</strong> ${exp.empresa}</p>
            <p><strong>Cargo:</strong> ${exp.cargo}</p>
            <p><strong>Período:</strong> ${exp.periodo}</p>
            <p><strong>Funções desempenhadas:</strong></p>
            <ul>${funcoesList}</ul>
          </li>
        `;
  })}
    </ul>
  `;
}

// Function to load section data
async function loadSection(section, infoBox) {
  // Show loading message
  document.getElementById('loading-message').style.display = 'none';

  infoBox.innerHTML = `
    ${section.conteudo ? `<p>${section.conteudo}</p>` : ''}
    ${section.experiencia ? `<p>${section.experiencia}</p>` : ''}
    ${section.trajetoria_profissional ? `<p>${section.trajetoria_profissional}</p>` : ''}
  `;

  const containerLanguages = loadLanguages(section);
  infoBox.appendChild(containerLanguages);
  infoBox.innerHTML += loadCourses(section);
  infoBox.innerHTML += loadExperiences(section);
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', async function () {
  const url = 'https://vanwebpage.onrender.com/api/data';
  const data = await fetchData(url);
  if (data) {
    const menuItems = document.querySelectorAll('#menu li');
    const infoBox = document.getElementById('info');

    // Menu "Sobre Mim" as default section
    const defaultSection = data.perfil.find(sec => sec.titulo === "Sobre Mim");
    if (defaultSection) {
      loadSection(defaultSection, infoBox);
      menuItems.forEach(item => {
        if (item.innerText.trim() === "Sobre Mim") {
          item.classList.add('active');
        }
      });
    }

    menuItems.forEach(item => {
      item.addEventListener('click', async function () {
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        const titulo = this.innerText.trim();
        const seccao = data.perfil.find(sec => sec.titulo === titulo)
          || data.formacao.find(sec => sec.titulo === titulo)
          || data.experiencia_profissional;

        if (titulo === "Experiência Profissional") {
          const experiencias = data.experiencia_profissional;
          loadExperiences(experiencias);
        }

        if (seccao) {
          await loadSection(seccao, infoBox);
        }
      });
    });
  } else {
    console.error('Failed to fetch data from MongoDB');
  }
});