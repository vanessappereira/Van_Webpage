/* =====================================================
   SLIDESHOW – SOURCE IMAGES (ALDEIAS)
===================================================== */

/* ---------- DADOS DO SLIDESHOW ---------- */
const IMAGE_SOURCES = {
    "Almeida": [
        { src: "../../pages/almeida/images/almeida1.jpg", alt: "Almeida Imagens" },
        { src: "../../pages/almeida/images/almeida2.jpg", alt: "Almeida Imagens" },
        { src: "../../pages/almeida/images/almeida3.jpg", alt: "Almeida Imagens" },
        { src: "../../pages/almeida/images/almeida4.jpg", alt: "Almeida Imagens" },
        { src: "../../pages/almeida/images/almeida5.jpg", alt: "Almeida Imagens" },
        { src: "../../pages/almeida/images/almeida6.jpg", alt: "Almeida Imagens" },
        { src: "../../pages/almeida/images/almeida7.jpg", alt: "Almeida Imagens" },
        { src: "../../pages/almeida/images/o-cacador.jpg", alt: "Almeida Imagens" }
    ],

    "Castelo Rodrigo": [
        { src: "../../pages/castelo_rodrigo/images/castelo_rodrigo1.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../../pages/castelo_rodrigo/images/castelo_rodrigo2.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../../pages/castelo_rodrigo/images/castelo_rodrigo3.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../../pages/castelo_rodrigo/images/castelo_rodrigo4.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../../pages/castelo_rodrigo/images/castelo_rodrigo5.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../../pages/castelo_rodrigo/images/castelo_rodrigo6.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../../pages/castelo_rodrigo/images/castelo_rodrigo7.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../../pages/castelo_rodrigo/images/castelo_rodrigo8.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../../pages/castelo_rodrigo/images/taverna-da-matilde.jpg", alt: "Castelo Rodrigo Imagens" }
    ],

    "Linhares da Beira": [
        { src: "../../pages/linhares_beira/images/linhares1.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../../pages/linhares_beira/images/linhares2.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../../pages/linhares_beira/images/linhares3.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../../pages/linhares_beira/images/linhares4.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../../pages/linhares_beira/images/linhares5.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../../pages/linhares_beira/images/linhares6.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../../pages/linhares_beira/images/linhares7.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../../pages/linhares_beira/images/linhares8.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../../pages/linhares_beira/images/linhares9.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../../pages/linhares_beira/images/Cova-da-Loba.jpg", alt: "Linhares da Beira Imagens" }
    ],

    "Marialva": [
        { src: "../../pages/marialva/images/marialva1.jpg", alt: "Marialva Imagens" },
        { src: "../../pages/marialva/images/marialva2.jpg", alt: "Marialva Imagens" },
        { src: "../../pages/marialva/images/marialva3.jpg", alt: "Marialva Imagens" },
        { src: "../../pages/marialva/images/marialva4.jpg", alt: "Marialva Imagens" },
        { src: "../../pages/marialva/images/marialva5.jpg", alt: "Marialva Imagens" },
        { src: "../../pages/marialva/images/marialva6.jpg", alt: "Marialva Imagens" },
        { src: "../../pages/marialva/images/marialva7.jpg", alt: "Marialva Imagens" },
        { src: "../../pages/marialva/images/marialva8.jpg", alt: "Marialva Imagens" },
        { src: "../../pages/marialva/images/marialva9.jpg", alt: "Marialva Imagens" },
        { src: "../../pages/marialva/images/PedeCabra.jpg", alt: "Marialva Imagens" }
    ],

    "Monsanto": [
        { src: "../../pages/monsanto/images/monsanto1.jpg", alt: "Monsanto Imagens" },
        { src: "../../pages/monsanto/images/monsanto2.jpg", alt: "Monsanto Imagens" },
        { src: "../../pages/monsanto/images/monsanto3.jpg", alt: "Monsanto Imagens" },
        { src: "../../pages/monsanto/images/monsanto4.jpg", alt: "Monsanto Imagens" },
        { src: "../../pages/monsanto/images/monsanto5.jpg", alt: "Monsanto Imagens" },
        { src: "../../pages/monsanto/images/monsanto6.jpg", alt: "Monsanto Imagens" },
        { src: "../../pages/monsanto/images/monsanto7.jpg", alt: "Monsanto Imagens" },
        { src: "../../pages/monsanto/images/monsanto8.jpg", alt: "Monsanto Imagens" },
        { src: "../../pages/monsanto/images/monsanto9.jpg", alt: "Monsanto Imagens" },
        { src: "../../pages/monsanto/images/CasadaVelhaFonte.jpg", alt: "Monsanto Imagens" }
    ]
};

/* =====================================================
   ESTADO
===================================================== */
let slideIndex = 1;
const SLIDE_INTERVAL = 5000;
let slides = [];

/* =====================================================
   DETETAR ALDEIA ATUAL
===================================================== */
const villageName = document.body.dataset.village;
const images = IMAGE_SOURCES[villageName];

if (!images) {
    console.warn("Aldeia sem imagens:", villageName);
}

/* =====================================================
   CRIAR SLIDES
===================================================== */
const slidesContainer = document.querySelector(".aldeiaSlides-container");

if (slidesContainer && images) {
    images.forEach(img => {
        const slide = document.createElement("div");
        slide.className = "aldeiaSlides";

        const image = document.createElement("img");
        image.src = img.src;
        image.alt = img.alt;

        slide.appendChild(image);
        slidesContainer.appendChild(slide);
    });

    slides = document.getElementsByClassName("aldeiaSlides");

    showSlides(slideIndex);
    setInterval(() => plusSlides(1), SLIDE_INTERVAL);
}

/* =====================================================
   CONTROLOS
===================================================== */
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    if (!slides.length) return;

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    Array.from(slides).forEach(slide => {
        slide.style.display = "none";
    });

    slides[slideIndex - 1].style.display = "block";
}

window.plusSlides = plusSlides;
