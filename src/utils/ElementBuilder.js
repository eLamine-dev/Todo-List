function createElement(tag) {
   const element = document.createElement(tag);
   Object.assign(element, elementMixin);
   return element;
}

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

   // updateState(state) {
   //    Object.assign(this.state, state);
   //    this.clear();
   //    this.render();
   // },

   checkForOtherActiveElm(ev) {
      const activeElm = document.querySelector(`[active]`);

      if (activeElm !== this && activeElm !== null) {
         activeElm.showError();
         ev.preventDefault();
      }
   },

   showError() {
      this.classList.add('error');
      setTimeout(() => {
         this.querySelector('input').focus();
         this.classList.remove('error');
      }, 1400);
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

   prependTo(parent) {
      parent.prepend(this);
      return this;
   },

   appendIcon(icon) {
      createElement('i').setAttributes({ class: icon }).appendTo(this);
      return this;
   },

   prependIcon(icon) {
      createElement('i').setAttributes({ class: icon }).prependTo(this);
      return this;
   },

   capitalFirstLetter() {
      this.textContent =
         this.textContent.charAt(0).toUpperCase() + this.textContent.slice(1);
      return this;
   },
};

export default createElement;
