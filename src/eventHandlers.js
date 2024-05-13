import { Task, Project, allProjects} from "./task";
import { createProjectElement, drawCurrentProject, loadAllProjects } from "./domManipulation/domProjectManipulation";
import { createTaskElement, editTask, loadAllTasks, updateTaskIndex} from "./domManipulation/domTaskManagement"
import { showInfoButtonIcon, minimizeInfoButtonIcon } from "./icons/icons"

const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', () => {
  const projectContext = document.getElementById('projects');
  const navDiv = document.querySelector('.project-buttons');
  navDiv.innerHTML = "";
  projectContext.innerHTML = "";
  loadAllProjects(allProjects);
})
//task creation 
const dialog = document.getElementById('create-task');
const form = dialog.querySelector('form');
const close = form.querySelector('.cancel');

export const handleNewTask = (e, projectName)=>{
  const selector = form.querySelector(`select[name="project-name"]`);
  const currentProject = allProjects.find(project => project.name == projectName);
  selector.style.display = (currentProject.isHomePage) ? "block" : "none"; 
  const options = selector.querySelectorAll(`option`);
  options.forEach(option => {if(option.value == currentProject.name) option.selected = true });

  const parentDiv = e.currentTarget.parentElement;
  dialog.style.left = parentDiv.offsetLeft + "px";
  dialog.style.top = parentDiv.offsetTop + parentDiv.offsetHeight + "px";
  dialog.showModal();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const titleInput = formData.get("title");
  const descriptionInput = formData.get("description");
  const priorityInput = formData.get("priority");
  const projectInput = formData.get("project-name");
  const dateInput = formData.get("date-input");
  const currentProject = allProjects.find(project => project.name == projectInput);
  const newTask = new Task(titleInput,descriptionInput,dateInput,priorityInput, currentProject.name);
  currentProject.addToTaskList(newTask);
  createTaskElement(currentProject, newTask);
  form.reset();
  dialog.close();
});

close.addEventListener('click', () => {
  dialog.close();
});

// task removal
export const handleRemoveTask = (e,currentProject) => {
  const project = allProjects.find(project => project.name == currentProject);
  const taskId = e.target.closest('.task').dataset.taskId;
  console.log(project.library)
  project.removeFromTaskListByTaskId(taskId);
  updateTaskIndex(project);
  e.target.closest('.task').remove();
  console.log(project.library)
}


// task edit
const editDialog = document.getElementById('edit-dialog');
const editForm = editDialog.querySelector('form');
const editClose = editForm.querySelector('.cancel');

export const handleEditTask = (e, projectClassName) => {

  const parentDiv = e.target.parentElement;

  editDialog.style.left = parentDiv.offsetLeft + "px";
  editDialog.style.top = parentDiv.offsetTop + parentDiv.offsetHeight + "px";
  editDialog.showModal();
  const selector = editForm.querySelector(`select[name="project-name"]`);
  const currentProject = allProjects.find(project => project.name == projectClassName);
  selector.hidden = true;
  const options = selector.querySelectorAll(`option`);
  options.forEach(option => {if(option.textContent == projectClassName) option.selected = true });
  loadFormData(e, currentProject); 
}
function loadFormData(e, project) {
  const taskId = e.target.closest('.task').dataset.taskId;
  editDialog.setAttribute('taskId', taskId);

  const taskInfo = project.getTaskInfoByTaskId(taskId);
  const formElements = Array.from(editForm.elements);
  let inputs = [];
  for (const key in taskInfo) {
    inputs = formElements.filter(element => element.name == key);
  
    for (const input of inputs) {
      if(input.name == undefined) continue;
        if (input.tagName === 'SELECT') {
            for (let option of input.options) {
                if (option.value === taskInfo[option.name]) {
                    option.selected = true;
                }
            }
        } else if (input.type === 'radio') {
            if (input.value === taskInfo[input.name]) {
                input.checked = true;
            }
        } else {
            input.value = taskInfo[input.name];
        }
    }
  }
}

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get("title");
  const description = formData.get("description");
  const priority = formData.get("priority");
  const currentProject = allProjects.find(project => project.name == formData.get("project-name").toLowerCase());
  const taskId = e.target.parentElement.getAttribute('taskId');
  currentProject.setTaskInfo(taskId, name, description, '', priority);
  const currentTask = currentProject.getTaskByTaskId(taskId); 
  editTask(currentProject, currentTask);
  editForm.reset();
  editDialog.close();
});

