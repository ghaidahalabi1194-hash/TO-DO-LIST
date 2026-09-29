const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

const allButton = document.getElementById("allButton");
const completedButton = document.getElementById("completedButton");
const pendingButton = document.getElementById("pendingButton");

const clearButton = document.getElementById("clearButton");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";



function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}




function displayTasks() {

    taskList.innerHTML = "";


    let filteredTasks = tasks.filter(function(task) {

        if (currentFilter === "completed") {
            return task.completed;
        }

        if (currentFilter === "pending") {
            return !task.completed;
        }

        return true;

    });


    if (filteredTasks.length === 0) {

        const message = document.createElement("li");

        message.textContent = "No tasks found";

        message.classList.add("empty-message");

        taskList.appendChild(message);

        return;

    }


    filteredTasks.forEach(function(task) {

        const index = tasks.indexOf(task);


        const li = document.createElement("li");



        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("task-checkbox");

        checkbox.checked = task.completed;


        checkbox.addEventListener("change", function() {

            tasks[index].completed = checkbox.checked;

            saveTasks();

            displayTasks();

        });



        const span = document.createElement("span");

        span.textContent = task.text;

        span.classList.add("task-text");


        if (task.completed) {

            span.classList.add("completed");

        }


        span.addEventListener("click", function() {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();

            displayTasks();

        });


        /* Delete Button */

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "🗑";

        deleteButton.classList.add("delete-btn");


        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();

        });


        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(deleteButton);


        taskList.appendChild(li);

    });

}



function addTask() {

    const taskText = taskInput.value.trim();


    if (taskText === "") {

        alert("Please enter a task!");

        return;

    }


    const task = {

        text: taskText,

        completed: false

    };


    tasks.push(task);

    saveTasks();


    taskInput.value = "";

    taskInput.focus();


    currentFilter = "all";

    updateActiveButton(allButton);

    displayTasks();

}



addButton.addEventListener("click", function() {

    addTask();

});



taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});



allButton.addEventListener("click", function() {

    currentFilter = "all";

    updateActiveButton(allButton);

    displayTasks();

});



pendingButton.addEventListener("click", function() {

    currentFilter = "pending";

    updateActiveButton(pendingButton);

    displayTasks();

});



completedButton.addEventListener("click", function() {

    currentFilter = "completed";

    updateActiveButton(completedButton);

    displayTasks();

});



function updateActiveButton(button) {

    allButton.classList.remove("active");

    pendingButton.classList.remove("active");

    completedButton.classList.remove("active");


    button.classList.add("active");

}



clearButton.addEventListener("click", function() {

    if (tasks.length === 0) {

        return;

    }


    const confirmDelete = confirm(
        "Are you sure you want to delete all tasks?"
    );


    if (confirmDelete) {

        tasks = [];

        saveTasks();

        displayTasks();

    }

});


displayTasks();
