/* StudySprint: an original task planner demonstrating JavaScript fundamentals. */

const STORAGE_KEY = "studysprint.tasks.v1";
const starterTasks = [
  { id: 101, title: "Review JavaScript array methods", category: "Study", due: "2026-10-11", completed: false },
  { id: 102, title: "Write project README", category: "Assignment", due: "2026-10-12", completed: false },
  { id: 103, title: "Practice a 5-minute code walkthrough", category: "Project", due: "2026-10-13", completed: true }
];

// Read saved tasks safely; invalid stored data falls back to the sample list.
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return starterTasks.map(task => ({ ...task }));
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new Error("Saved tasks were not a list.");
    return parsed;
  } catch (error) {
    console.warn("Could not load saved tasks:", error.message);
    return starterTasks.map(task => ({ ...task }));
  }
}

let tasks = loadTasks();
const form = document.querySelector("#taskForm");
const titleInput = document.querySelector("#taskTitle");
const categoryInput = document.querySelector("#taskCategory");
const dueInput = document.querySelector("#taskDue");
const filterInput = document.querySelector("#taskFilter");
const taskList = document.querySelector("#taskList");
const emptyState = document.querySelector("#emptyState");
const formMessage = document.querySelector("#formMessage");

// Format dates with Day.js, a third-party library included from a CDN.
function formatDate(dateString) {
  if (typeof dayjs !== "function") return dateString;
  return dayjs(dateString).format("ddd, MMM D, YYYY");
}

// Save current tasks in this browser so they remain after a page refresh.
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    formMessage.textContent = "Browser storage is unavailable; changes may not persist.";
    console.error("Could not save tasks:", error);
  }
}

// Recursion counts completed tasks by reducing the remaining array one item at a time.
function countCompletedRecursively(taskArray, index = 0) {
  if (index >= taskArray.length) return 0;
  const currentCount = taskArray[index].completed ? 1 : 0;
  return currentCount + countCompletedRecursively(taskArray, index + 1);
}

// Return the subset of tasks requested by the dropdown filter.
function getVisibleTasks() {
  const selected = filterInput.value;
  if (selected === "active") return tasks.filter(task => !task.completed);
  if (selected === "completed") return tasks.filter(task => task.completed);
  return [...tasks];
}

// Create DOM elements for one task without inserting user text as HTML.
function createTaskElement(task) {
  const article = document.createElement("article");
  article.className = `task-item${task.completed ? " is-complete" : ""}`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-check";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Mark ${task.title} complete`);
  checkbox.addEventListener("change", () => toggleTask(task.id));

  const content = document.createElement("div");
  const title = document.createElement("span");
  title.className = "task-title";
  title.textContent = task.title;

  const meta = document.createElement("div");
  meta.className = "task-meta";
  const category = document.createElement("span");
  category.className = "category-pill";
  category.textContent = task.category;
  const due = document.createElement("span");
  due.textContent = `Due ${formatDate(task.due)}`;
  if (!task.completed && task.due < dayjs().format("YYYY-MM-DD")) {
    due.classList.add("due-soon");
    due.textContent += " · overdue";
  }
  meta.append(category, due);
  content.append(title, meta);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "delete-button";
  removeButton.textContent = "Delete";
  removeButton.setAttribute("aria-label", `Delete ${task.title}`);
  removeButton.addEventListener("click", () => deleteTask(task.id));

  article.append(checkbox, content, removeButton);
  return article;
}

// Update summary cards, progress bar, and motivational text from the current data.
function renderSummary() {
  const total = tasks.length;
  const completed = countCompletedRecursively(tasks);
  const remaining = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.querySelector("#totalCount").textContent = total;
  document.querySelector("#completedCount").textContent = completed;
  document.querySelector("#remainingCount").textContent = remaining;
  document.querySelector("#progressPercent").textContent = `${percentage}%`;
  document.querySelector("#progressBar").style.width = `${percentage}%`;
  document.querySelector("#progressBar").setAttribute("aria-valuenow", percentage);

  const insight = document.querySelector("#insightText");
  if (total === 0) insight.textContent = "Add a task to start building momentum.";
  else if (remaining === 0) insight.textContent = "Everything is complete. Great work!";
  else if (percentage >= 60) insight.textContent = "You are making good progress. Keep going!";
  else insight.textContent = `Choose one of your ${remaining} remaining tasks and get started.`;
}

// Render the selected tasks and show a helpful empty state when none match.
function renderTasks() {
  const visibleTasks = getVisibleTasks();
  taskList.replaceChildren();
  visibleTasks
    .sort((first, second) => first.due.localeCompare(second.due))
    .forEach(task => taskList.append(createTaskElement(task)));
  emptyState.hidden = visibleTasks.length > 0;
  renderSummary();
}

// Add a validated task to the array and persist the change.
function addTask(event) {
  event.preventDefault();
  const title = titleInput.value.trim();
  const due = dueInput.value;
  if (!title || !due) {
    formMessage.textContent = "Enter a task title and due date.";
    return;
  }
  if (due < dayjs().format("YYYY-MM-DD")) {
    formMessage.textContent = "Choose today or a future due date.";
    dueInput.focus();
    return;
  }
  tasks.push({ id: Date.now(), title, category: categoryInput.value, due, completed: false });
  saveTasks();
  form.reset();
  dueInput.value = dayjs().format("YYYY-MM-DD");
  formMessage.textContent = "Task added to your plan.";
  renderTasks();
  titleInput.focus();
}

// Toggle completion with Array.map, keeping each task object independent.
function toggleTask(taskId) {
  tasks = tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task);
  saveTasks();
  renderTasks();
}

// Delete a task using Array.filter and refresh the displayed list.
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  renderTasks();
  formMessage.textContent = "Task removed.";
}

// Remove every completed task while leaving unfinished tasks untouched.
function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
  formMessage.textContent = "Completed tasks cleared.";
}

// Restore the example tasks for a clean demo or practice session.
function restoreSampleTasks() {
  tasks = starterTasks.map(task => ({ ...task }));
  saveTasks();
  filterInput.value = "all";
  renderTasks();
  formMessage.textContent = "Sample tasks restored.";
}

// Initialize dates, events, and the first screen when the page is ready.
function initializeApp() {
  document.querySelector("#todayLabel").textContent = typeof dayjs === "function"
    ? `Today is ${dayjs().format("dddd, MMMM D")}`
    : "Plan your next study session";
  dueInput.value = typeof dayjs === "function" ? dayjs().format("YYYY-MM-DD") : "2026-10-10";
  form.addEventListener("submit", addTask);
  filterInput.addEventListener("change", renderTasks);
  document.querySelector("#clearCompleted").addEventListener("click", clearCompletedTasks);
  document.querySelector("#resetDemo").addEventListener("click", restoreSampleTasks);
  renderTasks();
}

initializeApp();
