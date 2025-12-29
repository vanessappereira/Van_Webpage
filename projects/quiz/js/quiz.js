/* =====================================================
   QUIZ DATA (perguntas + resultados)
===================================================== */

import questions from "../data/questions.js";
import results from "../data/results.js";

/* =====================================================
   ELEMENTOS DO DOM
===================================================== */

const startSection = document.getElementById("quiz-start");
const questionsSection = document.getElementById("quiz-questions");
const resultSection = document.getElementById("quiz-result");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const progressNumber = document.getElementById("progress-number");

const resultImage = document.getElementById("result-image");
const resultName = document.getElementById("result-name");
const resultDescription = document.getElementById("result-description");

const resultBox = document.getElementById("result-box");
const shareBtn = document.getElementById("share-btn");

/* =====================================================
   ESTADO DO QUIZ
===================================================== */

let current = 0;
let scores = {};

/* =====================================================
   INICIAR QUIZ
===================================================== */

startBtn.addEventListener("click", () => {
    startSection.classList.remove("active");
    questionsSection.classList.add("active");
    loadQuestion();
});

/* =====================================================
   CARREGAR PERGUNTA
===================================================== */

function loadQuestion() {
    const q = questions[current];

    questionText.textContent = q.question;
    progressNumber.textContent = `Pergunta ${current + 1} de ${questions.length}`;

    answersContainer.innerHTML = "";

    q.answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.textContent = ans.text;

        btn.addEventListener("click", () => selectAnswer(ans.character));

        answersContainer.appendChild(btn);
    });
}

/* =====================================================
   SELECIONAR RESPOSTA
===================================================== */

function selectAnswer(character) {
    scores[character] = (scores[character] || 0) + 1;

    current++;

    if (current < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

/* =====================================================
   MOSTRAR RESULTADO
===================================================== */

function showResult() {
    questionsSection.classList.remove("active");
    resultSection.classList.add("active");

    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const r = results[winner];

    // Atualizar conteúdo
    resultImage.src = `images/${r.image}`;
    resultName.textContent = r.name;
    resultDescription.textContent = r.description;

    // Remover temas anteriores
    resultBox.className = "";
    resultBox.classList.add("result-theme");

    // Aplicar tema da personagem
    resultBox.classList.add(`result-${winner.toLowerCase()}`);
}


/* =====================================================
   REINICIAR QUIZ
===================================================== */

restartBtn.addEventListener("click", () => {
    current = 0;
    scores = {};

    resultSection.classList.remove("active");
    startSection.classList.add("active");
});

/* =====================================================
   PARTILHAR RESULTADO QUIZ
===================================================== */
shareBtn.addEventListener("click", async () => {
    const name = resultName.textContent;
    const description = resultDescription.textContent;

    const shareData = {
        title: "O meu resultado no Oddbods Quiz!",
        text: `Sou ${name}! ${description}`,
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log("Partilha cancelada");
        }
    } else {
        // fallback para browsers sem Web Share API
        navigator.clipboard.writeText(`${shareData.text} — ${shareData.url}`);
        alert("Link copiado para a área de transferência!");
    }
});
