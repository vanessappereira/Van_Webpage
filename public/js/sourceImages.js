const SLIDE_INTERVAL = 4000;
const IMAGE_SOURCES = {
    "Almeida": [
        { src: "../images/almeida/almeida1.jpg", alt: "Almeida Imagens" },
        { src: "../images/almeida/almeida2.jpg", alt: "Almeida Imagens" },
        { src: "../images/almeida/almeida3.jpg", alt: "Almeida Imagens" },
        { src: "../images/almeida/almeida4.jpg", alt: "Almeida Imagens" },
        { src: "../images/almeida/almeida5.jpg", alt: "Almeida Imagens" },
        { src: "../images/almeida/almeida6.jpg", alt: "Almeida Imagens" },
        { src: "../images/almeida/almeida7.jpg", alt: "Almeida Imagens" },
        { src: "../images/almeida/o-cacador.jpg", alt: "Almeida Imagens" }
    ],
    "Castelo Rodrigo": [
        { src: "../images/castelo rodrigo/castelo_rodrigo1.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../images/castelo rodrigo/castelo_rodrigo2.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../images/castelo rodrigo/castelo_rodrigo3.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../images/castelo rodrigo/castelo_rodrigo4.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../images/castelo rodrigo/castelo_rodrigo5.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../images/castelo rodrigo/castelo_rodrigo6.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../images/castelo rodrigo/castelo_rodrigo7.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../images/castelo rodrigo/castelo_rodrigo8.jpg", alt: "Castelo Rodrigo Imagens" },
        { src: "../images/castelo rodrigo/taverna-da-matilde.jpg", alt: "Castelo Rodrigo Imagens" }
    ],
    "Linhares da Beira": [
        { src: "../images/linhares da beira/linhares1.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../images/linhares da beira/linhares2.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../images/linhares da beira/linhares3.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../images/linhares da beira/linhares4.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../images/linhares da beira/linhares5.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../images/linhares da beira/linhares6.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../images/linhares da beira/linhares7.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../images/linhares da beira/linhares8.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../images/linhares da beira/linhares9.jpg", alt: "Linhares da Beira Imagens" },
        { src: "../images/linhares da beira/Cova-da-Loba.jpg", alt: "Linhares da Beira Imagens" }
    ],
    "Marialva": [
        { src: "../images/marialva/marialva1.jpg", alt: "Marialva Imagens" },
        { src: "../images/marialva/marialva2.jpg", alt: "Marialva Imagens" },
        { src: "../images/marialva/marialva3.jpg", alt: "Marialva Imagens" },
        { src: "../images/marialva/marialva4.jpg", alt: "Marialva Imagens" },
        { src: "../images/marialva/marialva5.jpg", alt: "Marialva Imagens" },
        { src: "../images/marialva/marialva6.jpg", alt: "Marialva Imagens" },
        { src: "../images/marialva/marialva7.jpg", alt: "Marialva Imagens" },
        { src: "../images/marialva/marialva8.jpg", alt: "Marialva Imagens" },
        { src: "../images/marialva/marialva9.jpg", alt: "Marialva Imagens" },
        { src: "../images/marialva/PedeCabra.jpg", alt: "Marialva Imagens"}
    ],
    "Monsanto": [
        { src: "../images/monsanto/monsanto1.jpg", alt: "Monsanto Imagens" },
        { src: "../images/monsanto/monsanto2.jpg", alt: "Monsanto Imagens" },
        { src: "../images/monsanto/monsanto3.jpg", alt: "Monsanto Imagens" },
        { src: "../images/monsanto/monsanto4.jpg", alt: "Monsanto Imagens" },
        { src: "../images/monsanto/monsanto5.jpg", alt: "Monsanto Imagens" },
        { src: "../images/monsanto/monsanto6.jpg", alt: "Monsanto Imagens" },
        { src: "../images/monsanto/monsanto7.jpg", alt: "Monsanto Imagens" },
        { src: "../images/monsanto/monsanto8.jpg", alt: "Monsanto Imagens" },
        { src: "../images/monsanto/monsanto9.jpg", alt: "Monsanto Imagens" },
        { src: "../images/monsanto/CasadaVelhaFonte.jpg", alt: "Monsanto Imagens"}
    ]
};
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("aldeiaSlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Automatic slide change
setInterval(function () {
    plusSlides(1); // Change to the next slide
}, SLIDE_INTERVAL); // Change slide every 4 seconds