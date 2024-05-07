import { handleNewTask } from "./eventHandlers";
let task_id = 0;

export const addHtmlElement = (parent,className,tag,htmlContent) => {
  const elementParent = document.querySelector(parent);
  const newElement = document.createElement(tag);
  newElement.classList.add(className);
  newElement.innerHTML = htmlContent;
  elementParent.appendChild(newElement);
  return newElement;
}

export const createTaskElement = (parent, task) => {
  const elementParent = `.${parent.className}`;
  const taskDiv = addHtmlElement(elementParent, `task-${task_id}`, 'div', '');
  addHtmlElement(`.task-${task_id}`, `task-title`, 'h1', task.getName());
  task_id++;
  return taskDiv;
}

export const createProjectElement = (parent, project) => {
  addHtmlElement(parent, `project-header`, 'div', '');
  addHtmlElement(`.project-header`, `project-title`, 'h1', `${project.name}`);
  const newTaskButton = addHtmlElement(`.project-header`, 'add-task', 'button', `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 4 20 16">
  <path d="M20,4C21.11,4 22,4.89 22,6V18C22,19.11 21.11,20 20,20H4C2.89,20 2,19.11 2,18V6C2,4.89 2.89,4 4,4H20M8.5,
  15V9H7.25V12.5L4.75,9H3.5V15H4.75V11.5L7.3,15H8.5M13.5,10.26V9H9.5V15H13.5V13.75H11V12.64H13.5V11.38H11V10.26H13.5M20.5,
  14V9H19.25V13.5H18.13V10H16.88V13.5H15.75V9H14.5V14A1,1 0 0,0 15.5,15H19.5A1,1 0 0,0 20.5,14Z" />
  </svg>`);
  const projectContainer = addHtmlElement(parent, `project-container`, 'div' , ``);
  newTaskButton.addEventListener("click", () => handleNewTask(projectContainer));
}