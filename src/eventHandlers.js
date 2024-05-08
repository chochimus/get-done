import { Task, Project, allProjects} from "./task";
import { updateDOM, createProjectElement, createTaskElement } from "./domUtils";

const form = document.querySelector('form');
const dialog = document.querySelector('dialog');
const close = document.querySelector('.cancel');
let task_count = 0;

export const handleNewTask = ()=>{
  dialog.showModal();
}

export const handleRemoveTask = (e,currentProject) => {
  const project = allProjects.find(project => project.name = currentProject);
  const currentTaskNumber = e.target.parentElement.getAttribute('task-number');
  //left off here
  project.removeFromTaskList(currentTaskNumber);
  task_count--;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const titleInput = formData.get("title");
  const descriptionInput = formData.get("description");
  const priorityInput = formData.get("priority");
  const projectInput = formData.get("project-name").toLowerCase();
  const currentProject = allProjects.find(project => project.name == projectInput);
  const newTask = new Task(titleInput,descriptionInput,"",priorityInput);
  task_count++;
  currentProject.addToTaskList(newTask);
  createTaskElement(currentProject, newTask, task_count);
  dialog.close();
});

close.addEventListener('click', () => {
  dialog.close();
});