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

// Function to load section data
function loadSection(section, infoBox) {
    infoBox.innerHTML = `
      <h2>${section.titulo}</h2>
      ${section.conteudo ? `<p>${section.conteudo}</p>` : ''}
      ${section.experiencia ? `<p>${section.experiencia}</p>` : ''}
      ${section.trajetoria_profissional ? `<p>${section.trajetoria_profissional}</p>` : ''}
    `;

    const containerLanguages = document.createElement('div');
    containerLanguages.classList.add('container-languages');

    if (section.idiomas) {
        const idiomasSection = `
        <div>
          <h3 class="languages">Idiomas</h3>
          <ul>
            ${section.idiomas.map(idioma => `<li class="language-list">${idioma.lingua} - ${idioma.nivel}</li>`).join('')}
          </ul>
        </div>
      `;
        containerLanguages.innerHTML += idiomasSection;
    }

    if (section.linguagens) {
        const linguagensSection = `
        <div>
          <h3 class="languages">Linguagens de Programação</h3>
          <ul>
            ${section.linguagens.map(lingua => `<li class="language-list">${lingua.linguagem} - ${lingua.nivel}</li>`).join('')}
          </ul>
        </div>
      `;
        containerLanguages.innerHTML += linguagensSection;
    }

    infoBox.appendChild(containerLanguages);

    if (section.cursos) {
        const cursosSection = `
        <ul>
          ${section.cursos.map(curso => {
            const cursosList = Array.isArray(curso.curso) ? curso.curso.join('<br>') : curso.curso;
            return `
              <li class="about-list">
                <strong>${curso.instituicao}</strong> - ${curso.periodo}
                <p class="exp-info">${cursosList}</p>
              </li>
            `;
        }).join('')}
        </ul>
      `;
        infoBox.innerHTML += cursosSection;
    }

    if (section.experiencia_profissional) {
        const expSection = `
        <ul>
          ${section.experiencia_profissional.map(exp => {
            const funcoesList = exp.funcoes.map(funcao => `<li class="exp-info">${funcao}</li>`).join('');
            return `
              <li class="exp-pro">
                <strong>Empresa:</strong> ${exp.empresa}
                <strong>Cargo:</strong> ${exp.cargo}
                <strong>Período:</strong> ${exp.periodo}
                <strong>Funções desempenhadas:</strong>
                <ul>${funcoesList}</ul>
              </li>
            `;
        }).join('')}
        </ul>
      `;
        infoBox.innerHTML += expSection;
    }
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
                    item.classList.add('selected');
                }
            });
        }

        menuItems.forEach(item => {
            item.addEventListener('click', function () {
                menuItems.forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');

                const titulo = this.innerText.trim();
                const secao = data.perfil.find(sec => sec.titulo === titulo)
                    || data.formacao.find(sec => sec.titulo === titulo)
                    || data.experiencia_profissional.find(sec => sec.titulo === titulo);

                if (secao) {
                    loadSection(secao, infoBox);
                }
            });
        });
    } else {
        console.error('Failed to fetch data from MongoDB');
    }
});