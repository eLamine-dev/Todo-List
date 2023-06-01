import createElement from '../../utils/ElementBuilder';
import ProjectList from './ProjectList';

class SideBar extends HTMLElement {
   connectedCallback() {
      this.render();
      // this.addEventListeners();
   }

   render() {
      const defaultFilters = ['All', 'Today', 'Up-coming'];
      const defaultFiltersUl = createElement('ul').build();
      defaultFilters.forEach((filter) => {
         const filterLi = createElement('li').setContent(filter).build();
         defaultFiltersUl.appendChild(filterLi);
      });
      this.appendChild(defaultFiltersUl);

      const projectList = createElement('project-list')
         .setState(this.state)
         .build();
      this.appendChild(projectList);
   }
}

customElements.define('side-bar', SideBar);

export default SideBar;
