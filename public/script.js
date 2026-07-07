const generateBtn = document.getElementById("generateBtn");
const notesInput = document.getElementById("notesInput");
const loading = document.getElementById("loading");
const quizContainer = document.getElementById("quizContainer");

let currentQuiz = [];
let userAnswers = [];

generateBtn.addEventListener("click", async () => {
  const content = notesInput.value.trim();
  const numQuestions = document.getElementById("numQuestions").value;

  if (!content) {
    alert("Please paste some notes or type a topic first!");
    return;
  }

  loading.classList.remove("hidden");
  quizContainer.innerHTML = "";
  generateBtn.disabled = true;

  try {
    const response = await fetch("http://localhost:5000/api/generate-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, numQuestions }),
    });

    if (!response.ok) throw new Error("Server error");

    const data = await response.json();
    currentQuiz = data.questions;
    userAnswers = new Array(currentQuiz.length).fill(null);

    renderQuiz();
  } catch (error) {
    console.error(error);
    quizContainer.innerHTML = `<p style="color:red; text-align:center;">Something went wrong generating your quiz. Please try again.</p>`;
  } finally {
    loading.classList.add("hidden");
    generateBtn.disabled = false;
  }
});

function renderQuiz() {
  quizContainer.innerHTML = "";

  currentQuiz.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "question-card";

    const questionText = document.createElement("div");
    questionText.className = "question-text";
    questionText.textContent = `${index + 1}. ${q.question}`;
    card.appendChild(questionText);

    q.options.forEach((option) => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.textContent = option;
      btn.addEventListener("click", () => selectAnswer(index, option, card));
      card.appendChild(btn);
    });

    quizContainer.appendChild(card);
  });

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit Quiz";
  submitBtn.style.marginTop = "20px";
  submitBtn.addEventListener("click", submitQuiz);
  quizContainer.appendChild(submitBtn);
}

function selectAnswer(questionIndex, selectedOption, card) {
  userAnswers[questionIndex] = selectedOption;

  const optionButtons = card.querySelectorAll(".option");
  optionButtons.forEach((btn) => {
    btn.classList.remove("selected");
    if (btn.textContent === selectedOption) {
      btn.classList.add("selected");
    }
  });
}

function submitQuiz() {
  let score = 0;
  const cards = quizContainer.querySelectorAll(".question-card");

  cards.forEach((card, index) => {
    const q = currentQuiz[index];
    const optionButtons = card.querySelectorAll(".option");
    const userAnswer = userAnswers[index];

    optionButtons.forEach((btn) => {
      btn.disabled = true;
      if (btn.textContent === q.correctAnswer) {
        btn.classList.add("correct");
      } else if (btn.textContent === userAnswer && userAnswer !== q.correctAnswer) {
        btn.classList.add("incorrect");
      }
    });

    if (userAnswer === q.correctAnswer) score++;

    const explanation = document.createElement("div");
    explanation.className = "explanation";
    explanation.textContent = `Explanation: ${q.explanation}`;
    card.appendChild(explanation);
  });

  const resultDiv = document.createElement("div");
  resultDiv.id = "resultSummary";
  resultDiv.textContent = `You scored ${score} out of ${currentQuiz.length}!`;
  quizContainer.appendChild(resultDiv);

  const submitBtn = quizContainer.querySelector("button:not(.option)");
  if (submitBtn && submitBtn.textContent === "Submit Quiz") {
    submitBtn.remove();
  }
}