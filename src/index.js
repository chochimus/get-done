import { createProjectElement, updateDOM } from "./domUtils";
import { allProjects } from "./task";
import "./style.css"

function loadHomePage(){
  updateDOM(allProjects); 
}
loadHomePage();
/* currently
want to create a home page that you can put any task, 
once that functionality is done I will create projects that can hold
task (or you can drop task into project and it will be moved OR you can set 
  a project on a task and it will also be moved. */
