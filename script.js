const questions = [
    {
        question: "Qual é o resultado de '2' + 2 em JavaScript?",
        choices: ["22", "4", "Erro", "Indefinido"],
        correctAnswer: 0
    },
    {
        question: "Qual operador é utilizado para atribuir valor em JavaScript?",
        choices: ["=", "==", "===", "!="],
        correctAnswer: 0
    },
    {
        question: "Qual é a estrutura correta para declarar uma função em JavaScript?",
        choices: ["function myFunction()", "def myFunction()", "function: myFunction()", "fun myFunction()"],
        correctAnswer: 0
    },
    {
        question: "Como você declara uma variável em JavaScript?",
        choices: ["let", "var", "const", "Todas estão corretas"],
        correctAnswer: 3
    },
    {
        question: "Qual método adiciona um item ao final de um array em JavaScript?",
        choices: [".push()", ".add()", ".append()", ".insert()"],
        correctAnswer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answers = [];

function startQuiz() {
    document.getElementById("welcome-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    const questionElement = document.getElementById("question-container");
    questionElement.innerHTML = `
        <p>${questions[currentQuestionIndex].question}</p>
        ${questions[currentQuestionIndex].choices.map((choice, index) => `
            <label>
                <input type="radio" name="choice" value="${index}">
                ${choice}
            </label>
        `).join("")}
    `;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="choice"]:checked');
    if (!selectedOption) {
        alert("Escolha uma resposta antes de prosseguir.");
        return;
    }

    const answerIndex = parseInt(selectedOption.value);
    answers.push(answerIndex);

    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("next-button").style.display = "none";
        document.getElementById("finish-button").style.display = "block";
    }
}

function finishQuiz() {
    document.getElementById("quiz-container").innerHTML = `
        <h2>Sua nota: ${score}/${questions.length}</h2>
        <button onclick="showAnswers()">Mostrar Gabarito</button>
    `;
}

function showAnswers() {
    document.getElementById("quiz-container").innerHTML = `
        <h2>Gabarito</h2>
        <div class="answers-grid">
            ${questions.map((q, index) => `
                <div class="answer-item">
                    <p><strong>Questão ${index + 1}:</strong> ${q.question}</p>
                    <p>Sua resposta: ${q.choices[answers[index]]}</p>
                    <p>Resposta correta: ${q.choices[q.correctAnswer]}</p>
                </div>
            `).join("")}
        </div>
    `;
}
