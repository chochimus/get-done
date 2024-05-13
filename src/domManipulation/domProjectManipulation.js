import { handleNewTask, addProjectToOptions, taskDragIntoProject, loadProjectPage} from "../eventHandlers";
import { allProjects } from "../task";
import { loadAllTasks } from "./domTaskManagement";
import { addHtmlElement } from "./domUtils";

export const createProjectElement = (project) => {
  const projectDiv = addHtmlElement('#projects', `project-container`, 'div', '');
  projectDiv.classList.add(`${project.name}`);
  projectDiv.addEventListener("dragenter", (e) => taskDragIntoProject(e, project.name));


  addHtmlElement(`.${project.name}`, `project-header`, 'div', '');


  const projectTitle = addHtmlElement(`.${project.name} .project-header`, `project-title`, 'h1', `${project.name.replace(/\_+/g,' ')}`);
  const newTaskButton = addHtmlElement(`.${project.name} .project-header`, 'add-task', 'button', newButtonIcon);
  newTaskButton.addEventListener("click", (e) => handleNewTask(e, project.name));

  const taskContainer = addHtmlElement(projectDiv, 'task-container', 'div', '');
  taskContainer.classList.add('tasks');

  if(project.isHomePage) {
    addProjectToOptions(project.name);
    projectTitle.textContent = "Home Page"
  }

  //nav bar
  if(!project.isHomePage) {
  const loadProjectButton = addHtmlElement(`.project-buttons`, 'project-select-button', 'button' , `${project.name.replace(/\_+/g,' ')}`);
  loadProjectButton.classList.add(project.name);
  loadProjectButton.addEventListener("click", loadProjectPage);
  }
  return projectDiv;
}

export function loadAllProjects(ProjectArray) {
  for(const project of ProjectArray){
    createProjectElement(project);
    loadAllTasks(project);
  }
}

export function drawCurrentProject(project){
  const projectDiv = addHtmlElement('#projects', `project-container`, 'div', '');
  projectDiv.classList.add(`${project.name}`);
  projectDiv.addEventListener("dragenter", (e) => taskDragIntoProject(e, project.name));


  addHtmlElement(`#projects .${project.name}`, `project-header`, 'div', '');


  const projectTitle = addHtmlElement(`.${project.name} .project-header`, `project-title`, 'h1', `${project.name.replace(/\_+/g,' ')}`);
  const newTaskButton = addHtmlElement(`.${project.name} .project-header`, 'add-task', 'button', newButtonIcon);
  newTaskButton.addEventListener("click", (e) => handleNewTask(e, project.name));

}

const newButtonIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus-circle</title><path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>`;