const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskStats = document.getElementById("taskStats");

let tasks = [];

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ id: Date.now(), text, completed: false });
  taskInput.value = "";
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("div");
    item.className = "task-item" + (task.completed ? " completed" : "");

    item.innerHTML = `
      <label class="custom-checkbox">
        <input type="checkbox" ${task.completed ? "checked" : ""} />
        <span class="checkmark"></span>
      </label>
      <span class="task-text">${task.text}</span>
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