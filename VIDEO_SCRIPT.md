# 4–5 Minute Video Walkthrough Script — StudySprint

**Important:** Record your screen with your face visible throughout the presentation. Replace any wording that does not match what you actually tested.

## 0:00–0:30 — Introduction
“Hello, my name is [your name]. This is StudySprint, a study task planner I created for my CSE 310 JavaScript module. It helps users organize study and assignment tasks, set due dates, track completion, and save their tasks in the browser. I will demonstrate the app and explain the main JavaScript features.”

## 0:30–1:30 — Demonstrate the application
“Here is the dashboard. The summary cards show total tasks, completed tasks, remaining tasks, and overall progress. I will add a task called ‘Finish module reflection,’ choose Assignment, select a due date, and add it. The new task appears in the list. I can mark it complete, filter to show only completed tasks or unfinished tasks, and delete a task. The progress count changes when I mark work complete.”

## 1:30–2:15 — Explain data and array functions
“In `app.js`, each task is an object containing an ID, title, category, due date, and completion status. The tasks are stored in an array. The `map()` method updates a task without changing unrelated tasks. The `filter()` method selects tasks for the chosen view and removes tasks when I delete them. `sort()` orders visible tasks by due date, and `forEach()` creates a visual card for each task.”

## 2:15–3:00 — Explain recursion
“The function `countCompletedRecursively()` demonstrates recursion. Its base case returns zero when the index reaches the array length. Otherwise, it checks whether the current task is complete, adds one or zero, and calls itself for the next index. This gives the number used by the Completed summary. The base case is important because it stops the recursive calls.”

## 3:00–3:45 — Library, DOM, and error handling
“The HTML loads Day.js from a CDN. I use Day.js to format dates and determine today’s date. JavaScript creates DOM elements for each task and uses `textContent` for user-provided titles. The CSS file styles these elements and makes the layout responsive. The storage functions use `try/catch` so invalid saved data or unavailable browser storage does not silently crash the app.”

## 3:45–4:30 — Persistence and closing
“I will refresh the page to show that tasks are saved in localStorage. The README explains how to run the project and how it meets the JavaScript module requirements. I will finish by confirming that I tested adding, completing, filtering, deleting, and restoring tasks. Thank you.”

**Before recording:** open the page in a browser, test the features, show your face, and speak naturally. Upload the recording to university cloud storage or the required platform, confirm its link works, update the README and submission form, and post the video link in the correct Microsoft Teams channel.
