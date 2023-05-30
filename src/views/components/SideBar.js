class SideBar extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }

   render() {}
}

customElements.define('side-bar', SideBar);

export default SideBar;
