document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetch('public/data/cv.json').then(res => res.json());

  const tabs = document.querySelectorAll('.about-tab');
  const info = document.getElementById('info');

  renderSobreMim(data.perfil[0]);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const section = tab.textContent.trim();

      if (section === 'Sobre Mim') renderSobreMim(data.perfil[0]);
      if (section === 'Formação') renderFormacao(data.formacao);
      if (section === 'Experiência Profissional') renderExperiencia(data.experiencia_profissional);
      if (section === 'Competências') renderCompetencias(data.perfil[0]);
    });
  });

  /* ================= RENDERS ================= */

  function renderSobreMim(p) {
    info.innerHTML = `
            <p>${p.descricao}</p>
            <p>${p.experiencia}</p>
            <p>${p.trajetoria_profissional}</p>
        `;
  }

  function renderFormacao(list) {
    info.innerHTML = `
            <ul>
                ${list.map(f => `
                    <li>
                        <strong>${f.curso}</strong><br>
                        ${f.instituicao}
                    </li>
                `).join('')}
            </ul>
        `;
  }

  function renderExperiencia(list) {
    info.innerHTML = list.map(exp => `
            <div class="exp-item">
                <div class="exp-header">${exp.empresa}</div>
                <div class="exp-role">${exp.cargo}</div>
                <ul>
                    ${exp.funcoes.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
        `).join('');
  }

  function renderCompetencias(p) {
    info.innerHTML = `
            <div class="container-languages">
                <div>
                    <h3>Idiomas</h3>
                    <ul>
                        ${p.idiomas.map(i => `<li>${i.lingua} – ${i.nivel}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h3>Tecnologias</h3>
                    <ul>
                        ${p.linguagens.map(l => `<li>${l.linguagem} – ${l.nivel}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
  }
});
