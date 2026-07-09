const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const stickyBoard = document.getElementById("stickyBoard");

const STORAGE_KEY = "aiStudyBuddyNotes";
const colors = ["#fff3b0", "#ffd6e3", "#c9f0d8", "#d6e4ff", "#ffe0c2"];

let notes = loadNotes();

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function addNote() {
  const text = noteInput.value.trim();
  if (!text) return;

  const boardWidth = stickyBoard.clientWidth;
  const randomX = Math.floor(Math.random() * Math.max(boardWidth - 180, 20));
  const randomY = Math.floor(Math.random() * 200);
  const color = colors[Math.floor(Math.random() * colors.length)];

  notes.push({
    id: Date.now(),
    text,
    x: randomX,
    y: randomY,
    color,
  });

  noteInput.value = "";
  saveNotes();
  renderNotes();
}

function deleteNote(id) {
  notes = notes.filter((n) => n.id !== id);
  saveNotes();
  renderNotes();
}

function renderNotes() {
  stickyBoard.innerHTML = "";

  notes.forEach((note) => {
    const noteEl = document.createElement("div");
    noteEl.className = "sticky-note";
    noteEl.style.left = `${note.x}px`;
    noteEl.style.top = `${note.y}px`;
    noteEl.style.background = note.color;

    noteEl.innerHTML = `
      <button class="note-delete">×</button>
      <p>${note.text}</p>
    `;

    noteEl.querySelector(".note-delete").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteNote(note.id);
    });

    makeDraggable(noteEl, note.id);
    stickyBoard.appendChild(noteEl);
  });
}

function makeDraggable(el, id) {
  let isDragging = false;
  let offsetX, offsetY;

  el.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("note-delete")) return;
    isDragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.zIndex = 10;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const boardRect = stickyBoard.getBoundingClientRect();
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    newX = Math.max(0, Math.min(newX, boardRect.width - el.offsetWidth));
    newY = Math.max(0, Math.min(newY, boardRect.height - el.offsetHeight));

    el.style.left = `${newX}px`;
    el.style.top = `${newY}px`;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    el.style.zIndex = 1;

    const note = notes.find((n) => n.id === id);
    if (note) {
      note.x = parseInt(el.style.left);
      note.y = parseInt(el.style.top);
      saveNotes();
    }
  });
}

addNoteBtn.addEventListener("click", addNote);
noteInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNote();
});

renderNotes();