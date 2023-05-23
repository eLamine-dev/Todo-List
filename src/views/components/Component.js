class Component extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {}

   addEventListeners() {}
}

export default Component;
