import createElement from '../../utils/ElementBuilder';
import ProjectList from './ProjectList';

class SideBar extends HTMLElement {
   connectedCallback() {
      this.render();
      // this.addEventListeners();
   }

   render() {
      const projectList = createElement('project-list')
         .setState(this.state)
         .build();
      this.appendChild(projectList);
   }
}

customElements.define('side-bar', SideBar);

export default SideBar;
