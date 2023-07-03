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
      if (this.isConnected) {
         Object.assign(this.state, state);
         this.clear();
         this.render();
      } else {
         this.state = state;
      }
      return this;
   },

   getState() {
      return this.state;
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

   clear() {
      while (this.firstChild) {
         this.removeChild(this.firstChild);
      }
   },

   appendTo(parent) {
      parent.appendChild(this);
      return this;
   },
};

function createElement(tag) {
   const element = document.createElement(tag);
   Object.assign(element, elementMixin);
   return element;
}

export default createElement;
