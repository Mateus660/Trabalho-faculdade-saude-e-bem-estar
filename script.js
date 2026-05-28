const questions = [
    {
        question: "Quantos litros de água é recomendado beber por dia?",
        answers: [
            { text: "1 litro", correct: false },
            { text: "2 litros", correct: true },
            { text: "5 litros", correct: false },
            { text: "500 ml", correct: false }
        ]
    },
    {
        question: "Qual atividade ajuda na saúde cardiovascular?",
        answers: [
            { text: "Caminhada", correct: true },
            { text: "Dormir o dia todo", correct: false },
            { text: "Ficar sentado", correct: false },
            { text: "Comer fast food", correct: false }
        ]
    },
    {
        question: "Qual alimento é rico em vitaminas?",
        answers: [
            { text: "Frutas", correct: true },
            { text: "Refrigerante", correct: false },
            { text: "Salgadinho", correct: false },
            { text: "Doces", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answersButtons = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score");
const quizContainer = document.getElementById("quiz-container");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
        answersButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";

    while (answersButtons.firstChild) {
        answersButtons.removeChild(answersButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    Array.from(answersButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showResult() {
    quizContainer.classList.add("hide");
    resultContainer.classList.remove("hide");

    scoreText.innerHTML = `Você acertou ${score} de ${questions.length} perguntas! 🎉`;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function restartQuiz() {
    resultContainer.classList.add("hide");
    quizContainer.classList.remove("hide");
    startQuiz();
}

startQuiz();
