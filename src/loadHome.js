import { createProjectElement } from "./domUtils";
import { home } from "./task";

export function loadHome(){
  createProjectElement('.projects', home); 
}