const addTask = document.querySelector("#addTask");

const formDiv = document.querySelector(".form");

const closeBtn = document.querySelector("#close");

const form = document.querySelector("form");

const tasksDiv = document.querySelector(".tasks");

const addUp = document.querySelector("#addUP");

const themeBtn = document.getElementById("theme-btn");

let isDark = false;

const sort = document.querySelector("#sort");

const priorityFilter = document.querySelector("#priorityFilter");

sort.addEventListener("click", (event) => {});

let taskArr = [];



let updateTaskIndex = null;

const ui = (tasks = taskArr) => {
  tasksDiv.innerHTML = "";

    if (taskArr.length === 0) {
    tasksDiv.innerHTML = `
            <h2>No tasks available</h2>
        `;
    return;
  }

  tasks.forEach((elem, index) => {
    tasksDiv.innerHTML += `<div class="task-card">
          <h2>${elem.title}</h2>
          <p>
            ${elem.description}
          </p>
          <div class="task-info">
            <span><b>Due Date</b>: ${elem.date}</span>
            <span>${elem.priority}</span>
          </div>
          <div class="task-btn">
            <button onclick="updateTask('${elem.title}')" class="update-btn">Update</button>
            <button onclick="deleteTask(${index})" class="delete-btn">Delete</button>
          </div>
        </div>`;
  });
};

addTask.addEventListener("click", () => {
  formDiv.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  formDiv.style.display = "none";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let title = event.target[0].value;
  let description = event.target[1].value;
  let date = event.target[2].value;
  let priority = event.target[3].value;

  if (
    title.trim() === "" ||
    description.trim() === "" ||
    date.trim() === "" ||
    priority.trim() === ""
  ) {
    alert("please fill all fields");
    return;
  }

  let obj = {
    title,
    description,
    date,
    priority,
  };
  if (updateTaskIndex !== null) {
    taskArr[updateTaskIndex] = obj;
    updateTaskIndex = null;
  } else {
    taskArr.push(obj);
  }

  ui();
  formDiv.style.display = "none";

  form.reset();
});

const updateTask = (name) => {
  formDiv.style.display = "flex";
  let task = taskArr.find((elem) => elem.title === name);
  updateTaskIndex = taskArr.findIndex((elem) => elem.title === name);

  form[0].value = task.title;
  form[1].value = task.description;
  form[2].value = task.date;
  form[3].value = task.priority;

  addUp.textContent = "Update task";
};

const deleteTask = (index) => {
  taskArr.splice(index, 1);
  ui();
};

themeBtn.addEventListener("click", () => {
  const navbar = document.querySelector(".navbar");

  if (!isDark) {
    document.body.style.backgroundColor = "#0f172a";
    document.body.style.color = "#f8fafc";

    if (navbar) {
      navbar.style.backgroundColor = "#020617";
      navbar.style.borderBottom = "1px solid #334155";
    }

    document.querySelectorAll(".task-card").forEach((card) => {
      card.style.backgroundColor = "#1e293b";
      card.style.color = "#f8fafc";
      card.style.border = "1px solid #334155";
      card.style.boxShadow = "0 4px 15px rgba(0,0,0,0.5)";
    });

    document.querySelectorAll(".task-card h2").forEach((title) => {
      title.style.color = "#f8fafc";
    });

    document.querySelectorAll(".task-card p").forEach((text) => {
      text.style.color = "#cbd5e1";
    });

    const form = document.querySelector(".form form");

    if (form) {
      form.style.backgroundColor = "#1e293b";
      form.style.border = "1px solid #334155";
    }

    document.querySelectorAll(".form input, .form select").forEach((input) => {
      input.style.backgroundColor = "#0f172a";
      input.style.color = "white";
      input.style.border = "1px solid #475569";
    });

    document.querySelector(".top h1").style.color = "#f87171";

    themeBtn.innerHTML = "Light Mode";

    isDark = true;
  } else {
    document.body.style.backgroundColor = "#f5f5f5";
    document.body.style.color = "#222";

    if (navbar) {
      navbar.style.backgroundColor = "white";
      navbar.style.borderBottom = "1px solid #ddd";
    }

    document.querySelectorAll(".task-card").forEach((card) => {
      card.style.backgroundColor = "white";
      card.style.color = "#222";
      card.style.border = "none";
      card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
    });

    document.querySelectorAll(".task-card h2").forEach((title) => {
      title.style.color = "#222";
    });

    document.querySelectorAll(".task-card p").forEach((text) => {
      text.style.color = "#666";
    });

    const form = document.querySelector(".form form");

    if (form) {
      form.style.backgroundColor = "white";
      form.style.border = "none";
    }

    document.querySelectorAll(".form input, .form select").forEach((input) => {
      input.style.backgroundColor = "white";
      input.style.color = "black";
      input.style.border = "1px solid #ccc";
    });

    themeBtn.innerHTML = "Dark Mode";

    isDark = false;
  }
});

const sortBtn = document.querySelector("#sort");

sortBtn.addEventListener("click", () => {
  let priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

  taskArr.sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  ui();
});

priorityFilter.addEventListener("change", (event) => {
  let selectedPriority = event.target.value;

  if (selectedPriority === "all") {
    ui(taskArr);
  } else {
    let filteredTasks = taskArr.filter((task) => {
      return task.priority === selectedPriority;
    });

    ui(filteredTasks);
  }
});
