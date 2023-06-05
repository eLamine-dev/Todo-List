// class ElementBuilder {
//    constructor(tag) {
//       this.element = document.createElement(tag);
//    }

//    setAttributes(attributes) {
//       Object.entries(attributes).forEach(([key, value]) => {
//          if (Array.isArray(value)) {
//             this.element.setAttribute(key, value.join(' '));
//          } else {
//             this.element.setAttribute(key, value);
//          }
//       });
//       return this;
//    }

//    setState(state) {
//       this.element.state = state;
//       return this;
//    }

//    setContent(content) {
//       this.element.textContent = content;
//       return this;
//    }

//    appendChildren(childElements) {
//       if (Array.isArray(childElements)) {
//          childElements.forEach((child) => {
//             this.element.appendChild(child);
//          });
//       } else {
//          this.element.appendChild(childElements);
//       }

//       return this;
//    }

//    build() {
//       return this.element;
//    }
// }

// function createElement(tag) {
//    return new ElementBuilder(tag);
// }

// export default createElement;

const elementMixin = {
   setAttributes(attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
         if (Array.isArray(value)) {
            this.setAttribute(key, value.join(' '));
         } else {
            this.setAttribute(key, value);
         }
      });
      return this;
   },

   setState(state) {
      this.state = state;
      return this;
   },

   setContent(content) {
      this.textContent = content;
      return this;
   },

   appendChildren(childElements) {
      if (Array.isArray(childElements)) {
         childElements.forEach((child) => {
            this.appendChild(child);
         });
      } else {
         this.appendChild(childElements);
      }
      return this;
   },

   build() {
      return this;
   },
};

function createElement(tag) {
   const element = document.createElement(tag);
   Object.assign(element, elementMixin);
   return element;
}

export default createElement;