editClose.addEventListener("click", () => {
  editDialog.close();
})

export const handleTaskDrag = (e, name) => {
  const currentDiv = e.target;
  currentDiv.classList.add("dragging");

  const handleDragEnd = () => {
    currentDiv.classList.remove("dragging");
    if(currentDiv.dataset.name !== name && currentDiv.dataset.name !== undefined){
      const previousProject = allProjects.find(project => project.name == name)
      const currentProject = allProjects.find(project => project.name == currentDiv.dataset.name);
      const taskId = currentDiv.dataset.taskId;

      const task = previousProject.getTaskByTaskId(taskId);

      previousProject.removeFromTaskListByTaskId(taskId);
      currentProject.addToTaskList(task);

      createTaskElement(currentProject, task);
      updateTaskIndex(previousProject);
      updateTaskIndex(currentProject);

      currentDiv.removeAttribute('data-name');
      currentDiv.remove();
    };
    currentDiv.removeEventListener('dragend', handleDragEnd);
  };

  currentDiv.addEventListener("dragend", handleDragEnd);
}

export const taskDragIntoProject = (e, name) => {
  e.preventDefault();
  const draggable = document.querySelector('.dragging');
  draggable.dataset.name = name;
}

//show task info
export const handleShowTaskInfo = (e) => {
  const infoButton = e.target;
  const taskDiv = e.target.closest('.task'); 
  const taskContent = taskDiv.querySelector('.task-content');
  const taskDescription = taskContent.querySelector('.task-description');

  if(taskDescription.innerHTML == "") return;

  const isOpen = taskDiv.classList.toggle('active');
  
  if (isOpen){
    infoButton.innerHTML = minimizeInfoButtonIcon;
    taskContent.style.maxHeight = taskContent.scrollHeight + "px";
    taskContent.style.padding = "0.5rem 1rem";
  } else {
    infoButton.innerHTML = showInfoButtonIcon;
    taskContent.style.maxHeight = null;
    taskContent.style.padding = "0 1rem"
  }
};

//project creation

const newProjectButton = document.querySelector('.projects-button');
const projectDialog = document.querySelector('.create-project');
const projectForm = projectDialog.querySelector('form');
const projectFormClose = projectForm.querySelector('.cancel');

newProjectButton.addEventListener("click", (e) => {
  const projectButtonDiv = e.target;
  projectDialog.style.left = projectButtonDiv.offsetLeft + projectButtonDiv.offsetWidth + "px";
  projectDialog.style.top = projectButtonDiv.offsetTop + "px";
  projectDialog.showModal();
});
projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const title = formData.get("title").replace(/\s+/g, '_');
  if(allProjects.find(project => project.name == title)) {
    console.error('duplicate name');
    return;
  } 
  const newProject = new Project(title);
  allProjects.push(newProject);
  const projectsContext = document.getElementById('projects');
  projectsContext.innerHTML = "";
  const thisProjectDiv = createProjectElement(newProject);
  addProjectToOptions(title);
  projectDialog.close();
});


export function addProjectToOptions(title){
  const mainFormSelector = form.querySelector('select[name="project-name"]');
  mainFormSelector.add(new Option(title, title));
  const editFormSelector = editForm.querySelector('select[name="project-name"]');
  editFormSelector.add(new Option(title, title));
}
projectFormClose.addEventListener("click", () => {
  projectDialog.close();
});

export const loadProjectPage = (e) => {
  const projectDiv = document.getElementById('projects');
  const projectName = e.target.classList[1];
  projectDiv.innerHTML = '';
  const currentProject = allProjects.find(project => project.name == projectName);
  drawCurrentProject(currentProject);
  loadAllTasks(currentProject)
}



//form listener for showing date

const checkBoxCreate = document.getElementById('show-date-field-create');
const dateInput = document.getElementById('date-input-create');
dateInput.style.display = 'none';
checkBoxCreate.addEventListener("change", (e) => {
  dateInput.style.display = e.target.checked ? 'block' : 'none';
});

const checkBoxEdit = document.getElementById('show-date-field-edit');
const dateInputEdit = document.getElementById('date-input-edit');
dateInputEdit.style.display = 'none';
checkBoxEdit.addEventListener("change", (e) => {
  dateInputEdit.style.display = e.target.checked ? 'block' : 'none';
});