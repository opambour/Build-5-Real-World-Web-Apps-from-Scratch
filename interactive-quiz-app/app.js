// 1. Define the Quiz Questions Data
const questions = [
  {
    question: "Which keyword is used to declare a constant variable in modern JavaScript?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "constant", correct: false }
    ]
  },
  {
    question: "What symbol is used for strict equality comparison (checking both value and type)?",
    answers: [
      { text: "==", correct: false },
      { text: "===", correct: true },
      { text: "=", correct: false },
      { text: "!=", correct: false }
    ]
  },
  {
    question: "Which built-in method converts a JavaScript object into a JSON string?",
    answers: [
      { text: "JSON.parse()", correct: false },
      { text: "JSON.stringify()", correct: true },
      { text: "JSON.convert()", correct: false },
      { text: "JSON.toText()", correct: false }
    ]
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Data Object Model", correct: false },
      { text: "Document Object Model", correct: true },
      { text: "Digital Ordinance Machine", correct: false },
      { text: "Desktop Oriented Method", correct: false }
    ]
  }
];

// 2. Select DOM Elements & Initialize State Variables
const questionText = document.querySelector('#question-text');
const answerButtons = document.querySelector('#answer-buttons');
const nextButton = document.querySelector('#next-btn');

let currentQuestionIndex = 0;
let score = 0;

// 3. Start Quiz Function
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add('hide');
  showQuestion();
}

// 4. Display Current Question and Options
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

// 5. Reset State Between Questions
function resetState() {
  nextButton.classList.add('hide');
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// 6. Handle User Selection
function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === 'true';

  // Highlight correct and incorrect answers
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    } else {
      button.classList.add('incorrect');
    }
    button.disabled = true; // Disable all buttons after choice
  });

  if (isCorrect) {
    score++;
  }

  // Show next button or finish quiz
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    nextButton.textContent = `Quiz Finished! Score: ${score}/${questions.length} (Restart)`;
    nextButton.classList.remove('hide');
  }
}

// 7. Event Listener for Next Button
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    startQuiz(); // Restart if finished
  }
});

// Run quiz on page load
startQuiz();