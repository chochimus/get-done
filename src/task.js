import {} from "date-fns"

export class Task {
  constructor(name="", description="", dueDate="", priority="", project=""){
    this.id = this.id = idGenerator.getNextId();;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
    this.repeating = "none";
  }
  toggle() {
    this.done = !this.done;
  }
  getInfo(){
    return {id:this.id, title:this.name, description:this.description, dueDate:this.dueDate, priority:this.priority};
  }
  // getName(){
  //   return this.name;
  // }
  // getDescription(){
  //   return this.description;
  // }
  // getDueDate(){
  //   return this.dueDate;
  // }
  // getPriority(){
  //   return this.priority;
  // }
  setName(name){
    this.name = name;
  }
  setDescription(description){
    this.description = description;
  }
  setDueDate(dueDate){
    this.dueDate = dueDate;
  }
  setPriority(priority){
    this.priority = priority;
  }
  setRepeating(frequency){
    switch (frequency){
    case'daily':
    case'weekly':
    case'monthy':
    case'yearly':
    }
  }
}
//last edit
export class Project {
  constructor(name){
    this.name = name;
    this.library = [];
    this.isHomePage = false;
  }
  addToTaskList(task){
    this.library.push(task);
    return task.id;
  }
  getTaskInfoByTaskId(taskId) {
    const task = this.library.find(t => t.id == taskId);
    return task ? task.getInfo() : null;
  }
  getTaskByTaskId(taskId) {
    return this.library.find(task => task.id == taskId);
  }

  getTaskIndexByReference(task) {
    return this.library.indexOf(task);
  }

  setTaskInfo(taskId, name, description, dueDate, priority){
    const task = this.getTaskByTaskId(taskId);
    if (name !== task.name) task.name = name;
    if (description !== task.description) task.description = description
    if (dueDate !== task.dueDate) task.dueDate = dueDate;
    if (priority !== task.priority) task.priority = priority;
  }
  removeFromTaskListByTaskId(taskId) {
    console.log(taskId)
    const index = this.library.findIndex(task => task.id === Number(taskId));
    if (index !== -1) {
      this.library.splice(index, 1);
    }
  }
};

class IDGenerator {
  constructor() {
      this.currentId = 0;
  }

  getNextId() {
      this.currentId += 1;
      return this.currentId;
  }
}

const idGenerator = new IDGenerator();

export const allProjects = [];

export const home = new Project('home');
home.isHomePage = true;
allProjects.push(home);

