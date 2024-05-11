export const addHtmlElement = (parent,className,tag,htmlContent) => {
  const elementParent = typeof parent === 'string' ? document.querySelector(parent) : parent;
  const newElement = document.createElement(tag);
  newElement.classList.add(className);
  newElement.innerHTML = htmlContent;
  elementParent.appendChild(newElement);
  return newElement;
}
