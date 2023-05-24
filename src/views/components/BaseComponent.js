class BaseComponent extends HTMLElement {
   constructor() {
      super();
      this.render();
      this.addEventListeners();
   }

   render() {}

   addEventListeners() {}
}

export default BaseComponent;
