const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const deadlineInput = document.getElementById("deadline");
const pointsDisplay = document.getElementById("points");
const taskCountDisplay = document.getElementById("taskCount");
const completedCountDisplay = document.getElementById("completedCount");

let points = 0;
let totalTasks = 0;
let completedTasks = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

todosUL.addEventListener("click", (e) => {
  const target = e.target;

  if (target.tagName === "INPUT" && target.type === "checkbox") {
    if (target.checked) {
      target.parentElement.classList.add("completed");
      points += 1;
      completedTasks += 1;
      updateStats();
    } else {
      target.parentElement.classList.remove("completed");
      points -= 1;
      completedTasks -= 1;
      updateStats();
    }
  }

  if (target.classList.contains("edit-btn")) {
    editTask(target);
  }

  if (target.classList.contains("save-btn")) {
    saveTask(target);
  }

  if (target.classList.contains("cancel-btn")) {
    cancelEdit(target);
  }

  if (target.classList.contains("complete-btn")) {
    completeTask(target);
  }

  if (target.classList.contains("delete-btn")) {
    deleteTask(target);
  }
});

function addTodo() {
  const todoText = input.value;
  const deadline = deadlineInput.value;

  if (todoText) {
    const todoEl = document.createElement("li");

    todoEl.innerHTML = `
      <input type="checkbox" class="checkbox" />
      <span class="task-text">${todoText}</span>
      <span class="deadline">Due: ${deadline || "No deadline"}</span>
      <button class="complete-btn">Complete</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    todosUL.appendChild(todoEl);
    input.value = "";
    deadlineInput.value = "";

    totalTasks += 1;
    updateStats();
  }
}

function updateStats() {
  pointsDisplay.innerText = `Points: ${points}`;
  taskCountDisplay.innerText = `Tasks: ${totalTasks}`;
  completedCountDisplay.innerText = `Completed: ${completedTasks}`;
}

function editTask(button) {
  const li = button.parentElement;
  const taskText = li.querySelector(".task-text").innerText;
  const deadlineText = li
    .querySelector(".deadline")
    .innerText.replace("Due: ", "");

  li.innerHTML = `
    <input type="text" class="edit-input" value="${taskText}" />
    <input type="datetime-local" class="edit-deadline" value="${
      deadlineText !== "No deadline" ? deadlineText : ""
    }" />
    <button class="save-btn">Save</button>
    <button class="cancel-btn">Cancel</button>
    <button class="delete-btn">Delete</button>
  `;
}
function saveTask(button) {
  const li = button.parentElement;
  const editedText = li.querySelector(".edit-input").value;
  const editedDeadline = li.querySelector(".edit-deadline").value;

  li.innerHTML = `
    <input type="checkbox" class="checkbox" />
    <span class="task-text">${editedText}</span>
    <span class="deadline">Due: ${editedDeadline || "No deadline"}</span>
    <button class="complete-btn">Complete</button>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;
}

function cancelEdit(button) {
  const li = button.parentElement;
  const originalText = li.querySelector(".edit-input").value;
  const originalDeadline = li.querySelector(".edit-deadline").value;

  li.innerHTML = `
    <input type="checkbox" class="checkbox" />
    <span class="task-text">${originalText}</span>
    <span class="deadline">Due: ${originalDeadline || "No deadline"}</span>
    <button class="complete-btn">Complete</button>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;
}

function completeTask(button) {
  const li = button.parentElement;
  li.classList.add("completed");
  li.querySelector(".checkbox").checked = true;
  points += 1;
  completedTasks += 1;
  updateStats();
}

function deleteTask(button) {
  const li = button.parentElement;
  if (li.classList.contains("completed")) {
    completedTasks -= 1;
  }
  totalTasks -= 1;
  li.remove();
  updateStats();
}
