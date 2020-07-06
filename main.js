const tasks = [
  {
    content: 'kupic browary',
    done: false,
  }
]

let hidingMode = false;

const buttonsRender = () => {
  let htmlContent = "";
  if (tasks.length > 0) {
    htmlContent +=
      `Lista zadań 
      <button class="section__button--showHide">${hidingMode ? 'Pokaż wszystkie' : 'Ukryj ukończone'}</button>
    <button class="section__button--allDone${tasks.every(task => task.done === true) ? ' --color' : ''}">Ukończ wszystkie</button>`


  } else {
    htmlContent +=
      `Lista zadań `
  }

  document.querySelector('.section__subtitle').innerHTML = htmlContent;

  const allDone = document.querySelector('.section__button--allDone');


  allDone.addEventListener('click', allTasksDone);

  const showHide = document.querySelector('.section__button--showHide');

  showHide.addEventListener('click', toggleShowHide);

}



const render = () => {
  let htmlString = "";

  tasks.map(task => (
    htmlString +=
    `<li class="task${task.done && hidingMode ? '--hide' : ''}">
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

  buttonsRender();

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

const allTasksDone = () => {
  tasks.map(task => task.done = task.done = true)
  render();
}

const toggleShowHide = () => {
  hidingMode = !hidingMode;
  render();
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