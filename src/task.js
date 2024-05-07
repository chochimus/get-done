export function createNewTask(name, description, duDate, priority, project){
  const task = new Task(name, description, duDate, priority);
  console.log(project);
  project.addToLibrary(task);
  return task;
}


class Task {
  constructor(name="", description="", dueDate="", priority=""){
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
  }
  toggle() {
    this.done = !this.done;
  }
  getInfo(){
    return {name: this.name, description: this.description, dueDate: this.duDate, priority: this.priority};
  }
  getName(){
    return this.name;
  }
  getDescription(){
    return this.description;
  }
  getDueDate(){
    return this.dueDate;
  }
  getPriority(){
    return this.priority;
  }
  setName(name){
    this.name = name;
  }
  setDescription(description){
    this.description = description;
  }
  setDueDate(dueDate){
    this.duDate = dueDate;
  }
  setPriority(priority){
    this.priority = priority;
  }
}
export function createNewProject(name){
  const project = new Project(name);
  allProjects.push(project);
  return project;
}
class Project {
  constructor(name){
    this.name = name;
    this.library = [];
  }
  addToLibrary(task){
    this.library.push(task);
  }
};

export const allProjects = [];

export const home = new Project('home');
allProjects.push(home);

