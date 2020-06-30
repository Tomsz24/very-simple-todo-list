const tasks = [
  {
    content: 'kupic browary',
    done: false,
  }
]

const render = () => {
  let htmlString = "";

  tasks.map(task => (
    htmlString +=
    `<li class="task">
      <button class="section__addTask">
        ${task.done ? '<i class="fas fa-check"></i>' : ''}
      </button>
      <p class="taskContent${task.done ? '--active' : ''}">${task.content}</p> 
      <button class="section__removeTask">
       <i class="fas fa-trash"></i>
      </button>
    </li>`


  ));

  document.querySelector('.taskList').innerHTML = htmlString;
  taskAllEvents();
}

const removeTask = index => {
  tasks.splice(index, 1);
  render();
}

const taskDone = index => {
  tasks[index].done = !tasks[index].done;
  render();
}

const addNewTask = newTaskContent => {
  tasks.push({
    content: newTaskContent,
    done: false,
  })
}

const taskAllEvents = () => {
  document.querySelectorAll('.section__addTask').forEach((button, index) => {
    button.addEventListener('click', () => {
      taskDone(index)
    });
  });

  document.querySelectorAll('.section__removeTask').forEach((button, index) => {
    button.addEventListener('click', () => {
      removeTask(index);
    });
  });
}


const init = () => {
  render();

  const form = document.querySelector('.header__form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    const newTaskContent = document.querySelector('.form__js-input');


    if (newTaskContent.value === "") {
      return newTaskContent.focus();
    }

    addNewTask(newTaskContent.value);
    newTaskContent.value = '';

    render();
  });
}


init();