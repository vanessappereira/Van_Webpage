async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Network response was not ok');
            return null;
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const data = await fetchData();
    if (data) {
        const menuItems = document.querySelectorAll('#menu li');
        const infoBox = document.getElementById('info');

        function loadSection(section) {
            infoBox.innerHTML = `<h2>${section.titulo}</h2>`;

            if (section.conteudo) {
                infoBox.innerHTML += `<p>${section.conteudo}</p>`;
            }

            if (section.experiencia) {
                infoBox.innerHTML += `<p>${section.experiencia}</p>`;
            }

            if (section.trajetoria_profissional) {
                infoBox.innerHTML += `<p>${section.trajetoria_profissional}</p>`;
            }

            const containerLanguages = document.createElement('div');
            containerLanguages.classList.add('container-languages');

            if (section.idiomas) {
                const idiomasSection = `<div><h3 class="languages">Idiomas</h3><ul>` +
                    section.idiomas.map(idioma => `<li class="language-list">${idioma.lingua} - ${idioma.nivel}</li>`).join('') +
                    `</ul></div>`;
                containerLanguages.innerHTML += idiomasSection;
            }

            if (section.linguagens) {
                const linguagensSection = `<div><h3 class="languages">Linguagens de Programação</h3><ul>` +
                    section.linguagens.map(lingua => `<li class="language-list">${lingua.linguagem} - ${lingua.nivel}</li>`).join('') +
                    `</ul></div>`;
                containerLanguages.innerHTML += linguagensSection;
            }

            infoBox.appendChild(containerLanguages);

            if (section.cursos) {
                let cursosSection = `<ul>`;
                section.cursos.forEach(curso => {
                    cursosSection += `<li class="about-list"><strong>${curso.instituicao}</strong> - ${curso.periodo}<p class="exp-info">`;
                    if (Array.isArray(curso.curso)) {
                        curso.curso.forEach(cursoNome => {
                            cursosSection += `${cursoNome}<br>`;
                        });
                    } else {
                        cursosSection += `${curso.curso}`;
                    }
                    cursosSection += `</p></li>`;
                });
                cursosSection += `</ul>`;
                infoBox.innerHTML += cursosSection;
            }

            if (section.experiencia_profissional) {
                let expSection = `<ul>`;
                section.experiencia_profissional.forEach(exp => {
                    expSection += `
                        <li class="exp-pro"><strong>Empresa:</strong> ${exp.empresa}</li>
                        <li class="exp-pro"><strong>Cargo:</strong> ${exp.cargo}</li>
                        <li class="exp-pro"><strong>Período:</strong> ${exp.periodo}</li>
                        <li class="exp-pro"><strong>Funções desempenhadas:</strong> <ul>`;
                    exp.funcoes.forEach(funcao => {
                        expSection += `<li class="exp-info">${funcao}</li>`;
                    });
                    expSection += `</ul></li>`;
                });
                expSection += `</ul>`;
                infoBox.innerHTML += expSection;
            }
        }

        // Menu "Sobre Mim" as default section
        const defaultSection = data.perfil.find(sec => sec.titulo === "Sobre Mim");
        if (defaultSection) {
            loadSection(defaultSection);
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
                    loadSection(secao);
                }
            });
        });
    } else {
        console.error('Failed to fetch data from MongoDB');
    }
});
