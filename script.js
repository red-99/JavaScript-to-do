document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((element) => {
    renderTask(element);
  });

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim(); //here we are grabbing the value and then trimming out the extra space
    if (taskText === "") return; //checking for blank input

    const newTask = {
      id: Date.now(),
      text: taskText,
      isCompleted: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);

    todoInput.value = ""; //This is to clear the input field after adding the task

    console.log(tasks);
  });

  function renderTask(task) {
    const taskList = document.createElement("li");

    taskList.setAttribute("data-id", task.id);

    // if (task.isCompleted) {
    //   taskList.classList.add('completed')
    // }

    taskList.innerHTML = `<span>${task.text}</span> <button>Delete</button>`;

    taskList.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.isCompleted = !task.isCompleted;
      taskList.classList.toggle("completed");
      saveTasks();
    });

    taskList.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //we are preventing the toggle from firing by using this
      tasks = tasks.filter((t) => t.id !== task.id);
      taskList.remove();
      saveTasks();
    });

    todoList.appendChild(taskList);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } //saving task to local memory
});
