import { handleNewTask, handleRemoveTask, handleEditTask, addProjectToOptions, handleTaskDrag , taskDragIntoProject} from "./eventHandlers";
import { allProjects } from "./task";

export const addHtmlElement = (parent,className,tag,htmlContent) => {
  const elementParent = typeof parent === 'string' ? document.querySelector(parent) : parent;
  const newElement = document.createElement(tag);
  newElement.classList.add(className);
  newElement.innerHTML = htmlContent;
  elementParent.appendChild(newElement);
  return newElement;
}

export function updateDOM(ProjectArray) {
  for(const project of ProjectArray){
    createProjectElement(project);
  }
}
export const createProjectElement = (project) => {
  const projectDiv = addHtmlElement('.projects', `project-container`, 'div', '');
  projectDiv.classList.add(`${project.name}`);
  projectDiv.addEventListener("dragenter", (e) => taskDragIntoProject(e, project.name));

  addHtmlElement(`.${project.name}`, `project-header`, 'div', '');
  addHtmlElement(`.${project.name} .project-header`, `project-title`, 'h1', `${project.name.replace(/\_+/g,' ')}`);
  const newTaskButton = addHtmlElement(`.${project.name} .project-header`, 'add-task', 'button', newButtonIcon);
  newTaskButton.addEventListener("click", (e) => handleNewTask(e, project.name));
  if(project.isHomePage) addProjectToOptions(project.name);
}
export const loadAllTasks = (parent) => {
  const tasks = parent.library;
  for(let i = 0; i < tasks.length; i++){
    createTaskElement(parent, tasks[i], i);
  }
}
export const editTask = (parent, task) => {
  const taskInfo = task.getInfo();
  console.log("Parent class:", parent.name);
console.log("Task ID:", taskInfo.id);
console.log("Selector:", `.${parent.name} .task[data-task-id="${taskInfo.id}"]`);

  const taskDiv = document.querySelector(`.${parent.name} .task[data-task-id="${taskInfo.id}"]`);
  console.log(taskDiv)

  const titleElement = taskDiv.querySelector(`.task-title`);
  if(titleElement.innerHTML !== taskInfo.title) {
    titleElement.innerHTML = taskInfo.title;
  }

  const taskPriority = taskDiv.classList[1];
  if(taskPriority !== taskInfo.priority ) {
    taskDiv.classList.remove(taskPriority);
    taskDiv.classList.add(taskInfo.priority);
  }
}

export const updateTaskIndex = (project) => {
  const taskElements = document.querySelectorAll(`.${project.name} .task`);
  taskElements.forEach((element, index) => {
    element.setAttribute('task-number', index);
  })
  
}

//last edit
export const createTaskElement = (parent, task) => {
  const elementParent = `.${parent.name}`;
  const taskInfo = task.getInfo();
  const taskDiv = addHtmlElement(`${elementParent}`, `task`, 'div', '');
  taskDiv.classList.add(taskInfo.priority);
  taskDiv.dataset.taskId = taskInfo.id;
  taskDiv.draggable = true;

  addHtmlElement(taskDiv, `task-title`, 'h1', taskInfo.title);

  const editButton = addHtmlElement(taskDiv, `edit-task`, 'button', editTaskButtonIcon);
  const removeButton = addHtmlElement(taskDiv, `remove-task`, 'button', removeButtonIcon);
  editButton.addEventListener("click", (e) => handleEditTask(e, parent.name, task));
  removeButton.addEventListener("click", (e) => handleRemoveTask(e,parent.name, task));
  taskDiv.addEventListener("dragstart", (e) => handleTaskDrag(e,parent.name, task));
  return taskDiv;
}

const newButtonIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 4 20 16">
<path d="M20,4C21.11,4 22,4.89 22,6V18C22,19.11 21.11,20 20,20H4C2.89,20 2,19.11 2,18V6C2,4.89 2.89,4 4,4H20M8.5,
15V9H7.25V12.5L4.75,9H3.5V15H4.75V11.5L7.3,15H8.5M13.5,10.26V9H9.5V15H13.5V13.75H11V12.64H13.5V11.38H11V10.26H13.5M20.5,
14V9H19.25V13.5H18.13V10H16.88V13.5H15.75V9H14.5V14A1,1 0 0,0 15.5,15H19.5A1,1 0 0,0 20.5,14Z" />
</svg>`;

const removeButtonIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,
6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`;

const editTaskButtonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path d="M18.13 12L19.39 10.74C19.83 10.3 20.39 10.06 21 10V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 
21 5 21H11V19.13L11.13 19H5V5H12V12H18.13M14 4.5L19.5 10H14V4.5M19.13 13.83L21.17 
15.87L15.04 22H13V19.96L19.13 13.83M22.85 14.19L21.87 15.17L19.83 13.13L20.81 12.15C21 11.95 21.33 
11.95 21.53 12.15L22.85 13.47C23.05 13.67 23.05 14 22.85 14.19Z" /></svg>`