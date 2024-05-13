import { addHtmlElement } from "./domUtils";
import { handleEditTask, handleRemoveTask, handleShowTaskInfo, handleTaskDrag } from "../eventHandlers";
import { removeButtonIcon, editTaskButtonIcon, showInfoButtonIcon } from "../icons/icons";

export const createTaskElement = (parent, task) => {
  const elementParent = `.${parent.name} .task-container`;
  const taskInfo = task.getInfo();
  const taskDiv = addHtmlElement(`#projects ${elementParent}`, `task`, 'div', '');
  taskDiv.classList.add(taskInfo.priority);
  taskDiv.dataset.taskId = taskInfo.id;
  taskDiv.draggable = true;


  const taskHeader = addHtmlElement(taskDiv, `task-header`, 'div', "");
  const taskTitle = addHtmlElement(taskHeader, `task-title`, 'p', taskInfo.title);

  const showInfoButton = addHtmlElement(taskHeader, `show-task-info`, 'button', showInfoButtonIcon);
  showInfoButton.addEventListener("click", handleShowTaskInfo);
  
  const editButton = addHtmlElement(taskHeader, `edit-task`, 'button', editTaskButtonIcon);
  const removeButton = addHtmlElement(taskHeader, `remove-task`, 'button', removeButtonIcon);

  const taskDueDate =  addHtmlElement(taskHeader, 'task-due-date-header', 'p', taskInfo.dueDate);

  editButton.addEventListener("click", (e) => handleEditTask(e, parent.name, task));
  removeButton.addEventListener("click", (e) => handleRemoveTask(e,parent.name, task));
  taskDiv.addEventListener("dragstart", (e) => handleTaskDrag(e,parent.name, task));


  const taskContent = addHtmlElement(taskDiv, 'task-content', 'div', '');
  const taskDescription = addHtmlElement(taskContent, 'task-description', 'p', `-${taskInfo.description}`);


  return taskDiv;
}

export const editTask = (parent, task) => {
  const taskInfo = task.getInfo();

  const taskDiv = document.querySelector(`.${parent.name} .task[data-task-id="${taskInfo.id}"]`);

  const titleElement = taskDiv.querySelector(`.task-title`);
  if(titleElement.innerHTML !== taskInfo.title) {
    titleElement.innerHTML = taskInfo.title;
  }

  const taskPriority = taskDiv.classList[1];
  if(taskPriority !== taskInfo.priority ) {
    taskDiv.classList.remove(taskPriority);
    taskDiv.classList.add(taskInfo.priority);
  }

  const taskDescription = taskDiv.querySelector('.task-description');
  if(taskDescription.textContent != taskInfo.description) {
    taskDescription.textContent = `-${taskInfo.description}`;
  }
}

export const updateTaskIndex = (project) => {
  const taskElements = document.querySelector(`.${project.name}.task-container`);
  taskElements.innerHTML = "";

  project.library.forEach((task) => {
    console.log(task)
    createTaskElement(project, task);
  })
}

export const loadAllTasks = (parent) => {
  const tasks = parent.library;
  for(let i = 0; i < tasks.length; i++){
    createTaskElement(parent, tasks[i], i);
  }
}
