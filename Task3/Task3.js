const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");

window.onload = function () {
  loadTasks();
};

function addTask() {
  const taskName = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (!taskName || !dueDate) {
    errorMsg.innerText = "Please fill out both the task and the due date.";
    return;
  } else {
    errorMsg.innerText = "";
  }

  const task = {
    name: taskName,
    dueDate: dueDate,
    completed: false,
  };

  saveTask(task);
  renderTask(task);
  clearInputs();
}

function renderTask(task) {
  const li = document.createElement("li");
  li.classList.add("task-item");

  if (!task.completed && new Date(task.dueDate) < new Date()) {
    li.classList.add("overdue");
  }

  li.innerHTML = `
        <span>${task.name} - Due: ${task.dueDate}</span>
        <div>
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

  const completeBtn = li.querySelector(".complete-btn");

  if (task.completed) {
    li.classList.add("completed");
    completeBtn.disabled = true;
    completeBtn.innerText = "Completed";
    completeBtn.style.backgroundColor = "grey";
  }

  completeBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to mark this task as complete?")) {
      completeTask(task.name);
      li.classList.add("completed");
      completeBtn.disabled = true;
      completeBtn.innerText = "Completed";
      completeBtn.style.backgroundColor = "grey";
      li.classList.remove("overdue");
    }
  });

  li.querySelector(".delete-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.name);
      taskList.removeChild(li);
    }
  });

  taskList.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));
}

function completeTask(taskName) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.map((task) => {
    if (task.name === taskName) {
      task.completed = true;
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskName) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.filter((task) => task.name !== taskName);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearInputs() {
  taskInput.value = "";
  dueDateInput.value = "";
}
