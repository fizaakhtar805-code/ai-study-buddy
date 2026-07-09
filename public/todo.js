const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskStats = document.getElementById("taskStats");

const STORAGE_KEY = "aiStudyBuddyTasks";

let tasks = loadTasks();

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function formatDueDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const dueDate = dueDateInput.value || null;

  tasks.push({ id: Date.now(), text, completed: false, dueDate });
  taskInput.value = "";
  dueDateInput.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("div");
    item.className = "task-item" + (task.completed ? " completed" : "");

    const dueDateHtml = task.dueDate
      ? `<span class="due-date">📅 Due: ${formatDueDate(task.dueDate)}</span>`
      : "";

    item.innerHTML = `
      <label class="custom-checkbox">
        <input type="checkbox" ${task.completed ? "checked" : ""} />
        <span class="checkmark"></span>
      </label>
      <div class="task-content">
        <span class="task-text">${task.text}</span>
        ${dueDateHtml}
      </div>
      <button class="delete-btn">🗑️</button>
    `;

    item.querySelector("input").addEventListener("click", () => toggleTask(task.id));
    item.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));

    taskList.appendChild(item);
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  taskStats.textContent = `${tasks.length} tasks • ${completedCount} completed`;
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();