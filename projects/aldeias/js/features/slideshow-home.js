/* =====================================================
   SLIDESHOW – SOURCE IMAGES (HOMEPAGE)
===================================================== */

/* ---------- DADOS DO SLIDESHOW ---------- */
const SLIDESHOW_DATA = [
  {
    title: "Almeida",
    text: "Fortaleza abaluartada e património militar único",
    link: "pages/almeida/index.html",
    image: "pages/almeida/images/o-cacador.jpg",
    alt: "Almeida – O Caçador"
  },
  {
    title: "Castelo Rodrigo",
    text: "Aldeia medieval com vista sobre o Douro",
    link: "pages/castelo_rodrigo/index.html",
    image: "pages/castelo_rodrigo/images/taverna-da-matilde.jpg",
    alt: "Castelo Rodrigo"
  },
  {
    title: "Linhares da Beira",
    text: "Castelo, tradição e paisagem serrana",
    link: "pages/linhares_beira/index.html",
    image: "pages/linhares_beira/images/Cova-da-Loba.jpg",
    alt: "Linhares da Beira"
  },
  {
    title: "Marialva",
    text: "Ruínas medievais e memória histórica",
    link: "pages/marialva/index.html",
    image: "pages/marialva/images/PedeCabra.jpg",
    alt: "Marialva"
  },
  {
    title: "Monsanto",
    text: "A aldeia mais portuguesa de Portugal",
    link: "pages/monsanto/index.html",
    image: "pages/monsanto/images/CasadaVelhaFonte.jpg",
    alt: "Monsanto"
  }
];

/* ---------- ESTADO ---------- */
let slideIndex = 1;
const SLIDE_INTERVAL = 5000;

/* =====================================================
   INICIALIZAÇÃO
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".slideshow-container");
  if (!container) return;

  /* Criar slides dinamicamente */
  SLIDESHOW_DATA.forEach(item => {
    const slide = document.createElement("div");
    slide.className = "aldeiaSlides";

    slide.innerHTML = `
            <div class="slideshow-caption">
                <h3>${item.title}</h3>
                <p>${item.text}</p>
            </div>

            <div class="slide-frame">
                <a href="${item.link}">
                    <img src="${item.image}" alt="${item.alt}">
                </a>
            </div>
        `;

    container.appendChild(slide);
  });

  /* Mostrar primeiro slide */
  showSlides(slideIndex);

  /* Auto-play */
  setInterval(() => plusSlides(1), SLIDE_INTERVAL);
});

/* =====================================================
   CONTROLOS
===================================================== */
window.plusSlides = function (n) {
  showSlides(slideIndex += n);
};

function showSlides(n) {
  const slides = document.getElementsByClassName("aldeiaSlides");
  if (!slides.length) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  Array.from(slides).forEach(slide => {
    slide.style.display = "none";
  });

  slides[slideIndex - 1].style.display = "block";
}
