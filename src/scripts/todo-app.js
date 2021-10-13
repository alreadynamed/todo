function createTaskItem(taskText) {
  const taskItem = `
    <div class='task'>
      <input class='task-checkbox' type='checkbox'>
      <div class='task-text'>${taskText}</div>
      <button class='delete-task-button'>delete</button>
    </div>
  `;

  return taskItem;
};

function getParentTaskNode() {
  const mainListField = document.querySelector('.list-items');

  return mainListField;
};

function appendTaskItemsToList(taskText) {
  const taskBlock = getParentTaskNode();

  if (taskText == '' || taskText == null) {
    return;
  }

  taskBlock.insertAdjacentHTML('afterbegin', createTaskItem(taskText));
};

function clearInputTaskValue(text) {
  if (text.value != '' || text.value != null) {
    text.value = '';
  }
};

function deleteTaskItem(event) {
  const task = event.target.parentNode;

  if (event.target.className == 'delete-task-button') {
    task.remove();
  }
};

function getArrOfListItems() {
  const taskItemsBlock = document.querySelector('.list-items');
  const listOfTaskItems = [...taskItemsBlock.children];

  return listOfTaskItems;
};

function getTasksItemsCounter(value) {
  const counter = document.querySelector('.task-items-done');
  
  // avoid the appearance undefined in ${value} when click on empty window field 
  if (value == undefined) return;
  
  if (value == 0) {
    counter.textContent = `Task items done: ${value}`;
  } else {
    counter.textContent = `Task items done: ${value}`;
  }
};

function countDoneItems(event) {
  const taskCheckbox = document.querySelectorAll('.task-checkbox');
  const checkboxItems = [...taskCheckbox]; 

  let checkedTasksCount;

  if (event.target.classList.contains('task-checkbox') || 
      event.target.classList.contains('delete-task-button')) {
    let done = checkboxItems.filter(checkbox => checkbox.checked);

    checkedTasksCount = done.length;
  } 

  return checkedTasksCount;
};

function makeTaskTextItemsEditable() {
  const taskTextItems = document.querySelectorAll('.task-text');
  const taskItems = [...taskTextItems];

  taskItems.forEach(taskItem => {
    taskItem.contentEditable = true;
  });
};

function changeTaskText(event) {
  const activeTaskText = event.target.classList.contains('task-text');
  const taskItem = event.target;
  const isEditable = event.target.isContentEditable;

  if (activeTaskText) {
    if (isEditable) {
      checkOnEmptyTaskText(taskItem.innerHTML, event.target);

      taskItem.contentEditable = false;
    } 

    taskItem.contentEditable = true;
  }
}

function checkOnEmptyTaskText(text, taskItem) {
  if (text == '' || text == null) {
    const item = taskItem.parentNode;
    item.remove();
  }
}

document.addEventListener('keypress', function(event) {
  const inputTask = document.querySelector('.input-task-field');
  inputTask.focus();

  if (event.key === 'Enter') {
    appendTaskItemsToList(inputTask.value);
    clearInputTaskValue(inputTask);
    makeTaskTextItemsEditable();
    changeTaskText(event);
  }  
});

// show done items onload 

getTasksItemsCounter(0);

document.addEventListener('click', function(event) {
  deleteTaskItem(event);
  countDoneItems(event);
  getTasksItemsCounter(countDoneItems(event));
});