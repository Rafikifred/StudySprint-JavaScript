# StudySprint — JavaScript Task Planner

## Overview
StudySprint is a browser-based study planner built for the CSE 310 JavaScript module. It lets a student create coursework and personal tasks, select a category and due date, mark work complete, remove tasks, filter the list, and see progress summaries. Tasks are stored in the browser using `localStorage`.

## How to run
1. Download or clone this repository.
2. Open `index.html` in a modern browser. An internet connection is needed to load the Day.js library from its CDN.
3. Add a task, choose its category and due date, and press **Add task**.
4. Mark tasks complete, try the filters, and refresh the page to verify that browser storage works.

No build tools or package installation are required.

## JavaScript module requirements demonstrated
- **Display output:** the app renders task cards, counts, progress, and messages in the browser.
- **Native ES6 array functions:** `map`, `filter`, `sort`, `forEach`, and array spread syntax are used for task updates and rendering.
- **Recursion:** `countCompletedRecursively()` counts completed tasks using a base case and a recursive call.
- **Third-party JavaScript library:** Day.js formats dates and supplies today's date.
- **Additional requirement:** JavaScript creates and updates DOM structures styled with CSS.
- **Error handling:** `loadTasks()` and `saveTasks()` use `try/catch` to handle storage or parsing problems.

## Project structure
- `index.html` — accessible page structure and Day.js CDN link.
- `styles.css` — responsive dashboard layout and visual styles.
- `app.js` — task data, recursive counting, DOM updates, events, validation, and browser storage.

## Video demonstration
**Add your own 4–5 minute video link here:** `[Video link](PASTE-YOUR-VIDEO-LINK-HERE)`

Record with your face visible. Demonstrate adding a task, completing one, filtering tasks, deleting a task, refreshing the page, and explain the array functions, recursion, Day.js, DOM updates, and error handling in `app.js`.

## Learning resources
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [MDN Array reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Day.js documentation](https://day.js.org/docs/en/installation/installation)

## AI use declaration
AI assistance was used to help draft and review portions of this project and its documentation. I am responsible for reviewing the code, understanding how it works, testing the application, and making any changes needed before submission. Update this declaration if it does not accurately describe your actual use of AI.

## Author reflection
Before submitting, add a short reflection in your own words about what you learned, what you found difficult, and what you would improve next.
