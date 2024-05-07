import { createNewTask, createNewProject, allProjects } from "./task";
import { addHtmlElement, createTaskElement } from "./domUtils";

const form = document.querySelector('form');
const dialog = document.querySelector('dialog');
const close = document.querySelector('.cancel');
let lastContainer = null;

export const handleNewTask = (projectContainer)=>{
  lastContainer = projectContainer;
  console.log(lastContainer);
  dialog.showModal();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const titleInput = formData.get("title");
  const descriptionInput = formData.get("description");
  const priorityInput = formData.get("priority");
  const projectInput = formData.get("project-name").toLowerCase();
  const project = allProjects.find(project => project.name == projectInput);
  const newTask = createNewTask(titleInput,descriptionInput,"",priorityInput, project);
  const taskElement = createTaskElement(lastContainer, newTask);
  taskElement.classList.add(priorityInput);
  dialog.close();
});

close.addEventListener('click', () => {
  dialog.close();
});