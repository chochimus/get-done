export class Task {
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
export class Project {
  constructor(name){
    this.name = name;
    this.library = [];
  }
  addToTaskList(task){
    this.library.push(task);
  }
  removeFromTaskList(index){
    this.library.splice(this.library.index,1);
  }
};

export const allProjects = [];

export const home = new Project('home');
allProjects.push(home);

