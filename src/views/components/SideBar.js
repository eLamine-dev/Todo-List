class SideBar extends HTMLElement {
   connectedCallback() {
      this.render();
      this.addEventListeners();
   }
}

customElements.define('side-bar', SideBar);

export default SideBar;
