import { handleNewTask, handleRemoveTask } from "./eventHandlers";

export const addHtmlElement = (parent,className,tag,htmlContent) => {
  const elementParent = document.querySelector(parent);
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
  addHtmlElement('.projects', `${project.name}`, 'div', '');
  addHtmlElement(`.${project.name}`, `project-header`, 'div', '');
  addHtmlElement(`.project-header`, `project-title`, 'h1', `${project.name}`);
  const newTaskButton = addHtmlElement(`.project-header`, 'add-task', 'button', newButtonIcon);
  newTaskButton.addEventListener("click", handleNewTask);
}
export const createTaskElement = (parent, task, task_id) => {
  const elementParent = `.${parent.name}`;
  const taskDiv = addHtmlElement(elementParent, `task`, 'div', '');
  taskDiv.classList.add(task.getPriority());
  taskDiv.setAttribute('task-number',`${task_id}`);
  addHtmlElement(`.task`, `task-title`, 'h1', task.getName());
  const removeButton = addHtmlElement(`.task`, `remove-task`, 'button', removeButtonIcon);
  removeButton.addEventListener("click", (e) => handleRemoveTask(e,parent.name));
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