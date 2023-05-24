export function createElement(tag, attributes = {}, content = '') {
   const element = document.createElement(tag);
   Object.keys(attributes).forEach((attr) => {
      element.setAttribute(attr, attributes[attr]);
   });
   element.innerHTML = content;
   return element;
}
