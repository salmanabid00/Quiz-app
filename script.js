const questions = [
    {
        question: "Who is the founder of Pakistan?",
        answers: [
            { text: "Alama Iqbal", correct: false },
            { text: "Quaid Azam", correct: true },
            { text: "Liaqat Ali", correct: false },
            { text: "Fatima Jinnah", correct: false },
        ]
    },
    {
        question: "What is Imran Khan primarily known for?",
        answers: [
            { text: "Acting", correct: false },
            { text: "Cricket", correct: false },
            { text: "Politics", correct: true },
            { text: "Business", correct: false },
        ]
    },
    {
        question: "Which political party did Imran Khan found?",
        answers: [
            { text: "PPP", correct: false },
            { text: "MQM", correct: false },
            { text: "PTI", correct: true },
            { text: "Others", correct: false },
        ]
    },
    {
        question: "In which city was Imran Khan born?",
        answers: [
            { text: "Lahore", correct: false },
            { text: "Karachi", correct: false },
            { text: "Rawalpindi", correct: true },
            { text: "Islamabad", correct: false },
        ]
    }
    
];

let questionsElement = document.querySelector("#questions");
let answerButtons = document.querySelector("#answer-buttons");
let nextBtn = document.querySelector("#next-btn");
let resultsElement = document.getElementById("results");
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    nextBtn.style.display = "block";
    resultsElement.innerHTML = "";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionsElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        score++;
        correctAnswers++;
    } else {
        wrongAnswers++;
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showResults() {
    resultsElement.innerHTML = `
        <h2>Results</h2>
        <p>Correct Answers: ${correctAnswers}</p>
        <p>Wrong Answers: ${wrongAnswers}</p>
    `;
    nextBtn.innerHTML = "Play Again";
    nextBtn.addEventListener("click", startQuiz);
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
        nextBtn.style.display = "none";
    }
});

startQuiz();


