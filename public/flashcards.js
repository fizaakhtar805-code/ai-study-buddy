const generateBtn = document.getElementById("generateBtn");
const notesInput = document.getElementById("notesInput");
const loading = document.getElementById("loading");
const flashcardContainer = document.getElementById("flashcardContainer");
const flipHint = document.getElementById("flipHint");

generateBtn.addEventListener("click", async () => {
  const content = notesInput.value.trim();
  const numCards = document.getElementById("numCards").value;

  if (!content) {
    alert("Please paste some notes or type a topic first!");
    return;
  }

  loading.classList.remove("hidden");
  flashcardContainer.innerHTML = "";
  flipHint.classList.add("hidden");
  generateBtn.disabled = true;

  try {
    const response = await fetch("http://localhost:5000/api/generate-flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, numCards }),
    });

    if (!response.ok) throw new Error("Server error");

    const data = await response.json();
    renderFlashcards(data.flashcards);
    flipHint.classList.remove("hidden");
  } catch (error) {
    console.error(error);
    flashcardContainer.innerHTML = `<p style="color:red; text-align:center; grid-column: 1 / -1;">Something went wrong generating your flashcards. Please try again.</p>`;
  } finally {
    loading.classList.add("hidden");
    generateBtn.disabled = false;
  }
});

function renderFlashcards(flashcards) {
  flashcardContainer.innerHTML = "";

  flashcards.forEach((card) => {
    const flashcardEl = document.createElement("div");
    flashcardEl.className = "flashcard";

    flashcardEl.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-front">${card.term}</div>
        <div class="flashcard-back">${card.definition}</div>
      </div>
    `;

    flashcardEl.addEventListener("click", () => {
      flashcardEl.classList.toggle("flipped");
    });

    flashcardContainer.appendChild(flashcardEl);
  });
}