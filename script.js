const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Rome', correct: false }
        ]
    },
    {
        question: 'Which language runs in a web browser?',
        answers: [
            { text: 'Java', correct: false },
            { text: 'C', correct: false },
            { text: 'Python', correct: false },
            { text: 'JavaScript', correct: true }
        ]
    }
    // Add more questions as needed
];

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex, score;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hide');
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    resetState();
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(button, correct) {
    Array.from(answerButtonsElement.children).forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === button.innerText) {
            btn.style.backgroundColor = correct ? '#28a745' : '#dc3545';
        }
    });
    if (correct) score++;
    nextButton.classList.remove('hide');
}

function showScore() {
    questionContainerElement.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = `Your score: ${score}`;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showScore();
    }
});

restartButton.addEventListener('click', () => {
    questionContainerElement.classList.remove('hide');
    startGame();
});

startGame();
