const questions = [
  {
    question: "Which language adds interactivity to web pages?",
    choices: ["HTML", "CSS", "JavaScript", "SQL"],
    correct: 2
  },
  {
    question: "What does DOM stand for?",
    choices: [
      "Document Object Model",
      "Data Object Method",
      "Display Output Mode",
      "Digital Orientation Map"
    ],
    correct: 0
  },
  {
    question: "Which method attaches an event handler to an element?",
    choices: [
      "addEventListener()",
      "appendChild()",
      "querySelector()",
      "setAttribute()"
    ],
    correct: 0
  },
  {
    question: "Which keyword declares a variable that cannot be reassigned?",
    choices: ["var", "let", "const", "static"],
    correct: 2
  }
];

const questionEl = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 0;
let score = 0;

function loadQuestion() {
  const current = questions[currentIndex];
  questionEl.textContent = current.question;
  feedbackEl.textContent = "";
  nextBtn.disabled = true;

  answerButtons.forEach((button, i) => {
    button.textContent = current.choices[i];
    button.disabled = false;
    button.classList.remove("correct", "incorrect");
  });
}

function handleAnswer(event) {
  const selectedIndex = Array.from(answerButtons).indexOf(event.target);
  const correctIndex = questions[currentIndex].correct;

  if (selectedIndex === correctIndex) {
    feedbackEl.textContent = "Correct!";
    event.target.classList.add("correct");
    score++;
  } else {
    feedbackEl.textContent = "Incorrect. The correct answer is: " +
      questions[currentIndex].choices[correctIndex];
    event.target.classList.add("incorrect");
    answerButtons[correctIndex].classList.add("correct");
  }

  answerButtons.forEach((button) => (button.disabled = true));
  nextBtn.disabled = false;
}

function handleNext() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "Quiz complete!";
    feedbackEl.textContent = "You scored " + score + " out of " + questions.length + ".";
    answerButtons.forEach((button) => (button.style.display = "none"));
    nextBtn.style.display = "none";
  }
}

answerButtons.forEach((button) => button.addEventListener("click", handleAnswer));
nextBtn.addEventListener("click", handleNext);

loadQuestion();
