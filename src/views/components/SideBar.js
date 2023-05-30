class SideBar extends HTMLElement {
   connectedCallback() {
      this.render();
      // this.addEventListeners();
   }

   render() {
      this.innerHTML = 'sidebar';
   }
}

customElements.define('side-bar', SideBar);

export default SideBar;
