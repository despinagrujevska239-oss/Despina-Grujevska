
/* =========================
   PLANIFY - JAVASCRIPT
   ========================= */

document.addEventListener("DOMContentLoaded", function () {

    // ELEMENTS
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskCategory = document.getElementById("task-category");
    const taskList = document.getElementById("task-list");
    const emptyMessage = document.getElementById("empty-message");
    const completedCount = document.getElementById("completed-count");
    const currentDate = document.getElementById("current-date");
    const filterButtons = document.querySelectorAll(".filter-button");

    // CURRENT DATE
    if (currentDate) {
        currentDate.textContent = new Date().toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );
    }

    // LOAD SAVED TASKS
    let tasks = [];

    try {
        const savedTasks = localStorage.getItem("planify-tasks");
        const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];

        if (Array.isArray(parsedTasks)) {
            tasks = parsedTasks.filter(function (task) {
                return task &&
                    typeof task.id === "string" &&
                    typeof task.title === "string" &&
                    typeof task.category === "string" &&
                    typeof task.completed === "boolean";
            });
        }
    } catch (error) {
        tasks = [];
    }

    let currentFilter = "all";

    // SAVE TASKS
    function saveTasks() {
        try {
            localStorage.setItem(
                "planify-tasks",
                JSON.stringify(tasks)
            );
        } catch (error) {
            console.error("Could not save tasks.", error);
        }
    }

    // UPDATE COMPLETED COUNTER
    function updateCounter() {
        const completed = tasks.filter(function (task) {
            return task.completed;
        }).length;

        completedCount.textContent = completed;
    }

    // RENDER TASKS
    function renderTasks() {
        taskList.replaceChildren();

        const filteredTasks = tasks.filter(function (task) {
            if (currentFilter === "active") {
                return !task.completed;
            }

            if (currentFilter === "completed") {
                return task.completed;
            }

            return true;
        });

        filteredTasks.forEach(function (task) {

            const listItem = document.createElement("li");
            listItem.className = "task-item";

            if (task.completed) {
                listItem.classList.add("completed");
            }

            // CHECKBOX
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "task-checkbox";
            checkbox.checked = task.completed;
            checkbox.setAttribute(
                "aria-label",
                "Mark " + task.title + " as completed"
            );

            checkbox.addEventListener("change", function () {
                task.completed = checkbox.checked;
                saveTasks();
                renderTasks();
            });

            // TASK DETAILS
            const details = document.createElement("div");
            details.className = "task-details";

            const title = document.createElement("span");
            title.className = "task-title";
            title.textContent = task.title;

            const category = document.createElement("span");
            category.className = "task-category-label";
            category.textContent = task.category;

            details.appendChild(title);
            details.appendChild(category);

            // DELETE BUTTON
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "delete-task";
            deleteButton.textContent = "Delete";
            deleteButton.setAttribute(
                "aria-label",
                "Delete " + task.title
            );

            deleteButton.addEventListener("click", function () {
                tasks = tasks.filter(function (item) {
                    return item.id !== task.id;
                });

                saveTasks();
                renderTasks();
            });

            listItem.appendChild(checkbox);
            listItem.appendChild(details);
            listItem.appendChild(deleteButton);

            taskList.appendChild(listItem);
        });

        emptyMessage.hidden = filteredTasks.length !== 0;

        if (filteredTasks.length === 0) {
            if (currentFilter === "completed" && tasks.length > 0) {
                emptyMessage.textContent =
                    "No completed tasks yet.";
            } else if (currentFilter === "active" && tasks.length > 0) {
                emptyMessage.textContent =
                    "Great! You have no pending tasks.";
            } else {
                emptyMessage.textContent =
                    "Your day is waiting. Add your first task!";
            }
        }

        updateCounter();
    }

    // ADD NEW TASK
    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = taskInput.value.trim();

        if (title === "") {
            taskInput.focus();
            return;
        }

        const newTask = {
            id: Date.now().toString() +
                "-" + Math.random().toString(36).slice(2),
            title: title,
            category: taskCategory.value,
            completed: false
        };

        tasks.unshift(newTask);

        saveTasks();

        currentFilter = "all";

        filterButtons.forEach(function (button) {
            button.classList.toggle(
                "active",
                button.dataset.filter === "all"
            );
        });

        renderTasks();

        taskForm.reset();
        taskInput.focus();
    });

    // FILTER TASKS
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            currentFilter = button.dataset.filter;

            filterButtons.forEach(function (filterButton) {
                filterButton.classList.toggle(
                    "active",
                    filterButton === button
                );
            });

            renderTasks();
        });
    });

    // INITIAL RENDER
    renderTasks();

});
