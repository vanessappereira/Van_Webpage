/* =====================================================
   CONTROLO DAS SECÇÕES DAS ALDEIAS
   (Sobre | História | Infos | Galeria)
===================================================== */

/*
  Lista de todas as secções possíveis.
  IMPORTANTE: os IDs aqui têm de existir no HTML
*/
const sections = [
    'aboutVillage',
    'villageHistory',
    'villageInfo',
    'villageGallery'
];

/*
  Esconde todas as secções
*/
function hideAllSections() {
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none';
        }
    });
}
function clearActiveButtons() {
    const buttons = document.querySelectorAll('.village-buttons .button');
    buttons.forEach(btn => btn.classList.remove('active'));
}

/*
  Mostra apenas a secção pedida
*/
function showSection(sectionId, event) {
    if (event) event.preventDefault();

    hideAllSections();

    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }

    if (event) {
        clearActiveButtons();
        event.currentTarget.classList.add('active');
    }
}

/* =====================================================
   FUNÇÕES USADAS NO HTML
===================================================== */

function showAbout(event) {
    showSection('aboutVillage', event);
}

function showHistory(event) {
    showSection('villageHistory', event);
}

function showInfo(event) {
    showSection('villageInfo', event);
}

function showGallery(event) {
    showSection('villageGallery', event);
}

window.showAbout = showAbout;
window.showHistory = showHistory;
window.showInfo = showInfo;
window.showGallery = showGallery;

/* =====================================================
   SECÇÃO DEFAULT AO ABRIR A PÁGINA
===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    hideAllSections();
    showSection('aboutVillage').classList.add('active');
});

